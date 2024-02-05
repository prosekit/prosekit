import { defineNodeSpec, union } from '@prosekit/core'

import { defineWrappingInputRule } from '../input-rule'

export function defineBlockquoteSpec() {
  return defineNodeSpec({
    name: 'blockquote',
    content: 'block+',
    group: 'block',
    defining: true,
    parseDOM: [{ tag: 'blockquote' }],
    toDOM() {
      return ['blockquote', 0]
    },
  })
}

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

/**
 * @public
 */
export function defineBlockquote() {
  return union([defineBlockquoteSpec(), defineBlockquoteInputRule()])
}
