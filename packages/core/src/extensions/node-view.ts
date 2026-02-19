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
