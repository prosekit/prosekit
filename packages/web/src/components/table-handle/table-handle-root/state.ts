import {
  createSignal,
  useEffect,
  type ConnectableElement,
  type ReadonlySignal,
  type SignalState,
} from '@aria-ui/core'
import { defineDOMEventHandler, type Editor } from '@prosekit/core'
import type { EditorView } from '@prosekit/pm/view'

import { useEditorExtension } from '../../../hooks/use-editor-extension'
import { useEditorTyping } from '../../../hooks/use-editor-typing'
import {
  tableHandleRootContext,
  type CellAxisWithPos,
  type TableHandleRootContext,
} from '../context'
import { getCellAxisByMouseEvent } from '../utils'

import type { TableHandleRootProps } from './props'

export function useTableHandleRoot(
  host: ConnectableElement,
  state: SignalState<TableHandleRootProps>,
) {
  const { editor } = state

  const context = createSignal<TableHandleRootContext>({
    cellAxis: null,
  })

  const hoveringCell = useHoveringCell(host, editor)
  const typing = useEditorTyping(host, editor)

  useEffect(host, () => {
    const typingValue = typing.get()
    const hoveringCellValue = hoveringCell.get()
    context.set({
      cellAxis: typingValue ? undefined : hoveringCellValue,
    })
  })

  tableHandleRootContext.provide(host, context)
}

function useHoveringCell(
  host: ConnectableElement,
  editor: ReadonlySignal<Editor | null>,
) {
  const hoveringCell = createSignal<CellAxisWithPos | undefined>(undefined)

  const extension = defineCellHoverHandler(
    (cellAxis: CellAxisWithPos | undefined) => {
      if (!isSameCellAxis(hoveringCell.peek(), cellAxis)) {
        hoveringCell.set(cellAxis)
      }
    },
  )

  useEditorExtension(host, editor, extension)

  return hoveringCell
}

function isSameCellAxis(
  prevCellAxis: CellAxisWithPos | undefined,
  cellAxis: CellAxisWithPos | undefined,
) {
  return (
    prevCellAxis?.row === cellAxis?.row &&
    prevCellAxis?.col === cellAxis?.col &&
    prevCellAxis?.$cell.pos === cellAxis?.$cell.pos
  )
}

export function defineCellHoverHandler(
  handler: (cellAxis?: CellAxisWithPos | undefined) => void,
) {
  const pointerHandler = (view: EditorView, event: PointerEvent) => {
    const cellAxis = getCellAxisByMouseEvent(view, event)
    return handler(cellAxis)
  }
  return defineDOMEventHandler('pointerover', pointerHandler)
}
