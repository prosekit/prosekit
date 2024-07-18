import { PluginKey, ProseMirrorPlugin } from '@prosekit/pm/state'
import type { NodeViewConstructor } from '@prosekit/pm/view'

import { defineFacet } from '../facets/facet'
import { defineFacetPayload } from '../facets/facet-extension'
import type { Extension } from '../types/extension'

import { pluginFacet, type PluginPayload } from './plugin'

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

    for (const input of inputs) {
      if (!nodeViews[input.name]) {
        nodeViews[input.name] = input.constructor
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
