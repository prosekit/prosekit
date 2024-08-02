import { ProseMirrorNode, Schema } from '@prosekit/pm/model'
import { EditorState, Plugin, Selection } from '@prosekit/pm/state'
import { EditorView, type DirectEditorProps } from '@prosekit/pm/view'

import { ProseKitError } from '../error'
import { defineDefaultState } from '../extensions/default-state'
import type { BaseExtension } from '../facets/base-extension'
import {
  FacetNode,
  subtractFacetNode,
  unionFacetNode,
} from '../facets/facet-node'
import type {
  Extension,
  ExtractCommandActions,
  ExtractMarkActions,
  ExtractMarkNames,
  ExtractNodeActions,
  ExtractNodeNames,
} from '../types/extension'
import type { CommandAction, CommandCreator } from '../types/extension-command'
import type { NodeJSON, SelectionJSON } from '../types/model'
import { assert } from '../utils/assert'
import { deepEquals } from '../utils/deep-equals'
import {
  getEditorContentDoc,
  getEditorSelection,
} from '../utils/editor-content'

import {
  createMarkActions,
  createNodeActions,
  type MarkAction,
  type NodeAction,
} from './action'
import { union } from './union'

/**
 * @public
 */
export interface EditorOptions<E extends Extension> {
  /**
   * The extension to use when creating the editor.
   */
  extension: E

  /**
   * The starting document to use when creating the editor. It can be a
   * ProseMirror node JSON object, a HTML string, or a HTML element instance.
   */
  defaultContent?: NodeJSON | string | HTMLElement

  /**
   * A JSON object representing the starting document to use when creating the
   * editor.
   *
   * @deprecated Use `defaultContent` instead.
   */
  defaultDoc?: NodeJSON

  /**
   * A HTML element or a HTML string representing the starting document to use
   * when creating the editor.
   *
   * @deprecated Use `defaultContent` instead.
   */
  defaultHTML?: string | HTMLElement

  /**
   * A JSON object representing the starting selection to use when creating the
   * editor. It's only used when `defaultContent` is also provided.
   */
  defaultSelection?: SelectionJSON
}

/**
 * @internal
 */
export function setupEditorExtension<E extends Extension>(
  options: EditorOptions<E>,
): E {
  if (options.defaultContent || options.defaultDoc || options.defaultHTML) {
    return union(
      options.extension,
      defineDefaultState(options),
    ) as Extension as E
  }
  return options.extension
}

/**
 * @public
 */
export function createEditor<E extends Extension>(
  options: EditorOptions<E>,
): Editor<E> {
  const extension = setupEditorExtension(options)
  const instance = new EditorInstance(extension)
  return new Editor(instance) as Editor<E>
}

/**
 * An internal class to make TypeScript generic type easier to use.
 *
 * @internal
 */
export class EditorInstance {
  view: EditorView | null = null
  schema: Schema
  nodes: Record<string, NodeAction>
  marks: Record<string, MarkAction>
  commands: Record<string, CommandAction> = {}

  private tree: FacetNode
  private directEditorProps: DirectEditorProps
  private afterMounted: Array<VoidFunction> = []

  constructor(extension: Extension) {
    this.tree = (extension as BaseExtension).getTree()

    const payload = this.tree.getRootOutput()
    const schema = payload.schema
    const stateConfig = payload.state

    assert(schema && stateConfig, 'Schema must be defined')

    const state = EditorState.create(stateConfig)

    if (payload.commands) {
      for (const [name, commandCreator] of Object.entries(payload.commands)) {
        this.defineCommand(name, commandCreator)
      }
    }

    this.nodes = createNodeActions(state.schema, this.getState)
    this.marks = createMarkActions(state.schema, this.getState)

    this.schema = state.schema
    this.directEditorProps = { state, ...payload.view }
  }

  public getState = (): EditorState => {
    return this.view?.state || this.directEditorProps.state
  }

