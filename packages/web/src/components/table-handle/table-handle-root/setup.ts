import {
  createComputed,
  createSignal,
  useEffect,
  type ConnectableElement,
  type ReadonlySignal,
  type Signal,
  type SignalState,
} from '@aria-ui/core'
import {
  defineDOMEventHandler,
  type Editor,
} from '@prosekit/core'
import type { EditorView } from '@prosekit/pm/view'

import { useEditorExtension } from '../../../hooks/use-editor-extension'
import { useEditorTyping } from '../../../hooks/use-editor-typing'
import { useScrolling } from '../../../hooks/use-scrolling'
import { useSelecting } from '../../../hooks/use-selecting'
import {
  defaultTableHandleDndContext,
  tableHandleDndContext,
  tableHandleRootContext,
  type TableHandleDndContext,
  type TableHandleRootContext,
} from '../context'
import { useDrop } from '../hooks/use-drop'
import {
  getHoveringCell,
  isHoveringCellInfoEqual,
  type HoveringCellInfo,
} from '../utils'

import type { TableHandleRootProps } from './types'

/**
 * @internal
 */
export function useTableHandleRoot(
  host: ConnectableElement,
  { state }: { state: SignalState<TableHandleRootProps> },
): void {
  const { editor } = state

  const context = createSignal<TableHandleRootContext>(null)
  const dndContext = createSignal<TableHandleDndContext>(defaultTableHandleDndContext)

  const hoveringCell = useHoveringCell(host, editor)
  const typing = useEditorTyping(host, editor)
  const isInTable = createComputed(() => !!hoveringCell.get())
  const selecting = useSelecting(host, editor, isInTable)
  const scrolling = useScrolling(host)
  const canShow = createComputed(() => {
    return !typing.get() && !selecting.get() && !scrolling.get()
  })

  useEffect(host, () => {
    context.set(canShow.get() ? hoveringCell.get() : null)
  })

  tableHandleRootContext.provide(host, context)
  tableHandleDndContext.provide(host, dndContext)

  useDrop(host, editor, dndContext)
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

function defineCellHoverHandler(
  handler: (hoveringCell: HoveringCellInfo | null) => void,
) {
  const pointerHandler = (view: EditorView, event: PointerEvent) => {
    const hoveringCell = getHoveringCell(view, event)
    return handler(hoveringCell ?? null)
  }
  return defineDOMEventHandler('pointerover', pointerHandler)
}
