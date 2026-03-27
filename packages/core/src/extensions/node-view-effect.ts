import { isNotNullish } from '@ocavue/utils'
import { PluginKey, ProseMirrorPlugin } from '@prosekit/pm/state'
import type { NodeViewConstructor } from '@prosekit/pm/view'

import { defineFacet } from '../facets/facet'
import { defineFacetPayload } from '../facets/facet-extension'
import type { Extension } from '../types/extension'

import { pluginFacet, type PluginPayload } from './plugin'

/**
 * @internal
 */
export type NodeViewFactoryOptions<T> = {
  group: string
  factory: (args: T) => NodeViewConstructor
}

/**
 * @internal
 */
export type NodeViewComponentOptions<T> = {
  group: string
  name: string
  args: T
}

type NodeViewFactoryInput = [
  NodeViewFactoryOptions<any> | null,
  NodeViewComponentOptions<any> | null,
]

/**
 * @internal
 */
export function defineNodeViewFactory<T>(
  options: NodeViewFactoryOptions<T>,
): Extension {
  const input: NodeViewFactoryInput = [options, null]
  return defineFacetPayload(nodeViewFactoryFacet, [input])
}

/**
 * @internal
 */
export function defineNodeViewComponent<T>(
  options: NodeViewComponentOptions<T>,
): Extension {
  const input: NodeViewFactoryInput = [null, options]
  return defineFacetPayload(nodeViewFactoryFacet, [input])
}

const isServer = typeof window === 'undefined'

const nodeViewFactoryFacet = defineFacet<NodeViewFactoryInput, PluginPayload>({
  reducer: (inputs: NodeViewFactoryInput[]): PluginPayload => {
    // Don't register node views on the server
    if (isServer) return []

    const nodeViews: { [nodeName: string]: NodeViewConstructor } = {}

    const factories = inputs.map((x) => x[0]).filter(isNotNullish)
    const options = inputs.map((x) => x[1]).filter(isNotNullish)

    for (const { group, name, args } of options) {
      const factory = factories.find((factory) => factory.group === group)
      if (!factory) continue
      nodeViews[name] = factory.factory(args)
    }

    return () => [
      new ProseMirrorPlugin({
        key: new PluginKey('prosekit-node-view-effect'),
        props: { nodeViews },
      }),
    ]
  },
  parent: pluginFacet,
})
