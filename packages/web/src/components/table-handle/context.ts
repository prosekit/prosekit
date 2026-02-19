import { createContext, type Context } from '@aria-ui/core'

import type { DndInfo, HoveringCellInfo } from './utils.ts'

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

/**
 * @internal
 */
export type TableHandleDndContext = DndInfo

/**
 * @internal
 */
export const defaultTableHandleDndContext: TableHandleDndContext = {
  dragging: false,
  direction: 'row',
  draggingIndex: -1,
  droppingIndex: -1,
  x: -1,
  y: -1,
  startX: -1,
  startY: -1,
}

/**
 * @internal
 */
export const tableHandleDndContext: Context<TableHandleDndContext> = createContext(
  'prosekit-table-handle-dnd-context',
  defaultTableHandleDndContext,
)
