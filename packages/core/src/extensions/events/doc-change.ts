import type { EditorState } from '@prosekit/pm/state'
import type { EditorView } from '@prosekit/pm/view'

import { defineUpdateHandler } from './plugin-view'

/**
 * A function that is called when the editor document is changed.
 *
 * @public
 */
export type DocChangeHandler = (
  view: EditorView,
  prevState: EditorState,
) => void

/**
 * Registers a event handler that is called when the editor document is changed.
 *
 * @public
 */
export function defineDocChangeHandler(handler: DocChangeHandler) {
  return defineUpdateHandler((view, prevState) => {
    if (!view.state.doc.eq(prevState.doc)) {
      handler(view, prevState)
    }
  })
}
