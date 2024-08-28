import { createContext } from '@aria-ui/core'

import type { HoveringCellInfo } from './utils'

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
export type TableHandleRootContext = HoveringCellInfo | null

/**
 * @internal
 */
export const tableHandleRootContext = createContext<TableHandleRootContext>(
  'prosekit-table-handle-root-context',
  null,
)
