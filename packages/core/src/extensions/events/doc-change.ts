import type { EditorState } from '@prosekit/pm/state'
import type { EditorView } from '@prosekit/pm/view'

import type { PlainExtension } from '../../types/extension.ts'

import { defineUpdateHandler } from './plugin-view.ts'

/**
 * A function that is called when the editor document is changed.
 *
 * @param view - The editor view.
 * @param prevState - The previous editor state.
 */
export type DocChangeHandler = (
  view: EditorView,
  prevState: EditorState,
) => void

/**
 * Registers a event handler that is called when the editor document is changed.
 */
export function defineDocChangeHandler(
  handler: DocChangeHandler,
): PlainExtension {
  return defineUpdateHandler((view, prevState) => {
    if (!view.state.doc.eq(prevState.doc)) {
      handler(view, prevState)
    }
  })
}
