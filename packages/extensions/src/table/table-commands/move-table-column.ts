import type { Command } from '@prosekit/pm/state'

import { moveColumn } from '../table-utils'

/**
 * Options for {@link moveTableColumn}
 *
 * @public
 */
export interface MoveTableColumnOptions {
  /**
   * The source column index to move from.
   */
  origin: number

  /**
   * The destination column index to move to.
   */
  target: number

  /**
   * Whether to select the moved column after the operation.
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
 * Move a table column from index `origin` to index `target`.
 *
 * @public
 */
export function moveTableColumn(options: MoveTableColumnOptions): Command {
  return (state, dispatch) => {
    const { origin, target, select = true, pos } = options
    const tr = state.tr
    if (moveColumn({ tr, origin, target, select, pos })) {
      dispatch?.(tr)
      return true
    }
    return false
  }
}
