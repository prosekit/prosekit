import { ProseMirrorPlugin } from '@prosekit/pm/state'
import { type NodeViewConstructor } from '@prosekit/pm/view'

import { Facet } from '../editor/facet'
import type { Extension } from '../types/extension'

import { pluginFacet, type PluginFacetInput } from './plugin'

export interface NodeViewOptions {
  name: string
  constructor: NodeViewConstructor
}

export function defineNodeView(options: NodeViewOptions): Extension {
  return nodeViewFacet.extension([options])
}

type NodeViewFacetInput = NodeViewOptions
type NodeViewFacetOutput = PluginFacetInput

const nodeViewFacet = Facet.define<NodeViewFacetInput, NodeViewFacetOutput>({
  combine: (inputs: NodeViewFacetInput[]): NodeViewFacetOutput => {
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
