import { MarkType, NodeType, Schema, type Attrs } from '@prosekit/pm/model'
import { EditorState, Plugin, type EditorStateConfig } from '@prosekit/pm/state'
import { EditorView, type DirectEditorProps } from '@prosekit/pm/view'

import { addDefaultState, defineExtension } from '..'
import { ProseKitError } from '../error'
import { type CommandCreator, type CommandDispatcher } from '../types/command'
import type {
  Extension,
  ExtractCommandDispatchers,
  ExtractMarks,
  ExtractNodes,
} from '../types/extension'
import type { NodeJson, SelectionJson } from '../types/model'
import { isMarkActive } from '../utils/is-mark-active'
import { isNodeActive } from '../utils/is-node-active'

import {
  createMarkBuilder,
  createNodeBuilder,
  type MarkBuilder,
  type NodeBuilder,
} from './builder'
import { updateExtension, type Inputs, type Slots } from './flatten'

/** @public */
export interface EditorOptions<E extends Extension> {
  /**
   * The extension to use when creating the editor.
   */
  extension: E

  /**
   * A JSON object representing the starting document to use when creating the
   * editor.
   */
  defaultDoc?: NodeJson

  /**
   * A JSON object representing the starting selection to use when creating the
   * editor. It's only used when `defaultDoc` is also provided.
   */
  defaultSelection?: SelectionJson
}

/** @public */
export function createEditor<E extends Extension>({
  extension,
  defaultDoc,
  defaultSelection,
}: EditorOptions<E>): Editor<E> {
  if (defaultDoc) {
    extension = defineExtension([
      extension,
      addDefaultState({
        doc: defaultDoc,
        selection: defaultSelection,
      }),
    ]) as E
  }
  return Editor.create(new EditorInstance(extension)) as Editor<E>
}

/** @internal */
class EditorInstance {
  view: EditorView | null = null
  schema: Schema
  commandDispatchers: Record<string, CommandDispatcher> = {}

  private inputs: Inputs = []
  private slots: Slots = []
  private directEditorProps: DirectEditorProps
  readonly nodeBuilders: Record<string, NodeBuilder>
  readonly markBuilders: Record<string, MarkBuilder>

  constructor(extension: Extension) {
    this.mount = this.mount.bind(this)
    this.unmount = this.unmount.bind(this)

    const { schemaInput, stateInput, viewInput, commandInput } =
      updateExtension(this.inputs, this.slots, extension, 'add')

    if (!schemaInput) {
      throw new Error('Schema must be defined')
    }
    const schema = new Schema(schemaInput)

    const stateConfig: EditorStateConfig = stateInput
      ? stateInput({ schema })
      : { schema }
    const state = EditorState.create(stateConfig)

    if (commandInput) {
      for (const [name, commandCreator] of Object.entries(commandInput)) {
        this.addCommand(name, commandCreator)
      }
    }

    this.directEditorProps = { state, ...viewInput }
    this.schema = this.directEditorProps.state.schema

    const getState = () => this.view?.state

    this.nodeBuilders = Object.fromEntries(
      Object.values(this.schema.nodes).map((type) => [
        type.name,
        createNodeBuilder(getState, type),
      ]),
    )
    this.markBuilders = Object.fromEntries(
      Object.values(this.schema.marks).map((type) => [
        type.name,
        createMarkBuilder(getState, type),
      ]),
    )
  }

  public updateExtension(extension: Extension, mode: 'add' | 'remove'): void {
    const { schemaInput, stateInput, viewInput, commandInput } =
      updateExtension(this.inputs, this.slots, extension, mode)

    if (schemaInput) {
      throw new ProseKitError('Schema cannot be changed')
    }

    if (viewInput) {
      throw new ProseKitError('View cannot be changed')
    }

    const plugins = stateInput?.({ schema: this.schema })?.plugins
    if (plugins && plugins.length > 0) {
      if (!this.view) {
        throw new ProseKitError(
          'Unexpected inner state: EditorInstance.view is not defined',
        )
      }

      const state = this.view.state.reconfigure({ plugins })
      this.view.updateState(state)
    }

    if (commandInput) {
      const names = Object.keys(commandInput)
      for (const name of names) {
        this.addCommand(name, commandInput[name])
      }
    }
  }

  public mount(place: HTMLElement) {
    if (this.view) {
      throw new Error('Editor is already mounted')
    }
    if (!place) {
      throw new Error("Can't mount editor without a place")
    }

    this.view = new EditorView({ mount: place }, this.directEditorProps)
  }

  public unmount() {
    if (!this.view) {
      throw new Error('Editor is not mounted yet')
    }

    this.view.destroy()
    this.view = null
  }

  public get assertView(): EditorView {
    if (!this.view) throw new Error('Editor is not mounted')
    return this.view
  }

  public addPlugins(plugins: readonly Plugin[]): void {
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

  public addCommand(name: string, commandCreator: CommandCreator): void {
    const dispatcher: CommandDispatcher = <T extends any[]>(...args: T) => {
      const view = this.assertView
      const command = commandCreator(...args)
      // TODO: how to not pass dispatch
      return command(view.state, view.dispatch.bind(view), view)
    }
    this.commandDispatchers[name] = dispatcher
  }

  public removeCommand(name: string) {
    delete this.commandDispatchers[name]
  }
}

/** @public */
export class Editor<E extends Extension = any> {
  private instance: EditorInstance

  private constructor(instance: EditorInstance) {
    this.instance = instance
    this.mount = this.mount.bind(this)
    this.unmount = this.unmount.bind(this)
    this.use = this.use.bind(this)
  }

  private afterMounted: Array<VoidFunction> = []

  /** @internal */
  static create(instance: any) {
    if (!(instance instanceof EditorInstance)) {
      throw new TypeError('Invalid EditorInstance')
    }
    return new Editor(instance)
  }

  get mounted(): boolean {
    return !!this.instance.view
  }

  get view(): EditorView {
    return this.instance.assertView
  }

  get schema(): Schema<ExtractNodes<E>, ExtractMarks<E>> {
    return this.instance.schema
  }

  get commands(): ExtractCommandDispatchers<E> {
    return this.instance.commandDispatchers as ExtractCommandDispatchers<E>
  }

  mount(place: HTMLElement | null | undefined | void): void {
    if (!place) {
      return this.unmount()
    }
    this.instance.mount(place)
    this.afterMounted.forEach((callback) => callback())
  }

  unmount(): void {
    if (this.mounted) {
      this.instance.unmount()
    }
  }

  use(extension: Extension): VoidFunction {
    if (!this.mounted) {
      let lazyRemove: VoidFunction | null = null

      const lazyCreate = () => {
        lazyRemove = this.use(extension)
      }

      this.afterMounted.push(lazyCreate)

      return () => {
        lazyRemove?.()
      }
    }

    this.instance.updateExtension(extension, 'add')
    return () => this.instance.updateExtension(extension, 'remove')
  }

  /**
   * @deprecated
   */
  isNodeActive(nodeType: string | NodeType, attrs?: Attrs): boolean {
    return isNodeActive(this.view.state, nodeType, attrs)
  }

  /**
   * @deprecated
   */
  isMarkActive(markType: string | MarkType, attrs?: Attrs): boolean {
    return isMarkActive(this.view.state, markType, attrs)
  }

  get nodes(): Record<ExtractNodes<E>, NodeBuilder> {
    return this.instance.nodeBuilders
  }
  get marks(): Record<ExtractMarks<E>, MarkBuilder> {
    return this.instance.markBuilders
  }
}