  public updateState(state: EditorState): void {
    if (this.view) {
      this.view.updateState(state)
    } else {
      this.directEditorProps.state = state
    }
  }

  public setContent(
    content: NodeJSON | string | HTMLElement | ProseMirrorNode,
    selection?: SelectionJSON | Selection | 'start' | 'end',
  ): void {
    const doc = getEditorContentDoc(this.schema, content)
    doc.check()
    const sel = getEditorSelection(doc, selection || 'start')

    const oldState = this.getState()
    if (doc.eq(oldState.doc) && (!selection || sel.eq(oldState.selection))) {
      return
    }

    const newState = EditorState.create({
      doc,
      selection: sel,
      plugins: oldState.plugins,
    })
    this.updateState(newState)
  }

  private updateExtension(extension: Extension, add: boolean): void {
    const view = this.view

    // Don't update the extension if the editor is already unmounted
    if (!view || view.isDestroyed) {
      return
    }

    const tree = (extension as BaseExtension).getTree()
    const payload = tree.getRootOutput()

    if (payload?.schema) {
      throw new ProseKitError('Schema cannot be changed')
    }

    if (payload?.view) {
      throw new ProseKitError('View cannot be changed')
    }

    const oldPayload = this.tree.getRootOutput()
    const oldPlugins = [...(view.state?.plugins ?? [])]

    this.tree = add
      ? unionFacetNode(this.tree, tree)
      : subtractFacetNode(this.tree, tree)

    const newPayload = this.tree.getRootOutput()
    const newPlugins = [...(newPayload?.state?.plugins ?? [])]

    if (!deepEquals(oldPlugins, newPlugins)) {
      const state = view.state.reconfigure({ plugins: newPlugins })
      view.updateState(state)
    }

    if (
      newPayload?.commands &&
      !deepEquals(oldPayload?.commands, newPayload?.commands)
    ) {
      const commands = newPayload.commands
      const names = Object.keys(commands)
      for (const name of names) {
        this.defineCommand(name, commands[name])
      }
    }
  }

  public use(extension: Extension): VoidFunction {
    if (!this.mounted) {
      let canceled = false
      let lazyRemove: VoidFunction | null = null

      const lazyCreate = () => {
        if (!canceled) {
          lazyRemove = this.use(extension)
        }
      }

      this.afterMounted.push(lazyCreate)

      return () => {
        canceled = true
        lazyRemove?.()
      }
    }

    this.updateExtension(extension, true)
    return () => this.updateExtension(extension, false)
  }

  public mount(place: HTMLElement): void {
    if (this.view) {
      throw new ProseKitError('Editor is already mounted')
    }
    this.view = new EditorView({ mount: place }, this.directEditorProps)
    this.afterMounted.forEach((callback) => callback())
  }

  public unmount(): void {
    // If the editor is not mounted, do nothing
    if (!this.view) return

    this.directEditorProps.state = this.view.state
    this.view.destroy()
    this.view = null
  }

  get mounted(): boolean {
    return !!this.view && !this.view.isDestroyed
  }

  public get assertView(): EditorView {
    if (!this.view) {
      throw new ProseKitError('Editor is not mounted')
    }
    return this.view
  }

  public definePlugins(plugins: readonly Plugin[]): void {
    const view = this.assertView
    const state = view.state
    const newPlugins = [...plugins, ...state.plugins]
    const newState = state.reconfigure({ plugins: newPlugins })
    view.setProps({ state: newState })
  }

  public removePlugins(plugins: readonly Plugin[]): void {
    const view = this.view
    if (!view) return

    const state = view.state
    const newPlugins = state.plugins.filter((p) => !plugins.includes(p))
    const newState = state.reconfigure({ plugins: newPlugins })
    view.setProps({ state: newState })
  }

