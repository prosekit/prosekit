import { createContext } from '@aria-ui/core'
import type { FindParentNodeResult } from '@prosekit/core'
import type {
  CellAxis,
  CellAxisWithPos,
  CellSelection,
} from '@prosekit/extensions/table'

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
export interface TableColumnPopoverContext {
  table: FindParentNodeResult | null
  cellAxis: CellAxis | null
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
export const tableColumnPopoverContext = createContext<TableColumnPopoverContext>(
  'prosekit-table-column-popover-context',
  {
    cellAxis: null,
    table: null,
  },
)

/**
 * @internal
 */
export const openContext = createContext<boolean>(
  'prosekit-table-cell-popover-open-context',
  false,
)
