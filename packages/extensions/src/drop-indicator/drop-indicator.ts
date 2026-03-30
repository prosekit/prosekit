import type { PlainExtension } from '@prosekit/core'
import type { DropIndicatorPluginOptions } from 'prosemirror-drop-indicator'

import { defineDropIndicatorPayload } from './drop-indicator-facet.ts'

/**
 * @internal
 */
export type DropIndicatorExtension = PlainExtension

/**
 * Defines an extension that controls the behavior of the drop indicator.
 *
 * This extension itself doesn't draw the drop indicator, but it provides the
 * necessary callbacks to do so. You probably don't want to use this extension
 * directly, but rather use the `<DropIndicator>` component.
 *
 * You can add this extension multiple times. If any extension has `onDrag`
 * callback defined, and it returns `false`, then the drop point will be
 * discarded.
 *
 * @public
 */
export function defineDropIndicator(
  options?: DropIndicatorOptions,
): DropIndicatorExtension {
  return defineDropIndicatorPayload(options ?? {})
}

/**
 * Options for {@link defineDropIndicator}.
 *
 * @public
 */
export interface DropIndicatorOptions extends DropIndicatorPluginOptions {}
