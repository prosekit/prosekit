import { createContext } from '@aria-ui/core'

import type { HoveringCellInfo } from './utils'

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
