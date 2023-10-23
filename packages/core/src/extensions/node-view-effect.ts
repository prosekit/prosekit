import { ProseMirrorPlugin } from '@prosekit/pm/state'
import { type NodeViewConstructor } from '@prosekit/pm/view'

import { Facet } from '../facets/facet'
import type { Extension } from '../types/extension'

import { pluginFacet, type PluginPayload } from './plugin'

export type NodeViewEffectOptions =
  | {
      group: string
      name: string
      args: unknown
    }
  | {
      group: string
      name?: undefined
      factory: (args: unknown) => NodeViewConstructor
    }

export function defineNodeViewEffect(
  options: NodeViewEffectOptions,
): Extension {
  return nodeViewEffectFacet.extension([options])
}

const nodeViewEffectFacet = Facet.define<NodeViewEffectOptions, PluginPayload>({
  convert: (inputs: NodeViewEffectOptions[]): PluginPayload => {
    const nodeViews: { [nodeName: string]: NodeViewConstructor } = {}
    const options: {
      [group: string]: Array<{
        name: string
        args: unknown
      }>
    } = {}
    const factories: {
      [group: string]: (options: unknown) => NodeViewConstructor
    } = {}

    for (const input of inputs) {
      const group = input.group
      if (input.name == null) {
        factories[group] = input.factory
      } else {
        options[group] ||= []
        options[group].push({
          name: input.name,
          args: input.args,
        })
      }
    }

    for (const [group, factory] of Object.entries(factories)) {
      const groupOptions = options[group] || []
      for (const { name, args } of groupOptions) {
        nodeViews[name] = factory(args)
      }
    }

    return () =>
      Object.keys(nodeViews).length > 0
        ? [new ProseMirrorPlugin({ props: { nodeViews } })]
        : []
  },
  next: pluginFacet,
})
