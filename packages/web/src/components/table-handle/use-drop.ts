import { computed, useEffect, type HostElement } from '@aria-ui-v2/core'
import type { Editor } from '@prosekit/core'
import { moveTableColumn, moveTableRow } from '@prosekit/extensions/table'

import { getSafeEditorView } from '../../utils/get-safe-editor-view.ts'

import type { TableHandleStore } from './store.ts'

export function useDrop(
  host: HostElement,
  getEditor: () => Editor | null,
  store: TableHandleStore,
): void {
  const getDragging = computed(() => store.dnd.get().dragging)

  useEffect(host, () => {
    const view = getSafeEditorView(getEditor())
    if (!view || !view.editable) return

    const ownerDocument = view.dom?.ownerDocument
    if (!ownerDocument) return

    const handleDrop = () => {
      if (!getDragging()) return
      const editor = getEditor()
      if (!editor) return
      const { droppingIndex, draggingIndex, direction } = store.dnd.get()

      if (draggingIndex < 0 || droppingIndex < 0) {
        console.warn('[prosekit] Invalid drag indices:', { draggingIndex, droppingIndex })
        return
      }

      if (direction === 'row') {
        editor.exec(moveTableRow({ from: draggingIndex, to: droppingIndex }))
        return
      }
      if (direction === 'col') {
        editor.exec(moveTableColumn({ from: draggingIndex, to: droppingIndex }))
        return
      }
    }

    const handleDragOver = (event: DragEvent) => {
      if (!getDragging()) return
      event.preventDefault()
      const prev = store.dnd.get()
      store.dnd.set({
        ...prev,
        dragging: true,
        x: event.clientX,
        y: event.clientY,
      })
    }

    const handleDragEnd = () => {
      if (!getDragging()) return
      const prev = store.dnd.get()
      store.dnd.set({ ...prev, dragging: false })
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
