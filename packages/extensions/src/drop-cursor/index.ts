import { definePlugin } from '@prosekit/core'
import { dropCursor } from 'prosemirror-dropcursor'

export interface DropCursorOptions {
  /**
   * The color of the cursor.
   *
   * @default 'black'
   */
  color?: string

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
 * Show up a decoration at the drop position when something is dragged over the editor.
 *
 * See [prosemirror-dropcursor](https://github.com/ProseMirror/prosemirror-dropcursor) for more information.
 *
 * @public
 */
export function defineDropCursor(options?: DropCursorOptions) {
  return definePlugin(() => dropCursor(options))
}
