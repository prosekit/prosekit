import type { PlainExtension } from '@prosekit/core'

import { defineDropIndicatorPayload } from './v3_drop-indicator-facet'
import type { DropIndicatorHandlersOptions } from './v3_types'

/**
 * @internal
 */
export type DropIndicatorHandlersExtension = PlainExtension

/**
 * @public
 */
export function defineDropIndicatorHandlers(
  options: DropIndicatorHandlersOptions,
): DropIndicatorHandlersExtension {
  return defineDropIndicatorPayload(options)
}
