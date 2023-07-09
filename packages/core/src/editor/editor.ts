import { Schema } from '@prosekit/pm/model'
import { EditorState, EditorStateConfig, Plugin } from '@prosekit/pm/state'
import { DirectEditorProps, EditorView } from '@prosekit/pm/view'

import { ProseKitError } from '../error'
import { CommandCreator, CommandDispatcher } from '../types/command'
import {
  Extension,
  ExtractCommandDispatchers,
  ExtractMarks,
  ExtractNodes,
} from '../types/extension'
import { voidFunction } from '../types/void-function'

import { flatten } from './flatten'

/** @public */
export interface EditorOptions<E extends Extension> {
  extension: E
}

/** @public */
export function createEditor<E extends Extension>({
  extension,
}: EditorOptions<E>): Editor<E> {
  const { schemaInput, stateInput, viewInput, commandInput } =
    flatten(extension)

  if (!schemaInput) {
    throw new Error('Schema must be defined')
  }
  const schema = new Schema(schemaInput)

  const stateConfig: EditorStateConfig = stateInput
    ? stateInput({ schema })
    : { schema }
  const state = EditorState.create(stateConfig)

  const directEditorProps: DirectEditorProps = { state, ...viewInput }

  const instance = new EditorInstance(directEditorProps)

  if (commandInput) {
    for (const [name, commandCreator] of Object.entries(commandInput)) {
      instance.addCommand(name, commandCreator)
    }
  }

  return Editor.create(instance) as Editor<E>
}

/** @internal */
class EditorInstance {
  view: EditorView | null = null
  schema: Schema
  commandDispatchers: Record<string, CommandDispatcher> = {}

  constructor(private directEditorProps: DirectEditorProps) {
    this.mount = this.mount.bind(this)
    this.unmount = this.unmount.bind(this)
    this.schema = directEditorProps.state.schema
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
      throw new TypeError("Editor's instance is not EditorInstance")
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

    const { schemaInput, stateInput, viewInput, commandInput } =
      flatten(extension)

    if (schemaInput) {
      throw new ProseKitError('Schema cannot be changed')
    }

    if (viewInput) {
      throw new ProseKitError('View cannot be changed')
    }

    if (stateInput) {
      const stateConfig = stateInput({ schema: this.schema })
      const plugins = stateConfig.plugins
      if (plugins && plugins.length > 0) {
        this.instance.addPlugins(plugins)
        return () => this.instance.removePlugins(plugins)
      }
    }

    if (commandInput) {
      const names = Object.keys(commandInput)
      for (const name of names) {
        this.instance.addCommand(name, commandInput[name])
      }
      return () => {
        for (const name of names) {
          this.instance.removeCommand(name)
        }
      }
    }

    return voidFunction
  }
}
