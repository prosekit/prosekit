import type { MarkSpec, NodeSpec, SchemaSpec } from '@prosekit/pm/model'
import OrderedMap from 'orderedmap'

import { Facet } from './facet'

export type SchemaPayload = SchemaSpec

export const schemaFacet = Facet.defineRootFacet<SchemaPayload>({
  convert: (specs): SchemaPayload => {
    let nodes = OrderedMap.from<NodeSpec>({})
    let marks = OrderedMap.from<MarkSpec>({})
    let topNode: string | undefined = undefined

    for (const spec of specs) {
      nodes = nodes.append(spec.nodes)
      marks = marks.append(spec.marks ?? {})
      topNode = topNode ?? spec.topNode
    }

    return { nodes, marks, topNode }
  },
})
