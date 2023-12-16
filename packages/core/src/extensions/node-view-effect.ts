import { ProseMirrorPlugin } from '@prosekit/pm/state'
import { type NodeViewConstructor } from '@prosekit/pm/view'

import { Facet } from '../facets/facet'
import type { Extension } from '../types/extension'

import { pluginFacet, type PluginPayload } from './plugin'

/**
 * @internal
 */
export type NodeViewFactoryOptions<T> =
  | {
      group: string
      name: string
      args: T
    }
  | {
      group: string
      name?: undefined
      factory: (args: T) => NodeViewConstructor
    }

/**
 * @internal
 */
export function defineNodeViewFactory<T>(
  options: NodeViewFactoryOptions<T>,
): Extension {
  return nodeViewFactoryFacet.extension([options])
}

const nodeViewFactoryFacet = Facet.define<
  NodeViewFactoryOptions<any>,
  PluginPayload
>({
  convert: (inputs: NodeViewFactoryOptions<any>[]): PluginPayload => {
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

    return () => [new ProseMirrorPlugin({ props: { nodeViews } })]
  },
  next: pluginFacet,
})
