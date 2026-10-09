import { defaultBlockAt, getNodeType, isNodeSelection, type PlainExtension } from '@prosekit/core'
import { InputRule } from '@prosekit/pm/inputrules'
import { TextSelection } from '@prosekit/pm/state'

import { defineInputRule, type InputRuleHandler } from '../input-rule/index.ts'

/**
 * The pattern and handler behind {@link defineHorizontalRuleInputRule}.
 *
 * @internal
 */
export const horizontalRuleInputRule: { regex: RegExp; handler: InputRuleHandler } = {
  regex: /^---$/,
  handler: (state, match, start, end) => {
    const { schema } = state
    const { tr } = state
    const type = getNodeType(schema, 'horizontalRule')
    const $start = state.doc.resolve(start)
    const index = $start.index(-1)
    // Bail when the parent cannot hold a horizontal rule
    if (!$start.node(-1).canReplaceWith(index, index, type)) {
      return null
    }
    const node = type.createChecked()
    // Replace from just before the textblock, so an ancestor that the
    // replacement leaves empty (e.g. an empty list item) is consumed
    // instead of wrapping the new horizontal rule.
    tr.replaceRangeWith($start.before(), end, node)
    // When no textblock follows the rule, append one to hold the caret.
    const { selection } = tr
    if (isNodeSelection(selection) && selection.node.type === type) {
      const pos = selection.$to.pos
      const $pos = tr.doc.resolve(pos)
      const blockType = defaultBlockAt($pos.parent.contentMatchAt($pos.index()))
      const block = blockType?.createAndFill()
      if (block) {
        tr.insert(pos, block)
        tr.setSelection(TextSelection.create(tr.doc, pos + 1))
      }
    }
    return tr.scrollIntoView()
  },
}

/**
 * Replaces `---` at the start of a text block with a horizontal rule.
 */
export function defineHorizontalRuleInputRule(): PlainExtension {
  return defineInputRule(new InputRule(horizontalRuleInputRule.regex, horizontalRuleInputRule.handler))
}
