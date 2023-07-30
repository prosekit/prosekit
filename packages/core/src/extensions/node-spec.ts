import type { NodeSpec, SchemaSpec } from '@prosekit/pm/model'

import { Facet } from '../editor/facet'
import { schemaSlot } from '../editor/slots'
import type { Extension } from '../types/extension'

/**
 * @public
 */
export interface NodeSpecOptions<N extends string = string> {
  name: N
  spec: NodeSpec
  topNode?: boolean
}

/**
 * @public
 */
export function addNodeSpec<Node extends string>(
  options: NodeSpecOptions<Node>,
): Extension<{ NODES: Node }> {
  return nodeSpecFacet.extension([options]) satisfies Extension
}

const nodeSpecFacet = Facet.define<NodeSpecOptions, SchemaSpec>({
  combine: (options: NodeSpecOptions[]): SchemaSpec => {
    const nodes: Record<string, NodeSpec> = {}
    let topNode: string | undefined = undefined

    for (const { name, spec, topNode: isTopNode } of options) {
      if (nodes[name]) {
        throw new Error(`Node type ${name} has already been defined`)
      }

      nodes[name] = spec

      if (isTopNode && !topNode) {
        topNode = name
      }
    }

    return { nodes, topNode }
  },
  next: schemaSlot,
})
