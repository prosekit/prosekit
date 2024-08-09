import { createContext } from '@aria-ui/core'
import type { CellAxisWithPos, CellSelection } from '@prosekit/extensions/table'

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
