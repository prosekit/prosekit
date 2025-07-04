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
  origin: number

  /**
   * The destination row index to move to.
   */
  target: number

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
    const { origin, target, select = true, pos } = options
    const tr = state.tr
    if (moveRow({ tr, origin, target, select, pos })) {
      dispatch?.(tr)
      return true
    }
    return false
  }
}
