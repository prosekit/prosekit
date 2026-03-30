import type { PlainExtension } from '@prosekit/core'

import { defineTextBlockEnterRule } from '../enter-rule/index.ts'
import { defineTextBlockInputRule } from '../input-rule/index.ts'

import type { CodeBlockAttrs } from './code-block-types.ts'

/**
 * Adds input rules for `codeBlock` nodes.
 *
 * @public
 */
export function defineCodeBlockInputRule(): PlainExtension {
  return defineTextBlockInputRule({
    regex: /^```(\S*)\s$/,
    type: 'codeBlock',
    attrs: getAttrs,
  })
}

/**
 * Adds enter rules for `codeBlock` nodes.
 *
 * @public
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
