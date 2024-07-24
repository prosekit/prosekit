import type { PlainExtension } from '@prosekit/core'

import { defineTextBlockEnterRule } from '../enter-rule'
import { defineTextBlockInputRule } from '../input-rule'

import type { CodeBlockAttrs } from './code-block-types'

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
