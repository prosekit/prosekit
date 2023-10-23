import { ProseMirrorPlugin } from '@prosekit/pm/state'
import { type NodeViewConstructor } from '@prosekit/pm/view'

import { Facet } from '../facets/facet'
import type { Extension } from '../types/extension'

import { pluginFacet, type PluginPayload } from './plugin'

export interface NodeViewOptions {
  name: string
  constructor: NodeViewConstructor
}

export function defineNodeView(options: NodeViewOptions): Extension {
  return nodeViewFacet.extension([options])
}

const nodeViewFacet = Facet.define<NodeViewOptions, PluginPayload>({
  convert: (inputs: NodeViewOptions[]): PluginPayload => {
    const nodeViews: { [nodeName: string]: NodeViewConstructor } = {}

    for (const input of inputs) {
      if (!nodeViews[input.name]) {
        nodeViews[input.name] = input.constructor
      }
    }

    return () => [new ProseMirrorPlugin({ props: { nodeViews } })]
  },
  next: pluginFacet,
})
