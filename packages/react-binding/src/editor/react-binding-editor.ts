import { isDeepEqual, isElementLike } from '@ocavue/utils'
import type { MarkViewComponentProps, NodeViewComponentProps } from '@handlewithcare/react-prosemirror'
import { reactKeys } from '@handlewithcare/react-prosemirror'
import type { ProseMirrorNode, Schema } from '@prosekit/pm/model'
import {
  EditorState,
  Selection,
  type Command,
  type Plugin,
  type Transaction,
} from '@prosekit/pm/state'
import type { EditorView } from '@prosekit/pm/view'
import {
  BaseExtension,
  createMarkActions,
  createNodeActions,
  defineDefaultState,
  nodeFromElement,
  nodeFromHTML,
  nodeFromJSON,
  ProseKitError,
  subtractFacetNode,
  union,
  unionFacetNode,
  type CommandAction,
  type DefaultStateOptions,
  type Extension,
  type ExtractCommandActions,
  type ExtractMarkActions,
  type ExtractNodeActions,
  type FacetNode,
  type MarkAction,
  type NodeAction,
  type NodeJSON,
  type SelectionJSON,
} from '@prosekit/core'
import type { ComponentType } from 'react'
import { htmlFromNode, jsonFromNode, type DOMDocumentOptions } from '@prosekit/core'

import {
  extractMarkViewComponents,
  extractNodeViewComponents,
} from '../extensions/view-metadata.ts'

export interface ReactBindingEditorOptions<E extends Extension> {
  extension: E
  defaultContent?: DefaultStateOptions['defaultContent']
  defaultSelection?: DefaultStateOptions['defaultSelection']
}

export interface GetDocHTMLOptions extends DOMDocumentOptions {}

export interface ReactBindingEditorSnapshot {
  state: EditorState
  plugins: readonly Plugin[]
  nodeViewComponents: Record<string, ComponentType<NodeViewComponentProps>>
  markViewComponents: Record<string, ComponentType<MarkViewComponentProps>>
}

type ReactBindingEditorEvent =
  | 'mount'
  | 'unmount'
  | 'state'
  | 'plugins'
  | 'views'

type CommandCreator<Args extends any[] = any[]> = (...args: Args) => Command

export function createReactBindingEditor<E extends Extension>(
  options: ReactBindingEditorOptions<E>,
): ReactBindingEditor<E> {
  const extension = setupReactBindingEditorExtension(options)
  return new ReactBindingEditor(extension)
}

function setupReactBindingEditorExtension<E extends Extension>(
  options: ReactBindingEditorOptions<E>,
): E {
  if (options.defaultContent || options.defaultSelection) {
    return union(
      options.extension,
      defineDefaultState(options),
    ) as E
  }

  return options.extension
}

/**
 * An editor class designed for react-prosemirror.
 *
 * Unlike the standard prosekit Editor, this class does not create its own
 * EditorView. Instead, it waits for react-prosemirror's ProseMirror component
 * to create an EditorView, which is then attached via `attachView()`.
 */
export class ReactBindingEditor<E extends Extension = any> {
  private _view: EditorView | null = null
  private _state: EditorState
  private _tree: FacetNode
  private _afterMounted: Array<VoidFunction> = []
  private _schema: Schema
  private _nodes: Record<string, NodeAction>
  private _marks: Record<string, MarkAction>
  private _commands: Record<string, CommandAction> = {}
  private _plugins: readonly Plugin[]
  private _nodeViewComponents: Record<string, ComponentType<NodeViewComponentProps>>
  private _markViewComponents: Record<string, ComponentType<MarkViewComponentProps>>
  private _snapshot: ReactBindingEditorSnapshot
  private _listeners = new Set<(event: ReactBindingEditorEvent) => void>()

  constructor(extension: Extension) {
    this._tree = (extension as BaseExtension).getTree()

    const payload = this._tree.getRootOutput()
    const schema = payload.schema
    const stateConfig = payload.state

    if (!schema || !stateConfig) {
      throw new ProseKitError('Schema must be defined')
    }

    const reactKeysPlugin = reactKeys()
    const state = EditorState.create({
      ...stateConfig,
      plugins: [reactKeysPlugin, ...(stateConfig.plugins ?? [])],
    })

    this._schema = state.schema
    this._state = state
    this._plugins = state.plugins
    this._nodeViewComponents = extractNodeViewComponents(this._tree)
    this._markViewComponents = extractMarkViewComponents(this._tree)
    this._snapshot = {
      state: this._state,
      plugins: this._plugins,
      nodeViewComponents: this._nodeViewComponents,
      markViewComponents: this._markViewComponents,
    }

    this.rebuildCommands(payload.commands)

    this._nodes = createNodeActions(state.schema, this.getState)
    this._marks = createMarkActions(state.schema, this.getState)
  }

