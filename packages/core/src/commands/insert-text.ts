import type { Command } from '@prosekit/pm/state'

export function insertText({
  text,
  from,
  to,
}: {
  text: string
  from?: number
  to?: number
}): Command {
  return (state, dispatch) => {
    if (text) {
      dispatch?.(state.tr.insertText(text, from, to))
    }
    return true
  }
}
