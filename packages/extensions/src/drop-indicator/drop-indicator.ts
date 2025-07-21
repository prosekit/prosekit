import {
  definePlugin,
  type PlainExtension,
} from '@prosekit/core'

import { dropIndicator } from './drop-indicator-view'

export interface DropIndicatorOptions {
  // TODO: this option is empty for now
}

/**
 * @internal
 */
export type DropIndicatorExtension = PlainExtension

/**
 * Show up a decoration at the drop position when something is dragged over the editor.
 *
 * @public
 */
export function defineDropIndicator(
  options?: DropIndicatorOptions,
): DropIndicatorExtension {
  return definePlugin(() => dropIndicator({ ...options, color: 'red' /* TODO: only for debug, remove me */ }))
}
