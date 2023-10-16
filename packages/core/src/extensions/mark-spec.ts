import type { MarkSpec, SchemaSpec } from '@prosekit/pm/model'

import { Facet } from '../editor/facet'
import { schemaSlot } from '../editor/slots'
import { ProseKitError } from '../error'
import { type Extension } from '../types/extension'

/**
 * @public
 */
export interface MarkSpecOptions<MarkName extends string = string>
  extends MarkSpec {
  name: MarkName
}

/**
 * @public
 */
export function defineMarkSpec<Mark extends string>(
  options: MarkSpecOptions<Mark>,
): Extension<{ MARKS: Mark }> {
  return markSpecFacet.extension([options]) satisfies Extension
}

const markSpecFacet = Facet.define<MarkSpecOptions, SchemaSpec>({
  combine: (options: MarkSpecOptions[]): SchemaSpec => {
    const marks: Record<string, MarkSpec> = {}

    for (const { name, ...spec } of options) {
      if (marks[name]) {
        throw new ProseKitError(`Mark type ${name} has already been defined`)
      }

      marks[name] = spec
    }

    return { marks, nodes: {} }
  },
  next: schemaSlot,
})
