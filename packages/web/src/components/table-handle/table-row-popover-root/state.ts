import {
  type ConnectableElement,
  createComputed,
  createSignal,
  mapSignals,
  type ReadonlySignal,
  type SignalState,
  useAttribute,
} from '@aria-ui/core'
import { defaultMenuRootProps, useMenuRoot } from '@aria-ui/menu'
import { useOverlayPositionerState } from '@aria-ui/overlay'
import { usePresence } from '@aria-ui/presence'
import type { VirtualElement } from '@floating-ui/dom'
import {
  defineDOMEventHandler,
  type Editor,
  type FindParentNodeResult,
  union,
} from '@prosekit/core'
import { type ProseMirrorNode } from '@prosekit/pm/model'
import { type EditorView } from '@prosekit/pm/view'

import { useEditorExtension } from '../../../hooks/use-editor-extension'
import { throttle } from '../../../utils/throttle'
import { type CellAxisWithPos, openContext } from '../context'
import {
  findTable,
  getCellAxisByMouseEvent,
  getRowFirstCellPos,
} from '../utils'

import type { TableRowPopoverRootProps } from './props'

export function useTableRowPopoverRoot(
  host: ConnectableElement,
  state: SignalState<TableRowPopoverRootProps>,
) {
  const { editor, ...overlayState } = state

  const reference = createSignal<VirtualElement | null>(null)
  const contentOpen = createSignal(false)

  useOverlayPositionerState(host, overlayState, { reference })

  useHoverExtension(host, editor, (referenceValue) => {
    reference.set(referenceValue)
    contentOpen.set(false)
  })

  const presence = createComputed(() => !!reference.get())
  useAttribute(host, 'data-state', () => (presence.get() ? 'open' : 'closed'))
  usePresence(host, presence)

  openContext.provide(host, presence)

  useMenuRoot(host, {
    ...mapSignals(defaultMenuRootProps),
    open: contentOpen,
  })
}

function useHoverExtension(
  host: ConnectableElement,
  editor: ReadonlySignal<Editor | null>,
  handler: ElementHoverHandler,
) {
  let prevTable: ProseMirrorNode | null = null
  let prevRow: number | null = null

  const extension = defineElementHoverHandler((reference, table, cellAxis) => {
    if (prevTable === table?.node && prevRow === cellAxis?.row) {
      return
    }

    prevTable = table?.node ?? null
    prevRow = cellAxis?.row ?? null

    handler(reference, table, cellAxis)
  })

  useEditorExtension(host, editor, extension)
}

type ElementHoverHandler = (
  reference: VirtualElement | null,
  table: FindParentNodeResult | null,
  cellAxis: CellAxisWithPos | null,
) => void

function defineElementHoverHandler(handler: ElementHoverHandler) {
  const handlePointerEvent = (view: EditorView, event: PointerEvent) => {
    const cellAxis = getCellAxisByMouseEvent(view, event)
    if (!cellAxis) return handler(null, null, null)
    const table = findTable(cellAxis?.$cell)
    if (!table) return handler(null, null, null)
    const pos = getRowFirstCellPos(table.node, table.pos, cellAxis.row)
    const columnCellDom = view.nodeDOM(pos) as HTMLElement
    if (!columnCellDom) return handler(null, null, null)

    return handler(columnCellDom, table, cellAxis)
  }

  return union(
    defineDOMEventHandler('pointermove', throttle(handlePointerEvent, 200)),
    defineDOMEventHandler('pointerout', handlePointerEvent),
    defineDOMEventHandler('keypress', () => handler(null, null, null)),
  )
}
