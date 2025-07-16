import {
  definePlugin,
  type PlainExtension,
} from '@prosekit/core'

import { dropIndicator } from './dropcursor'

export interface DropIndicatorOptions {
  /**
   * The color of the cursor.  Use `false` to apply no color and rely only on class.
   *
   * @default 'black'
   */
  color?: string | false

  /**
   * The precise width of the cursor in pixels.
   *
   * @default 1
   */
  width?: number

  /**
   * A CSS class name to add to the cursor element.
   */
  class?: string
}

/**
 * @internal
 */
export type DropIndicatorExtension = PlainExtension

/**
 * Show up a decoration at the drop position when something is dragged over the editor.
 *
 * See [prosemirror-dropcursor](https://github.com/ProseMirror/prosemirror-dropcursor) for more information.
 *
 * @public
 */
export function defineDropIndicator(
  options?: DropIndicatorOptions,
): DropIndicatorExtension {
  return definePlugin(() => dropIndicator({ ...options, color: 'red' /* TODO: only for debug, remove me */ }))
}
