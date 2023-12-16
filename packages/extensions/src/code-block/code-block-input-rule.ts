import { defineInputRule, getNodeType } from '@prosekit/core'
import { textblockTypeInputRule } from '@prosekit/pm/inputrules'

import type { CodeBlockAttrs } from './code-block-types'

/**
 * Adds input rules for `codeBlock` nodes.
 *
 * @public
 */
export function defineCodeBlockInputRule() {
  return defineInputRule(({ schema }) => {
    const nodeType = getNodeType(schema, 'codeBlock')
    const getAttrs = (match: RegExpMatchArray): CodeBlockAttrs => {
      return { language: match[1] || '' }
    }
    return textblockTypeInputRule(/^```(\S*)\s$/, nodeType, getAttrs)
  })
}
