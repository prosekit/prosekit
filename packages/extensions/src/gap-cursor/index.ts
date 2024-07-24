import { definePlugin } from '@prosekit/core'
import { gapCursor } from 'prosemirror-gapcursor'

export { GapCursor } from 'prosemirror-gapcursor'

/**
 * Create a gap cursor plugin.
 *
 * @remarks
 *
 * When enabled, this will capture clicks near and arrow-key-motion past places
 * that don't have a normally selectable position nearby, and create a gap
 * cursor selection for them. The cursor is drawn as an element with class
 * `ProseMirror-gapcursor`.
 *
 * Make sure to import the styles as shown below.
 *
 * [prosemirror-gapcursor](https://github.com/ProseMirror/prosemirror-gapcursor) for more information.
 *
 * @public
 */
export function defineGapCursor() {
  return definePlugin(() => gapCursor())
}
