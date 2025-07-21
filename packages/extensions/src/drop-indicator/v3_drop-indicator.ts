import type { PlainExtension } from '@prosekit/core'

import { defineDropIndicatorPayload } from './v3_drop-indicator-facet'
import type { DropIndicatorOptions } from './v3_types'

/**
 * @internal
 */
export type DropIndicatorExtension = PlainExtension

/**
 * Show up a decoration at the drop position when something is dragged over the
 * editor.
 *
 * You can add this extension multiple times. If any extension has `canDrop`
 * callback defined, and it returns `false`, then the drop point will be
 * discard.
 *
 * @param options
 *
 * @public
 */
export function defineDropIndicator(
  options: DropIndicatorOptions,
): DropIndicatorExtension {
  return defineDropIndicatorPayload({
    enabled: true,
    width: options.width,
  })
}
