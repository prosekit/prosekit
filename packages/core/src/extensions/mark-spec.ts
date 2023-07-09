import { MarkSpec, SchemaSpec } from '@prosekit/pm/model'

import { Facet } from '../editor/facet'
import { schemaSlot } from '../editor/slot'
import { Extension } from '../types/extension'

/**
 * @public
 */
export interface MarkSpecOptions<M extends string = string> {
  name: M
  spec: MarkSpec
}

/**
 * @public
 */
export function addMarkSpec<Mark extends string>(
  options: MarkSpecOptions<Mark>,
): Extension<{ MARKS: Mark }> {
  return markSpecFacet.extension([options]) satisfies Extension
}

const markSpecFacet = Facet.define<MarkSpecOptions, SchemaSpec>({
  combine: (options: MarkSpecOptions[]): SchemaSpec => {
    const marks: Record<string, MarkSpec> = {}

    for (const { name, spec } of options) {
      if (marks[name]) {
        throw new Error(`Mark type ${name} has already been defined`)
      }

      marks[name] = spec
    }

    return { marks, nodes: {} }
  },
  next: schemaSlot,
})
