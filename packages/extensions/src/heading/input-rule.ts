import type { Extension } from '@prosekit/core'

import { defineTextBlockInputRule } from '../input-rule'

import type { HeadingAttrs } from './types'

/**
 * @internal
 */
export type HeadingInputRuleExtension = Extension 


/**
 * Converts the text block to a heading when `#` is typed at the start of a new
 * line followed by a space.
 * 
 * @internal
 */
export function defineHeadingInputRule(): HeadingInputRuleExtension {
  return defineTextBlockInputRule({
    regex: /^(#{1,6})\s$/,
    type: 'heading',
    attrs: (match) => {
      const level: number = match[1]?.length ?? 1
      return { level } satisfies HeadingAttrs
    },
  })
}
