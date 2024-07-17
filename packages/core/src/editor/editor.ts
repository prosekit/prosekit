import { Schema } from '@prosekit/pm/model'
import { EditorState, Plugin } from '@prosekit/pm/state'
import { EditorView, type DirectEditorProps } from '@prosekit/pm/view'

import { ProseKitError } from '../error'
import { defineDefaultState } from '../extensions/default-state'
import type { BaseExtension } from '../facets/base-extension'
import {
  FacetNode,
  subtractFacetNode,
  unionFacetNode,
} from '../facets/facet-node'
import { type CommandApplier, type CommandCreator } from '../types/command'
import type {
  Extension,
  ExtractCommandAppliers,
  ExtractMarks,
  ExtractNodes,
} from '../types/extension'
import type { NodeJSON, SelectionJSON } from '../types/model'
import { assert } from '../utils/assert'
import { deepEquals } from '../utils/deep-equals'

import {
  createMarkActions,
  createNodeActions,
  type MarkAction,
  type NodeAction,
} from './actions'
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
   * A JSON object representing the starting document to use when creating the
   * editor.
   */
  defaultDoc?: NodeJSON

  /**
   * A HTML element or a HTML string representing the starting document to use
   * when creating the editor.
   */
  defaultHTML?: string | HTMLElement

  /**
   * A JSON object representing the starting selection to use when creating the
   * editor. It's only used when `defaultDoc` or `defaultHTML` is also provided.
   */
  defaultSelection?: SelectionJSON
}

/**
 * @internal
 */
export function setupEditorExtension<E extends Extension>(
  options: EditorOptions<E>,
): E {
  const { defaultDoc, defaultHTML, defaultSelection } = options
  if (defaultDoc || defaultHTML) {
    return union([
      options.extension,
      defineDefaultState({
        defaultDoc,
        defaultHTML,
        defaultSelection,
      }),
    ]) as Extension as E
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
  return Editor.create(new EditorInstance(extension)) as Editor<E>
}

/**
 * @internal
 */
export class EditorInstance {
  view: EditorView | null = null
  schema: Schema
  nodeBuilders: Record<string, NodeAction>
  markBuilders: Record<string, MarkAction>
  commandAppliers: Record<string, CommandApplier> = {}

  private tree: FacetNode
  private directEditorProps: DirectEditorProps

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

    this.nodeBuilders = createNodeActions(state.schema, this.getState)
    this.markBuilders = createMarkActions(state.schema, this.getState)

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

  public updateExtension(extension: Extension, add: boolean): void {
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

  public mount(place: HTMLElement) {
    if (this.view) {
      throw new ProseKitError('Editor is already mounted')
    }
    if (!place) {
      throw new ProseKitError("Can't mount editor without a place")
    }

    this.view = new EditorView({ mount: place }, this.directEditorProps)
  }

  public unmount() {
    if (!this.view) {
      throw new ProseKitError('Editor is not mounted yet')
    }

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
    const applier: CommandApplier<Args> = (...args: Args) => {
      const view = this.view
      assert(view, `Cannot call command "${name}" before the editor is mounted`)
      const command = commandCreator(...args)
      return command(view.state, view.dispatch.bind(view), view)
    }

    applier.canApply = (...args: Args) => {
      const view = this.view
      if (!view) {
        return false
      }

      const command = commandCreator(...args)
      return command(view.state, undefined, view)
    }

    this.commandAppliers[name] = applier as CommandApplier
  }

  public removeCommand(name: string) {
    delete this.commandAppliers[name]
  }
}

/**
 * @public
 */
export class Editor<E extends Extension = any> {
  private instance: EditorInstance
  private afterMounted: Array<VoidFunction> = []

  /**
   * @internal
   */
  constructor(instance: EditorInstance) {
    this.instance = instance
    this.mount = this.mount.bind(this)
    this.unmount = this.unmount.bind(this)
    this.use = this.use.bind(this)
  }

  /**
   * @internal
   */
  static create(instance: any) {
    if (!(instance instanceof EditorInstance)) {
      throw new TypeError('Invalid EditorInstance')
    }
    return new Editor(instance)
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
  get schema(): Schema<ExtractNodes<E>, ExtractMarks<E>> {
    return this.instance.schema
  }

  /**
   * All commands defined by the editor.
   */
  get commands(): ExtractCommandAppliers<E> {
    return this.instance.commandAppliers as ExtractCommandAppliers<E>
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
  mount(place: HTMLElement | null | undefined): void {
    if (!place) {
      return this.unmount()
    }
    this.instance.mount(place)
    this.afterMounted.forEach((callback) => callback())
  }

  /**
   * Unmount the editor. This is equivalent to `mount(null)`.
   */
  unmount(): void {
    if (this.mounted) {
      this.instance.unmount()
    }
  }

  /**
   * Focus the editor.
   */
  focus(): void {
    this.instance.view?.focus()
  }

  /**
   * Blur the editor.
   */
  blur(): void {
    this.instance.view?.dom.blur()
  }

  /**
   * Register an extension to the editor. Return a function to unregister the
   * extension.
   */
  use(extension: Extension): VoidFunction {
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

    this.instance.updateExtension(extension, true)
    return () => this.instance.updateExtension(extension, false)
  }

  /**
   * The editor's current state.
   */
  get state(): EditorState {
    return this.instance.getState()
  }

  /**
   * Update the editor's state.
   *
   * @remarks
   *
   * This is an advanced method. Use it only if you have a specific reason to
   * directly manipulate the editor's state.
   */
  updateState(state: EditorState): void {
    this.instance.updateState(state)
  }

  get nodes(): Record<ExtractNodes<E>, NodeAction> {
    return this.instance.nodeBuilders
  }
  get marks(): Record<ExtractMarks<E>, MarkAction> {
    return this.instance.markBuilders
  }
}
