import {
  createComputed,
  useEffect,
  type ConnectableElement,
  type ReadonlySignal,
} from '@aria-ui/core'
import type { Editor } from '@prosekit/core'
import {
  moveTableColumn,
  moveTableRow,
} from '@prosekit/extensions/table'

import { getSafeEditorView } from '../../../utils/get-safe-editor-view'
import type { TableHandleDndContext } from '../context'

export function useDrop(
  host: ConnectableElement,
  editor: ReadonlySignal<Editor | null>,
  dndContext: ReadonlySignal<TableHandleDndContext>,
): void {
  const dragging = createComputed(() => dndContext.get().dragging)

  useEffect(host, () => {
    if (!dragging.get()) return

    const view = getSafeEditorView(editor.peek())
    if (!view || !view.editable) return

    const ownerDocument = view.dom?.ownerDocument
    if (!ownerDocument) return

    const handleDrop = (event: DragEvent) => {
      const editorValue = editor.peek()
      if (!editorValue) return
      const { droppingIndex, draggingIndex, direction } = dndContext.peek()

      // Validate indices
      if (draggingIndex < 0 || droppingIndex < 0) {
        console.warn('[prosekit] Invalid drag indices:', { draggingIndex, droppingIndex })
        return
      }

      event.preventDefault()

      if (direction === 'row') {
        editorValue.exec(moveTableRow({
          origin: draggingIndex,
          target: droppingIndex,
        }))
        return
      }
      if (direction === 'col') {
        editorValue.exec(moveTableColumn({
          origin: draggingIndex,
          target: droppingIndex,
        }))
        return
      }
    }

    // To make `drop` event work, we need to prevent the default behavior of the
    // `dragover` event for drop zone. Here we set the whole document as the
    // drop zone so that even the mouse moves outside the editor, the `drop`
    // event will still be triggered.
    const handleDragOver = (event: DragEvent) => {
      event.preventDefault()
    }

    ownerDocument.addEventListener('dragover', handleDragOver)
    ownerDocument.addEventListener('drop', handleDrop)
    return () => {
      ownerDocument.removeEventListener('dragover', handleDragOver)
      ownerDocument.removeEventListener('drop', handleDrop)
    }
  })
}
