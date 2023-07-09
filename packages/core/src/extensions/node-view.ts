import { Plugin } from '@prosekit/pm/state'
import { NodeViewConstructor } from '@prosekit/pm/view'

import { Extension, Facet } from '..'

import { PluginFacetInput, pluginFacet } from './plugin'

export interface NodeViewOptions {
  name: string
  constructor: NodeViewConstructor
}

export function addNodeView(options: NodeViewOptions): Extension {
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

    return () => [new Plugin({ props: { nodeViews } })]
  },
  next: pluginFacet,
})
