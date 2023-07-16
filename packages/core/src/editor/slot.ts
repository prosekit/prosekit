import type { MarkSpec, NodeSpec, SchemaSpec } from '@prosekit/pm/model'
import type { EditorStateConfig } from '@prosekit/pm/state'
import OrderedMap from 'orderedmap'

import type { CommandCreator } from '../types/command'
import type { StateConfigCallback, ViewProps } from '../types/editor'

import { Facet } from './facet'

export const schemaSlot = Facet.defineSlot<SchemaSpec>({
  combine: (specs: SchemaSpec[]): SchemaSpec => {
    let nodes = OrderedMap.from<NodeSpec>({})
    let marks = OrderedMap.from<MarkSpec>({})
    let topNode: string | undefined = undefined

    for (const spec of specs) {
      nodes = nodes.append(spec.nodes)
      marks = marks.append(spec.marks ?? {})
      topNode = topNode ?? spec.topNode
    }

    return { nodes, marks, topNode } satisfies SchemaSpec
  },
})

export const stateSlot = Facet.defineSlot<StateConfigCallback>({
  combine: (callbacks: StateConfigCallback[]): StateConfigCallback => {
    return (ctx) => {
      const configs = callbacks.map((cb) => cb(ctx))
      const config: EditorStateConfig = {
        schema: ctx.schema,
        storedMarks: [],
        plugins: [],
      }

      for (const c of configs) {
        config.schema = config.schema ?? c.schema
        config.doc = config.doc ?? c.doc
        config.selection = config.selection ?? c.selection
        config.storedMarks = [...config.storedMarks!, ...(c.storedMarks ?? [])]
        config.plugins = [...config.plugins!, ...(c.plugins ?? [])]
      }

      if (!config.doc && !config.schema) {
        throw new Error("Can't create state without a schema nor a document")
      }

      if (config.doc) {
        config.schema = undefined
      }

      return config
    }
  },
})

export const viewSlot = Facet.defineSlot<ViewProps>({
  combine: (props: ViewProps[]): ViewProps => {
    return Object.assign({}, ...props) as ViewProps
  },
})

export type CommandSlotInput = Record<string, CommandCreator<any>>

export const commandSlot = Facet.defineSlot<CommandSlotInput>({
  combine: (inputs: CommandSlotInput[]) => {
    return Object.assign({}, ...inputs) as CommandSlotInput
  },
})
