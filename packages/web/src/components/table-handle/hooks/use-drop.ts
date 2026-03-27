import { createComputed, useEffect, type ConnectableElement, type ReadonlySignal, type Signal } from '@aria-ui/core'
import type { Editor } from '@prosekit/core'
import { moveTableColumn, moveTableRow } from '@prosekit/extensions/table'

import { getSafeEditorView } from '../../../utils/get-safe-editor-view'
import type { TableHandleDndContext } from '../context'

export function useDrop(
  host: ConnectableElement,
  editor: ReadonlySignal<Editor | null>,
  dndContext: Signal<TableHandleDndContext>,
): void {
  const dragging = createComputed(() => dndContext.get().dragging)

  useEffect(host, () => {
    const view = getSafeEditorView(editor.get())
    if (!view || !view.editable) return

    const ownerDocument = view.dom?.ownerDocument
    if (!ownerDocument) return

    const handleDrop = () => {
      if (!dragging.peek()) return
      const editorValue = editor.peek()
      if (!editorValue) return
      const { droppingIndex, draggingIndex, direction } = dndContext.peek()

      // Validate indices
      if (draggingIndex < 0 || droppingIndex < 0) {
        console.warn('[prosekit] Invalid drag indices:', { draggingIndex, droppingIndex })
        return
      }

      if (direction === 'row') {
        editorValue.exec(moveTableRow({
          from: draggingIndex,
          to: droppingIndex,
        }))
        return
      }
      if (direction === 'col') {
        editorValue.exec(moveTableColumn({
          from: draggingIndex,
          to: droppingIndex,
        }))
        return
      }
    }

    // To make `drop` event work, we need to prevent the default behavior of the
    // `dragover` event for drop zone. Here we set the whole document as the
    // drop zone so that even the mouse moves outside the editor, the `drop`
    // event will still be triggered.
    const handleDragOver = (event: DragEvent) => {
      if (!dragging.peek()) return
      event.preventDefault()
      const prev = dndContext.peek()

      dndContext.set({
        ...prev,
        dragging: true,
        x: event.clientX,
        y: event.clientY,
      })
    }

    const handleDragEnd = () => {
      if (!dragging.peek()) return
      const prev = dndContext.peek()
      dndContext.set({
        ...prev,
        dragging: false,
      })
    }

    ownerDocument.addEventListener('dragover', handleDragOver)
    ownerDocument.addEventListener('drop', handleDrop)
    ownerDocument.addEventListener('dragend', handleDragEnd)
    return () => {
      ownerDocument.removeEventListener('dragover', handleDragOver)
      ownerDocument.removeEventListener('drop', handleDrop)
      ownerDocument.removeEventListener('dragend', handleDragEnd)
    }
  })
}