  public defineCommand<Args extends any[] = any[]>(
    name: string,
    commandCreator: CommandCreator<Args>,
  ): void {
    const action: CommandAction<Args> = (...args: Args) => {
      const view = this.view
      assert(view, `Cannot call command "${name}" before the editor is mounted`)
      const command = commandCreator(...args)
      return command(view.state, view.dispatch.bind(view), view)
    }

    action.canApply = (...args: Args) => {
      const view = this.view
      if (!view) {
        return false
      }

      const command = commandCreator(...args)
      return command(view.state, undefined, view)
    }

    this.commands[name] = action as CommandAction
  }

  public removeCommand(name: string): void {
    delete this.commands[name]
  }
}

/**
 * @public
 */
export class Editor<E extends Extension = any> {
  private instance: EditorInstance

  /**
   * @internal
   */
  constructor(instance: EditorInstance) {
    if (!(instance instanceof EditorInstance)) {
      throw new TypeError('Invalid EditorInstance')
    }
    this.instance = instance
  }

  /**
   * Whether the editor is mounted.
   */
  get mounted(): boolean {
    return this.instance.mounted
  }

  /**
   * The editor view.
   */
  get view(): EditorView {
    return this.instance.assertView
  }

  /**
   * The editor schema.
   */
  get schema(): Schema<ExtractNodeNames<E>, ExtractMarkNames<E>> {
    return this.instance.schema
  }

  /**
   * The editor's current state.
   */
  get state(): EditorState {
    return this.instance.getState()
  }

  /**
   * Whether the editor is focused.
   */
  get focused(): boolean {
    return this.instance.view?.hasFocus() ?? false
  }

  /**
   * Mount the editor to the given HTML element.
   * Pass `null` or `undefined` to unmount the editor.
   */
  mount = (place: HTMLElement | null | undefined): void => {
    if (place) {
      this.instance.mount(place)
    } else {
      this.instance.unmount()
    }
  }

  /**
   * Unmount the editor. This is equivalent to `mount(null)`.
   */
  unmount = (): void => {
    this.instance.unmount()
  }

  /**
   * Focus the editor.
   */
  focus = (): void => {
    this.instance.view?.focus()
  }

  /**
   * Blur the editor.
   */
  blur = (): void => {
    this.instance.view?.dom.blur()
  }

  /**
   * Register an extension to the editor. Return a function to unregister the
   * extension.
   */
  use = (extension: Extension): VoidFunction => {
    return this.instance.use(extension)
  }

  /**
   * Update the editor's state.
   *
   * @remarks
   *
   * This is an advanced method. Use it only if you have a specific reason to
   * directly manipulate the editor's state.
   */
  updateState = (state: EditorState): void => {
    this.instance.updateState(state)
  }

  /**
   * Update the editor's document and selection.
   *
   * @param content - The new document to set. It can be one of the following:
   *   - A ProseMirror node instance
   *   - A ProseMirror node JSON object
   *   - An HTML string
   *   - An HTML element instance
   * @param selection - Optional. Specifies the new selection. It can be one of the following:
   *   - A ProseMirror selection instance
   *   - A ProseMirror selection JSON object
   *   - The string "start" (to set selection at the beginning, default value)
   *   - The string "end" (to set selection at the end)
   */
  setContent = (
    content: ProseMirrorNode | NodeJSON | string | HTMLElement,
    selection?: SelectionJSON | Selection | 'start' | 'end',
  ): void => {
    return this.instance.setContent(content, selection)
  }

  /**
   * All {@link CommandAction}s defined by the editor.
   */
  get commands(): ExtractCommandActions<E> {
    return this.instance.commands as ExtractCommandActions<E>
  }

  /**
   * All {@link NodeAction}s defined by the editor.
   */
  get nodes(): ExtractNodeActions<E> {
    return this.instance.nodes as ExtractNodeActions<E>
  }

  /**
   * All {@link MarkAction}s defined by the editor.
   */
  get marks(): ExtractMarkActions<E> {
    return this.instance.marks as ExtractMarkActions<E>
  }
}
