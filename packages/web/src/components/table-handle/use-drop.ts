import { computed, useEffect, type HostElement } from '@aria-ui/core'
import type { Editor } from '@prosekit/core'
import { moveTableColumn, moveTableRow } from '@prosekit/extensions/table'

import { getSafeEditorView } from '../../utils/get-safe-editor-view.ts'

import type { TableHandleStore } from './store.ts'

export function useDrop(
  host: HostElement,
  getEditor: () => Editor | null,
  store: TableHandleStore,
): void {
  const getDndStore = () => store.dndStore
  const getDragging = computed(() => getDndStore().dragging.get())

  useEffect(host, () => {
    const view = getSafeEditorView(getEditor())
    if (!view || !view.editable) return

    const ownerDocument = view.dom?.ownerDocument
    if (!ownerDocument) return

    const handleDrop = () => {
      if (!getDragging()) return
      const editor = getEditor()
      if (!editor) return

      const dndStore = getDndStore()

      const droppingIndex = dndStore.droppingIndex.get()
      const draggingIndex = dndStore.draggingIndex.get()
      const direction = dndStore.direction.get()

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
      const dndStore = getDndStore()
      dndStore.dragging.set(true)
      dndStore.x.set(event.clientX)
      dndStore.y.set(event.clientY)
    }

    const handleDragEnd = () => {
      if (!getDragging()) return
      const dndStore = getDndStore()
      dndStore.dragging.set(false)
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
