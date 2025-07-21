import type { PlainExtension } from '@prosekit/core'

import { defineDropIndicatorPayload } from './v3_drop-indicator-facet'
import type { DropIndicatorPredicateOptions } from './v3_types'

/**
 * @internal
 */
export type DropIndicatorPredicateExtension = PlainExtension

/**
 * @public
 */
export function defineDropIndicatorPredicate(
  options: DropIndicatorPredicateOptions,
): DropIndicatorPredicateExtension {
  return defineDropIndicatorPayload(options)
}
