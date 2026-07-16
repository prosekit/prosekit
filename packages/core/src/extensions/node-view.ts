import { PluginKey, ProseMirrorPlugin } from '@prosekit/pm/state'
import type { NodeViewConstructor } from '@prosekit/pm/view'

import { defineFacetPayload } from '../facets/facet-extension.ts'
import { defineFacet } from '../facets/facet.ts'
import type { Extension } from '../types/extension.ts'

import { pluginFacet, type PluginPayload } from './plugin.ts'

export interface NodeViewOptions {
  name: string
  constructor: NodeViewConstructor
}

export function defineNodeView(options: NodeViewOptions): Extension {
  return defineFacetPayload(nodeViewFacet, [options])
}

const nodeViewFacet = defineFacet<NodeViewOptions, PluginPayload>({
  reducer: (inputs: NodeViewOptions[]): PluginPayload => {
    const nodeViews: { [nodeName: string]: NodeViewConstructor } = {}
    const seen = new Set<string>()

    for (const input of inputs) {
      const { name, constructor } = input
      if (!seen.has(name)) {
        seen.add(name)
        nodeViews[name] = constructor
      }
    }

    return () => [
      new ProseMirrorPlugin({
        key: new PluginKey('prosekit-node-view'),
        props: { nodeViews },
      }),
    ]
  },
  parent: pluginFacet,
})