  get view(): EditorView {
    if (!this._view || this._view.isDestroyed) {
      throw new ProseKitError('Editor view is not available. Make sure the ProseKit component is mounted.')
    }
    return this._view
  }

  get state(): EditorState {
    return this._state
  }

  get schema(): Schema {
    return this._schema
  }

  get mounted(): boolean {
    return !!this._view && !this._view.isDestroyed
  }

  get nodes(): ExtractNodeActions<E> {
    return this._nodes as ExtractNodeActions<E>
  }

  get marks(): ExtractMarkActions<E> {
    return this._marks as ExtractMarkActions<E>
  }

  get commands(): ExtractCommandActions<E> {
    return this._commands as ExtractCommandActions<E>
  }

  get plugins(): readonly Plugin[] {
    return this._plugins
  }

  get nodeViewComponents(): Record<string, ComponentType<NodeViewComponentProps>> {
    return this._nodeViewComponents
  }

  get markViewComponents(): Record<string, ComponentType<MarkViewComponentProps>> {
    return this._markViewComponents
  }

  subscribe(listener: (event: ReactBindingEditorEvent) => void): VoidFunction {
    this._listeners.add(listener)
    return () => {
      this._listeners.delete(listener)
    }
  }

  getSnapshot = (): ReactBindingEditorSnapshot => {
    return this._snapshot
  }

  getState = (): EditorState => {
    return this.state
  }

  getDocJSON = (): NodeJSON => {
    return jsonFromNode(this.state.doc)
  }

  getDocHTML = (options?: GetDocHTMLOptions): string => {
    const serializer = this._view?.someProp('clipboardSerializer') as any
    const DOMSerializer = serializer
      ? { fromSchema: () => serializer }
      : undefined
    return htmlFromNode(this.state.doc, { ...options, DOMSerializer })
  }

  get focused(): boolean {
    return this._view?.hasFocus() ?? false
  }

  focus(): void {
    this._view?.focus()
  }

  blur(): void {
    this._view?.dom.blur()
  }

  setContent(
    content: ProseMirrorNode | NodeJSON | string | Element,
    selection?: SelectionJSON | Selection | 'start' | 'end',
  ): void {
    const schema = this._schema
    let doc: ProseMirrorNode

    if (typeof content === 'string') {
      doc = nodeFromHTML(content, { schema })
    } else if (isElementLike(content)) {
      doc = nodeFromElement(content as HTMLElement, { schema })
    } else {
      // ProseMirrorNode instances have `attrs` (always an object),
      // while NodeJSON has `attrs` as an optional plain object.
      // As a simple heuristic, we check for `nodeSize` which only
      // exists on ProseMirrorNode instances.
      if ('nodeSize' in (content as object)) {
        doc = content as ProseMirrorNode
        if (doc.type !== schema.topNodeType) {
          throw new ProseKitError(
            `Document type does not match top node type. ` +
            `Expected ${schema.topNodeType.name}, got ${doc.type.name}`,
          )
        }
      } else {
        doc = nodeFromJSON(content as NodeJSON, { schema })
      }
    }

    doc.check()

    let sel: Selection
    if (typeof selection === 'string') {
      sel = selection === 'end' ? Selection.atEnd(doc) : Selection.atStart(doc)
    } else if (selection instanceof Selection) {
      sel = selection
    } else if (selection) {
      sel = Selection.fromJSON(doc, selection)
    } else {
      sel = Selection.atStart(doc)
    }

    const newState = EditorState.create({
      doc,
      selection: sel,
      plugins: this._state.plugins,
    })

    if (this._view && !this._view.isDestroyed) {
      this._view.updateState(newState)
    }
    this._state = newState
    this._plugins = newState.plugins
    this.refreshSnapshot()
    this.emit('state')
  }

  updateState(state: EditorState): void {
    if (this._view && !this._view.isDestroyed) {
      this._view.updateState(state)
    }
    this._state = state
    this._plugins = state.plugins
    this.refreshSnapshot()
    this.emit('state')
  }

