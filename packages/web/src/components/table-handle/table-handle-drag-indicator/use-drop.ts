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

import { tableHandleDndContext } from '../context'

export function useDrop(host: ConnectableElement, editor: ReadonlySignal<Editor | null>): void {
  const dndContext = tableHandleDndContext.consume(host)
  const draggingSignal = createComputed(() => {
    const context = dndContext.get()
    return context.dragging
  })

  useEffect(host, () => {
    if (!draggingSignal.get()) return
    const onDrop = () => {
      const editorValue = editor.peek()
      if (!editorValue) return
      const { droppingIndex, draggingIndex, direction } = dndContext.peek()

      // Validate indices
      if (draggingIndex < 0 || droppingIndex < 0) {
        console.warn('Invalid drag indices:', { draggingIndex, droppingIndex })
        return
      }

      // Validate direction
      if (direction !== 'row' && direction !== 'col') {
        console.warn('Invalid drag direction:', direction)
        return
      }

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
    document.addEventListener('drop', onDrop)
    return () => {
      document.removeEventListener('drop', onDrop)
    }
  })
}
