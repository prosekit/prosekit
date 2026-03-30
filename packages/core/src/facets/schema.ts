import { Schema, type SchemaSpec } from '@prosekit/pm/model'

import { assert } from '../utils/assert.ts'

import { defineFacet, type Facet } from './facet.ts'
import { rootFacet, type RootPayload } from './root.ts'

export const schemaFacet: Facet<SchemaSpec, RootPayload> = defineFacet({
  reducer: (specs) => {
    assert(specs.length <= 1)
    const spec = specs[0]
    const schema = spec ? new Schema(spec) : null
    return { schema }
  },
  parent: rootFacet,
  singleton: true,
})
