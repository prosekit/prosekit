import {
  defineNodeSpec,
  union,
  type Extension,
  type Union,
} from '@prosekit/core'
import type { Attrs } from '@prosekit/pm/model'

import { defineWrappingInputRule } from '../input-rule'

/**
 * @internal
 */
export type BlockquoteSpecExtension = Extension<{
  Nodes: {
    blockquote: Attrs
  }
}>

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
 * @internal
 */
export type BlockquoteExtension = Union<[BlockquoteSpecExtension]>

/**
 * @public
 */
export function defineBlockquote(): BlockquoteExtension {
  return union([defineBlockquoteSpec(), defineBlockquoteInputRule()])
}
