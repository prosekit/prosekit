import type { MarkSpec, NodeSpec, SchemaSpec } from '@prosekit/pm/model'
import OrderedMap from 'orderedmap'

import { defineFacet } from './facet'
import { schemaFacet } from './schema'

export const schemaSpecFacet = defineFacet<SchemaSpec, SchemaSpec>({
  reducer: (specs): SchemaSpec => {
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
  parent: schemaFacet,
  singleton: true,
})
