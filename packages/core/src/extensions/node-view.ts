import { Plugin } from '@prosekit/pm/state'
import { type NodeViewConstructor } from '@prosekit/pm/view'

import { type Extension, Facet } from '..'

import { type PluginFacetInput, pluginFacet } from './plugin'

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

    return () => [new Plugin({ props: { nodeViews } })]
  },
  next: pluginFacet,
})
