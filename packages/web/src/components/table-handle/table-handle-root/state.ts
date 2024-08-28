import {
  createSignal,
  useEffect,
  type ConnectableElement,
  type ReadonlySignal,
  type Signal,
  type SignalState,
} from '@aria-ui/core'
import { defineDOMEventHandler, type Editor } from '@prosekit/core'
import type { EditorView } from '@prosekit/pm/view'

import { useEditorExtension } from '../../../hooks/use-editor-extension'
import { useEditorTyping } from '../../../hooks/use-editor-typing'
import { tableHandleRootContext, type TableHandleRootContext } from '../context'
import {
  getHoveringCell,
  isHoveringCellInfoEqual,
  type HoveringCellInfo,
} from '../utils'

import type { TableHandleRootProps } from './props'

export function useTableHandleRoot(
  host: ConnectableElement,
  state: SignalState<TableHandleRootProps>,
) {
  const { editor } = state

  const context = createSignal<TableHandleRootContext>(null)

  const hoveringCell = useHoveringCell(host, editor)
  const typing = useEditorTyping(host, editor)

  useEffect(host, () => {
    const typingValue = typing.get()
    const hoveringCellValue = hoveringCell.get()
    context.set(typingValue ? null : hoveringCellValue)
  })

  tableHandleRootContext.provide(host, context)
}

function useHoveringCell(
  host: ConnectableElement,
  editor: ReadonlySignal<Editor | null>,
): Signal<HoveringCellInfo | null> {
  const hoveringCell = createSignal<HoveringCellInfo | null>(null)

  const extension = defineCellHoverHandler((curr: HoveringCellInfo | null) => {
    const prev = hoveringCell.peek()
    if (!isHoveringCellInfoEqual(prev, curr)) {
      hoveringCell.set(curr)
    }
  })

  useEditorExtension(host, editor, extension)

  return hoveringCell
}

export function defineCellHoverHandler(
  handler: (hoveringCell: HoveringCellInfo | null) => void,
) {
  const pointerHandler = (view: EditorView, event: PointerEvent) => {
    const hoveringCell = getHoveringCell(view, event)
    return handler(hoveringCell ?? null)
  }
  return defineDOMEventHandler('pointerover', pointerHandler)
}
