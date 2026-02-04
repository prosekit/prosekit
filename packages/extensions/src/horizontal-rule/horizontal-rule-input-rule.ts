import { getNodeType, union, type PlainExtension } from '@prosekit/core'
import { InputRule } from '@prosekit/pm/inputrules'

import { defineInputRule } from '../input-rule'

/**
 * @public
 */
export function defineHorizontalRuleInputRule(): PlainExtension {
  return union(
    defineInputRule(
      new InputRule(/^---$/, (state, match, start, end) => {
        const { schema } = state
        const { tr } = state
        const type = getNodeType(schema, 'horizontalRule')
        const node = type.createChecked()
        tr.delete(start, end).insert(start - 1, node)
        return tr.scrollIntoView()
      }),
    ),
  )
}
