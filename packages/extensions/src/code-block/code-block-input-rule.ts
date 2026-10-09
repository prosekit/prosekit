import type { PlainExtension } from '@prosekit/core'

import { defineTextBlockEnterRule } from '../enter-rule/index.ts'
import { defineTextBlockInputRule, type TextBlockInputRuleOptions } from '../input-rule/index.ts'

import type { CodeBlockAttrs } from './code-block-types.ts'

/**
 * The input rule options behind {@link defineCodeBlockInputRule}.
 *
 * @internal
 */
export const codeBlockInputRule: TextBlockInputRuleOptions = {
  regex: /^```(\S*)\s$/,
  type: 'codeBlock',
  attrs: getAttrs,
}

/**
 * Adds input rules for `codeBlock` nodes.
 */
export function defineCodeBlockInputRule(): PlainExtension {
  return defineTextBlockInputRule(codeBlockInputRule)
}

/**
 * Adds enter rules for `codeBlock` nodes.
 */
export function defineCodeBlockEnterRule(): PlainExtension {
  return defineTextBlockEnterRule({
    regex: /^```(\S*)$/,
    type: 'codeBlock',
    attrs: getAttrs,
  })
}

function getAttrs(match: RegExpMatchArray): CodeBlockAttrs {
  return { language: match[1] || '' }
}
