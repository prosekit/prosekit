import type { PlainExtension } from '@prosekit/core'

import { defineWrappingInputRule, type WrappingInputRuleOptions } from '../input-rule/index.ts'

/**
 * The input rule options behind {@link defineBlockquoteInputRule}.
 *
 * @internal
 */
export const blockquoteInputRule: WrappingInputRuleOptions = {
  regex: /^>\s/,
  type: 'blockquote',
}

/**
 * Wraps the text block in a blockquote when `>` is typed at the start of a new
 * line followed by a space.
 */
export function defineBlockquoteInputRule(): PlainExtension {
  return defineWrappingInputRule(blockquoteInputRule)
}
