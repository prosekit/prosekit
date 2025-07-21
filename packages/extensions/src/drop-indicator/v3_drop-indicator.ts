import {
  defineDOMEventHandler,
  definePlugin,
  type PlainExtension,
} from '@prosekit/core'

import { createDropIndicatorPlugin } from './v3_drop-indicator-plugin'
import type { DropIndicatorOptions } from './v3_types'

/**
 * @internal
 */
export type DropIndicatorExtension = PlainExtension

/**
 * Show up a decoration at the drop position when something is dragged over the editor.
 *
 * @param options
 *
 * @public
 */
export function defineDropIndicator(
  {
    width = 2,
  }: DropIndicatorOptions = {},
): DropIndicatorExtension {
  return definePlugin(createDropIndicatorPlugin({
    width,
  }))
}
