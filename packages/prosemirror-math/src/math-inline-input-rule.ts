/* eslint-disable unicorn/prefer-string-raw -- Don't use String.raw here for better bundler minification */

import { supportsRegexLookbehind } from '@ocavue/utils'
import { InputRule } from 'prosemirror-inputrules'

// Matches text wrapped in `$` or `$$`, e.g. `$x^2$` or `$$x^2$$`.
export const MATH_INPUT_REGEXP: string = (
  // Don't allow $ before the opening delimiter
  (supportsRegexLookbehind() ? '(?<!\\$)' : '')
  // capture group 1: opening delimiter (`$` or `$$`)
  + '(\\$\\$?)'
  // capture group 2: the math content
  // - a single non-whitespace, non-`$` character
  // - optionally followed by any non-`$` characters and a final non-whitespace, non-`$` character
  + '([^\\s$](?:[^$]*[^\\s$])?)'
  // backreference: closing delimiter must match the opening
  + '\\1'
  // end of input (required by ProseMirror InputRule)
  + '$'
)

/**
 * Creates a ProseMirror {@link InputRule} that converts text wrapped in `$` or
 * `$$` (e.g. `$x^2$`) into an inline math node.
 *
 * @param nodeType - The name of the inline math node type in your schema.
 *
 * @public
 */
export function createMathInlineInputRule(
  nodeType: string,
): InputRule {
  return new InputRule(new RegExp(MATH_INPUT_REGEXP), (state, match, start, end) => {
    const { tr, schema } = state
    const mathText = match[2]
    if (!mathText) return null

    const type = schema.nodes[nodeType]
    if (!type) return null

    const node = type.create(null, schema.text(mathText))
    tr.replaceWith(start, end, node)
    return tr
  })
}
