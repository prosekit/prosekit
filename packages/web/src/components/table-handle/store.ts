import { computed, createContext, createSignal, type Context, type Signal } from '@aria-ui/core'
import type { OpenChangeEvent } from '@aria-ui/elements/overlay'
import { createOverlayStore, type OverlayStore } from '@aria-ui/elements/overlay'

import type { HoveringCellInfo } from './utils.ts'

function noop(): void {}
function returnTrue(): boolean {
  return true
}
function returnFalse(): boolean {
  return false
}

class DndStore {
  readonly dragging: Signal<boolean> = createSignal(false)
  readonly direction: Signal<'row' | 'col'> = createSignal<'row' | 'col'>('row')
  readonly draggingIndex: Signal<number> = createSignal(-1)
  readonly droppingIndex: Signal<number> = createSignal(-1)
  readonly x: Signal<number> = createSignal(-1)
  readonly y: Signal<number> = createSignal(-1)
  readonly startX: Signal<number> = createSignal(-1)
  readonly startY: Signal<number> = createSignal(-1)
}

/**
 * @internal
 */
export interface TableHandleStore {
  readonly dndStore: DndStore
  readonly setIsColumnMenuOpen: (open: boolean) => void
  readonly setIsRowMenuOpen: (open: boolean) => void
  readonly columnOverlayStore: OverlayStore
  readonly rowOverlayStore: OverlayStore
  readonly getReferenceCell: () => HoveringCellInfo | undefined
}

/**
 * @internal
 */
export function createTableHandleStore(
  getHoveringCellInfo: () => HoveringCellInfo | undefined,
  getCanShow: () => boolean,
): TableHandleStore {
  const isColumnMenuOpen = createSignal(false)
  const isRowMenuOpen = createSignal(false)

  const getHasMenuOpen = (): boolean => {
    return isColumnMenuOpen.get() || isRowMenuOpen.get()
  }

  const setIsRowMenuOpen = (open: boolean): void => {
    isRowMenuOpen.set(open)
  }

  const setIsColumnMenuOpen = (open: boolean): void => {
    isColumnMenuOpen.set(open)
  }

  const referenceCellInfo = createSignal<HoveringCellInfo | undefined>(undefined)

  let prevHoveringCellInfo: HoveringCellInfo | undefined = undefined

  const getReferenceCell = computed((): HoveringCellInfo | undefined => {
    if (!getCanShow()) {
      referenceCellInfo.set(undefined)
      return
    }

    // Do not toggle/update the menu when hovering another cell if the menu is already open
    if (getHasMenuOpen()) {
      return prevHoveringCellInfo
    }

    prevHoveringCellInfo = getHoveringCellInfo()
    return prevHoveringCellInfo
  })

  const getOpen = computed((): boolean => {
    return !!getReferenceCell()
  })

  const handleOpenChange = (event: OpenChangeEvent) => {
    if (getHasMenuOpen()) {
      event.preventDefault()
    }
  }

  const columnOverlayStore = createOverlayStore(
    getOpen,
    noop,
    returnTrue,
    returnFalse,
    handleOpenChange,
  )
  const rowOverlayStore = createOverlayStore(
    getOpen,
    noop,
    returnTrue,
    returnFalse,
    handleOpenChange,
  )

  return {
    dndStore: new DndStore(),
    setIsRowMenuOpen,
    setIsColumnMenuOpen,
    columnOverlayStore,
    rowOverlayStore,
    getReferenceCell,
  }
}

/**
 * @internal
 */
export const tableHandleStoreContext: Context<TableHandleStore> = createContext<TableHandleStore>('prosekit-table-handle-store')
