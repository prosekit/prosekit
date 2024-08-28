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

/**
 * @internal
 */
export interface TableColumnPopoverContext
  extends Required<TableHandlePopoverContext> {}

/**
 * @internal
 */
export interface TableRowPopoverContext
  extends Required<TableHandlePopoverContext> {}

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
export const tableColumnPopoverContext =
  createContext<TableColumnPopoverContext>(
    'prosekit-table-column-popover-context',
    {
      cellAxis: null,
      table: null,
    },
  )

/**
 * @internal
 */
export const tableRowPopoverContext = createContext<TableRowPopoverContext>(
  'prosekit-table-row-popover-context',
  {
    cellAxis: null,
    table: null,
  },
)

/**
 * @internal
 */
export const tableHandlePopoverContext =
  createContext<TableHandlePopoverContext>(
    'prosekit-table-handle-popover-context',
    {
      table: null,
      cellAxis: null,
    },
  )

/**
 * @internal
 */
export const openContext = createContext<boolean>(
  'prosekit-table-cell-popover-open-context',
  false,
)
