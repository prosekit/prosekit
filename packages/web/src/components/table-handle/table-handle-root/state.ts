import {
  createSignal,
  type ConnectableElement,
  type ReadonlySignal,
  type SignalState,
} from '@aria-ui/core'
import { defineDOMEventHandler, union, type Editor } from '@prosekit/core'
import type { EditorView } from '@prosekit/pm/view'

import { useEditorExtension } from '../../../hooks/use-editor-extension'
import { throttle } from '../../../utils/throttle'
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

  useHoverExtension(host, editor, (cellAxis) => {
    context.set({ cellAxis })
  })

  tableHandleRootContext.provide(host, context)
}

function useHoverExtension(
  host: ConnectableElement,
  editor: ReadonlySignal<Editor | null>,
  handler: (cellAxis?: CellAxisWithPos | undefined) => void,
) {
  let prevCellAxis: CellAxisWithPos | undefined = undefined

  const extension = defineElementHoverHandler(
    (cellAxis: CellAxisWithPos | undefined) => {
      if (isSameCellAxis(prevCellAxis, cellAxis)) return
      prevCellAxis = cellAxis
      handler(cellAxis)
    },
  )

  useEditorExtension(host, editor, extension)
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

export function defineElementHoverHandler(
  handler: (cellAxis?: CellAxisWithPos | undefined) => void,
) {
  const handlePointerEvent = (view: EditorView, event: PointerEvent) => {
    const cellAxis = getCellAxisByMouseEvent(view, event)

    return handler(cellAxis)
  }

  return union(
    // TODO: change to pointerenter
    defineDOMEventHandler('pointermove', throttle(handlePointerEvent, 200)),
    defineDOMEventHandler('pointerover', handlePointerEvent),
    defineDOMEventHandler('keypress', () => handler()),
  )
}
