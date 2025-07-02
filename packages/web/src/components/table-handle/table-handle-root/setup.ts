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
import {
  tableHandleDndContext,
  tableHandleRootContext,
  type TableHandleDndContext,
  type TableHandleRootContext,
} from '../context'
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
  const dndContext = createSignal<TableHandleDndContext>({
    dragging: false,
    direction: 'row',
    draggingIndex: -1,
    droppingIndex: -1,
    x: -1,
    y: -1,
    startX: -1,
    startY: -1,
    dndPreviewImage: null,
  })

  const hoveringCell = useHoveringCell(host, editor)
  const typing = useEditorTyping(host, editor)
  const isInTable = createComputed(() => !!hoveringCell.get())
  const selecting = useSelecting(host, editor, isInTable)

  useEffect(host, () => {
    const typingValue = typing.get()
    const selectingValue = selecting.get()
    const hoveringCellValue = hoveringCell.get()
    context.set(typingValue || selectingValue ? null : hoveringCellValue)
  })

  useEffect(host, () => {
    const emptyImage = new Image(1, 1)
    emptyImage.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
    dndContext.set({
      ...dndContext.peek(),
      dndPreviewImage: emptyImage,
    })

    return () => {
      emptyImage.remove()
    }
  })

  tableHandleRootContext.provide(host, context)
  tableHandleDndContext.provide(host, dndContext)
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

/**
 * Detect if the user is selecting text by dragging.
 */
function useSelecting(
  host: ConnectableElement,
  editor: ReadonlySignal<Editor | null>,
  isInTable: ReadonlySignal<boolean>,
) {
  const selecting = createSignal(false)

  useEffect(host, () => {
    if (!isInTable.get()) {
      return
    }

    const root = editor.peek()?.view.root
    if (!root) {
      return
    }

    const pointerDownHandler = (event: Event) => {
      const target = event.target
      if (!target || host.contains(event.target as Node)) {
        return
      }
      selecting.set(true)
    }
    const pointerUpHandler = () => {
      selecting.set(false)
    }

    root.addEventListener('pointerdown', pointerDownHandler)
    root.addEventListener('pointerup', pointerUpHandler)

    return () => {
      root.removeEventListener('pointerdown', pointerDownHandler)
      root.removeEventListener('pointerup', pointerUpHandler)
    }
  })

  return selecting
}
