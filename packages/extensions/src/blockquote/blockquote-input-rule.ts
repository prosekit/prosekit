import { defineWrappingInputRule } from '../input-rule'

/**
 * Wraps the text block in a blockquote when `>` is typed at the start of a new
 * line followed by a space.
 */
export function defineBlockquoteInputRule() {
  return defineWrappingInputRule({
    regex: /^>\s/,
    type: 'blockquote',
  })
}
