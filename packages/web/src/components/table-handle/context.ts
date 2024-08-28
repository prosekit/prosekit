import { createContext } from '@aria-ui/core'
import type { ResolvedPos } from '@prosekit/pm/model'

export interface CellAxisWithPos {
  row: number
  col: number
  $cell: ResolvedPos
}

/**
 * @internal
 */
export const openContext = createContext<boolean>(
  'prosekit-table-cell-popover-open-context',
  false,
)

/**
 * @internal
 */
export interface TableHandleRootContext {
  cellAxis?: CellAxisWithPos | null
}

/**
 * @internal
 */
export const tableHandleRootContext = createContext<TableHandleRootContext>(
  'prosekit-table-handle-root-context',
  {
    cellAxis: null,
  },
)
