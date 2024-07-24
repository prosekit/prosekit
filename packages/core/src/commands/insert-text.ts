import type { Command } from '@prosekit/pm/state'

/**
 * @public
 */
export type InsertTextOptions = {
  text: string
  from?: number
  to?: number
}

/**
 * Returns a command that inserts the given text.
 *
 * @public
 */
export function insertText({ text, from, to }: InsertTextOptions): Command {
  return (state, dispatch) => {
    if (text) {
      dispatch?.(state.tr.insertText(text, from, to))
    }
    return true
  }
}