  attachView(view: EditorView): void {
    if (this._view && this._view !== view && !this._view.isDestroyed) {
      throw new ProseKitError('Editor view is already attached to another view')
    }

    if (this._view === view) {
      return
    }

    this._view = view

    const currentState = view.state
    const pluginsChanged = !isDeepEqual(this._plugins, currentState.plugins)

    this._state = currentState
    this._plugins = currentState.plugins
    this.refreshSnapshot()

    this._afterMounted.forEach((cb) => cb())
    this._afterMounted.length = 0

    this.emit('mount')
    if (pluginsChanged) {
      this.emit('plugins')
      this.emit('views')
    }
  }

  detachView(view: EditorView): void {
    if (this._view !== view) {
      return
    }

    this._state = view.state
    this._view = null
    this._plugins = this._state.plugins
    this.refreshSnapshot()

    this.emit('unmount')
  }

  onTransaction(tr: Transaction): void {
    this._state = this._state.apply(tr)
    this._plugins = this._state.plugins
    this.refreshSnapshot()
    this.emit('state')
  }

  use(extension: Extension): VoidFunction {
    if (!this.mounted) {
      let canceled = false
      let lazyRemove: VoidFunction | null = null

      const lazyCreate = () => {
        if (!canceled) {
          lazyRemove = this.use(extension)
        }
      }

      this._afterMounted.push(lazyCreate)

      return () => {
        canceled = true
        lazyRemove?.()
      }
    }

    this.updateExtension(extension, true)
    return () => this.updateExtension(extension, false)
  }

  exec(command: Command): boolean {
    return command(this.state, this.dispatch, this._view ?? undefined)
  }

  canExec(command: Command): boolean {
    return command(this.state, undefined, this._view ?? undefined)
  }

  dispatch = (tr: Transaction): void => {
    if (this._view) {
      this._view.dispatch(tr)
      return
    }

    this._state = this._state.apply(tr)
    this._plugins = this._state.plugins
    this.refreshSnapshot()
    this.emit('state')
  }

  private emit(event: ReactBindingEditorEvent): void {
    for (const listener of this._listeners) {
      listener(event)
    }
  }

  private rebuildCommands(
    commands: Record<string, CommandCreator<any[]>> | undefined,
  ): void {
    const nextCommands: Record<string, CommandAction> = {}

    if (commands) {
      for (const [name, commandCreator] of Object.entries(commands)) {
        nextCommands[name] = this.createCommandAction(name, commandCreator)
      }
    }

    this._commands = nextCommands
  }

  private createCommandAction<Args extends any[] = any[]>(
    name: string,
    commandCreator: CommandCreator<Args>,
  ): CommandAction<Args> {
    const action: CommandAction<Args> = (...args: Args) => {
      const command = commandCreator(...args)
      return this.exec(command)
    }

    action.canExec = (...args: Args) => {
      const command = commandCreator(...args)
      return this.canExec(command)
    }

    return action
  }

  private updateExtension(extension: Extension, add: boolean): void {
    const view = this._view
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

    const oldPayload = this._tree.getRootOutput()
    const oldPlugins = [...view.state.plugins]
    const oldNodeViews = this._nodeViewComponents
    const oldMarkViews = this._markViewComponents

    this._tree = add
      ? unionFacetNode(this._tree, tree)
      : subtractFacetNode(this._tree, tree)

    const newPayload = this._tree.getRootOutput()
    const nextState = view.state.reconfigure({
      plugins: [reactKeys(), ...(newPayload.state?.plugins ?? [])],
    })
    const newPlugins = [...nextState.plugins]

    const pluginsChanged = !isDeepEqual(oldPlugins, newPlugins)

    if (pluginsChanged) {
      this._state = nextState
      this._plugins = nextState.plugins
      view.updateState(nextState)
    } else {
      this._state = view.state
      this._plugins = view.state.plugins
    }

    this._nodeViewComponents = extractNodeViewComponents(this._tree)
    this._markViewComponents = extractMarkViewComponents(this._tree)
    this.refreshSnapshot()

    const nodeViewsChanged = !isDeepEqual(oldNodeViews, this._nodeViewComponents)
    const markViewsChanged = !isDeepEqual(oldMarkViews, this._markViewComponents)

    if (!isDeepEqual(oldPayload.commands, newPayload.commands)) {
      this.rebuildCommands(newPayload.commands)
    }

    if (pluginsChanged) {
      this.emit('plugins')
      this.emit('state')
    }

    if (nodeViewsChanged || markViewsChanged) {
      this.emit('views')
    }
  }

  private refreshSnapshot(): void {
    this._snapshot = {
      state: this._state,
      plugins: this._plugins,
      nodeViewComponents: this._nodeViewComponents,
      markViewComponents: this._markViewComponents,
    }
  }
}
