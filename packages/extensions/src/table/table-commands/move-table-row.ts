import type { Command } from '@prosekit/pm/state'

import { moveRow } from '../table-utils'

/**
 * Options for {@link moveTableRow}
 *
 * @public
 */
export interface MoveTableRowOptions {
  /**
   * The source row index to move from.
   */
  from: number

  /**
   * The destination row index to move to.
   */
  to: number

  /**
   * Whether to select the moved row after the operation.
   *
   * @default true
   */
  select?: boolean

  /**
   * Optional position to resolve table from. If not provided, uses the current selection.
   */
  pos?: number
}

/**
 * Move a table row from index `origin` to index `target`.
 *
 * @public
 */
export function moveTableRow(options: MoveTableRowOptions): Command {
  return (state, dispatch) => {
    const { from, to, select = true, pos = state.selection.from } = options
    const tr = state.tr
    if (moveRow({ tr, originIndex: from, targetIndex: to, select, pos })) {
      dispatch?.(tr)
      return true
    }
    return false
  }
}
