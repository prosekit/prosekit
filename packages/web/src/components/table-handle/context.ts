import { createContext } from '@aria-ui/core'
import type { FindParentNodeResult } from '@prosekit/core'
import type { ResolvedPos } from '@prosekit/pm/model'
import type { CellSelection } from 'prosemirror-tables'

export interface CellAxisWithPos {
  row: number
  col: number
  $cell: ResolvedPos
}

/**
 * @internal
 */
export interface TableCellPopoverContext {
  cellAxis: CellAxisWithPos | null
  cellSelection: CellSelection | null
}

export interface TableHandlePopoverContext {
  table: FindParentNodeResult | null
  cellAxis?: CellAxisWithPos | null
}

/**
 * @internal
 */
export const tableCellPopoverContext = createContext<TableCellPopoverContext>(
  'prosekit-table-cell-popover-context',
  {
    cellAxis: null,
    cellSelection: null,
  },
)

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
