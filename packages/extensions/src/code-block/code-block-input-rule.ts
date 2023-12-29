import { defineInputRule, getNodeType } from '@prosekit/core'
import { textblockTypeInputRule } from '@prosekit/pm/inputrules'

import { defineTextBlockEnterRule } from '../enter-rule'

import type { CodeBlockAttrs } from './code-block-types'

/**
 * Adds input rules for `codeBlock` nodes.
 *
 * @public
 */
export function defineCodeBlockInputRule() {
  return defineInputRule(({ schema }) => {
    const nodeType = getNodeType(schema, 'codeBlock')
    return textblockTypeInputRule(/^```(\S*)\s$/, nodeType, getAttrs)
  })
}

/**
 * Adds enter rules for `codeBlock` nodes.
 *
 * @public
 */
export function defineCodeBlockEnterRule() {
  return defineTextBlockEnterRule({
    regex: /^```(\S*)$/,
    type: 'codeBlock',
    attrs: getAttrs,
  })
}

function getAttrs(match: RegExpMatchArray): CodeBlockAttrs {
  return { language: match[1] || '' }
}
