import {
  createContext,
  type Context,
} from '@aria-ui/core'

import type { HoveringCellInfo } from './utils'

/**
 * @internal
 */
export type TableHandleRootContext = HoveringCellInfo | null

/**
 * @internal
 */
export const tableHandleRootContext: Context<TableHandleRootContext> = createContext(
  'prosekit-table-handle-root-context',
  null,
)
