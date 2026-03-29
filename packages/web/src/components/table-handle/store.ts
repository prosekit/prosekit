import { createContext, createSignal, type Context, type Signal } from '@aria-ui/core'

import type { DndInfo, HoveringCellInfo } from './utils.ts'

/**
 * @internal
 */
export const defaultDndInfo: DndInfo = {
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
export class TableHandleStore {
  readonly dnd: Signal<DndInfo> = createSignal<DndInfo>(defaultDndInfo)
  readonly getHoveringCell: () => HoveringCellInfo | null

  constructor(getHoveringCell: () => HoveringCellInfo | null) {
    this.getHoveringCell = getHoveringCell
  }
}

/**
 * @internal
 */
export const tableHandleStoreContext: Context<TableHandleStore> = createContext<TableHandleStore>('prosekit-table-handle-store')
