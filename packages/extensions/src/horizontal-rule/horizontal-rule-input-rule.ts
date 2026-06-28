import { getNodeType, union, type PlainExtension } from '@prosekit/core'
import { InputRule } from '@prosekit/pm/inputrules'

import { defineInputRule } from '../input-rule/index.ts'

export function defineHorizontalRuleInputRule(): PlainExtension {
  return union(
    defineInputRule(
      new InputRule(/^---$/, (state, match, start, end) => {
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
        tr.delete(start, end).insert(start - 1, node)
        return tr.scrollIntoView()
      }),
    ),
  )
}
