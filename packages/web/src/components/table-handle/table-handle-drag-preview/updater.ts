import {
  createComputed,
  useEffect,
  type ConnectableElement,
  type ReadonlySignal,
} from '@aria-ui/core'
import {
  computePosition,
  type ReferenceElement,
} from '@floating-ui/dom'
import type { Editor } from '@prosekit/core'

import {
  tableHandleDndContext,
  tableHandleRootContext,
} from '../context'
import { getDndRelatedDOMs } from '../dnd'

export function useUpdatePreviewPosition(host: ConnectableElement, editor: ReadonlySignal<Editor | null>): void {
  const dndContext = tableHandleDndContext.consume(host)
  const rootContext = tableHandleRootContext.consume(host)

  const draggingSignal = createComputed(() => {
    const context = dndContext.get()
    return context.dragging
  })

  const clientXSignal = createComputed(() => {
    const context = dndContext.get()
    return context.x
  })

  const clientYSignal = createComputed(() => {
    const context = dndContext.get()
    return context.y
  })

  useEffect(host, () => {
    const editorValue = editor.get()
    if (!editorValue) return
    if (!draggingSignal.get()) return

    const { view } = editorValue
    const { draggingIndex, direction } = dndContext.peek()
    const x = clientXSignal.get()
    const y = clientYSignal.get()

    const relatedDOMs = getDndRelatedDOMs(view, rootContext.peek()?.cellPos, draggingIndex, direction)
    if (!relatedDOMs) return
    const { cell } = relatedDOMs

    void computePosition(
      getVirtualElement(cell, x, y),
      host,
      { placement: direction === 'row' ? 'right' : 'bottom' },
    ).then(({ x, y }) => {
      if (direction === 'row') {
        Object.assign(host.style, {
          top: `${y}px`,
        })
        return
      }

      if (direction === 'col') {
        Object.assign(host.style, {
          left: `${x}px`,
        })
        return
      }
    })
  })
}

function getVirtualElement(cell: HTMLTableCellElement, x: number, y: number): ReferenceElement {
  return {
    contextElement: cell,
    getBoundingClientRect: () => {
      const rect = cell.getBoundingClientRect()
      return {
        width: rect.width,
        height: rect.height,
        right: x + rect.width / 2,
        bottom: y + rect.height / 2,
        top: y - rect.height / 2,
        left: x - rect.width / 2,
        x: x - rect.width / 2,
        y: y - rect.height / 2,
      }
    },
  }
}
