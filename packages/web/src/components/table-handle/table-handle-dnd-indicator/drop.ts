import { createComputed, useEffect, type ConnectableElement, type ReadonlySignal } from "@aria-ui/core"
import type { Editor } from "@prosekit/core"
import type { TableCommandsExtension } from "@prosekit/extensions/table"

import { tableHandleDndContext } from "../context"

export function useDrop(host: ConnectableElement, editor: ReadonlySignal<Editor<TableCommandsExtension> | null>): void {
  const dndContext = tableHandleDndContext.consume(host)
  const draggingSignal = createComputed(() => {
    const context = dndContext.get()
    return context.dragging
  })

  useEffect(host, () => {
    if (!draggingSignal.get()) return
    const onDrop = () => {
      const editorInstance = editor.peek()
      if (!editorInstance) return
      const { droppingIndex, draggingIndex, direction } = dndContext.peek()
      if (direction === 'row') {
        editorInstance.commands.moveTableRow({
          origin: draggingIndex,
          target: droppingIndex,
        })
        return
      }
      if (direction === 'col') {
        editorInstance.commands.moveTableColumn({
          origin: draggingIndex,
          target: droppingIndex,
        })
        return
      }
    }
    document.addEventListener('drop', onDrop)
    return () => {
      document.removeEventListener('drop', onDrop)
    }
  })
}