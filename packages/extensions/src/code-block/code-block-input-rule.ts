import type { PlainExtension } from '@prosekit/core'

import { defineTextBlockEnterRule, type TextBlockEnterRuleOptions } from '../enter-rule/index.ts'
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
 * The enter rule options behind {@link defineCodeBlockEnterRule}.
 *
 * @internal
 */
export const codeBlockEnterRule: TextBlockEnterRuleOptions = {
  regex: /^```(\S*)$/,
  type: 'codeBlock',
  attrs: getAttrs,
}

/**
 * Adds enter rules for `codeBlock` nodes.
 */
export function defineCodeBlockEnterRule(): PlainExtension {
  return defineTextBlockEnterRule(codeBlockEnterRule)
}

function getAttrs(match: RegExpMatchArray): CodeBlockAttrs {
  return { language: match[1] || '' }
}
