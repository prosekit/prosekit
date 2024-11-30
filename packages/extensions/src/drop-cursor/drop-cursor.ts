import {
  definePlugin,
  type PlainExtension,
} from '@prosekit/core'
import { dropCursor } from 'prosemirror-dropcursor'

export interface DropCursorOptions {
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
export type DropCursorExtension = PlainExtension

/**
 * Show up a decoration at the drop position when something is dragged over the editor.
 *
 * See [prosemirror-dropcursor](https://github.com/ProseMirror/prosemirror-dropcursor) for more information.
 *
 * @public
 */
export function defineDropCursor(
  options?: DropCursorOptions,
): DropCursorExtension {
  return definePlugin(() => dropCursor(options))
}
