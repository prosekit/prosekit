import type { PlainExtension } from '@prosekit/core'

import { defineTextBlockInputRule, type TextBlockInputRuleOptions } from '../input-rule/index.ts'

import type { HeadingAttrs } from './heading-types.ts'

/**
 * The input rule options behind {@link defineHeadingInputRule}.
 *
 * @internal
 */
export const headingInputRule: TextBlockInputRuleOptions = {
  regex: /^(#{1,6})\s$/,
  type: 'heading',
  attrs: (match) => {
    const level: number = match[1]?.length ?? 1
    return { level } satisfies HeadingAttrs
  },
}

/**
 * Converts the text block to a heading when `#` is typed at the start of a new
 * line followed by a space.
 *
 * @internal
 */
export function defineHeadingInputRule(): PlainExtension {
  return defineTextBlockInputRule(headingInputRule)
}
