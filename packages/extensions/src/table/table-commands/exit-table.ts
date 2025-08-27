import {
  defaultBlockAt,
} from '@prosekit/core'
import {
  TextSelection,
} from '@prosekit/pm/state'
import type {
  Command,
} from '@prosekit/pm/state'
import type {
  TableRole,
} from 'prosemirror-tables'

/**
 * When the selection is in a table node, create a default block after the table
 * table, and move the cursor there.
 *
 * @public
 */
export const exitTable: Command = (state, dispatch) => {
  const { $head, $anchor } = state.selection

  if (!$head.sameParent($anchor)) {
    return false
  }

  let tableStart = -1
  let tableDepth = -1
  for (let depth = $head.depth; depth >= 0; depth--) {
    const node = $head.node(depth)
    if ((node.type.spec.tableRole as TableRole) === 'table') {
      tableStart = $head.before(depth)
      tableDepth = depth
    }
  }

  if (tableStart < 0 || tableDepth <= 0) {
    return false
  }

  const above = $head.node(tableDepth - 1)
  const after = $head.indexAfter(tableDepth - 1)
  const type = defaultBlockAt(above.contentMatchAt(after))
  const node = type?.createAndFill()

  if (!type || !node || !above.canReplaceWith(after, after, type)) {
    return false
  }

  if (dispatch) {
    const pos = $head.after(tableDepth)
    const tr = state.tr.replaceWith(pos, pos, node)
    tr.setSelection(TextSelection.near(tr.doc.resolve(pos), 1))
    dispatch(tr.scrollIntoView())
  }
  return true
}