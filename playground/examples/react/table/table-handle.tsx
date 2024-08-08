import { defineDOMEventHandler, findParentNodeOfType } from 'prosekit/core'
import { isCellSelection } from 'prosekit/extensions/table'
import type { EditorView } from 'prosekit/pm/view'
import { useEditor } from 'prosekit/react'
import { TableCellPopover } from 'prosekit/react/table-handle'
import { useEffect } from 'react'

export function TableHandle() {
  const editor = useEditor()

  //   useEffect(() => {
  //     const handlePointerEvent = (view: EditorView, event: PointerEvent) => {
  //       const { selection } = view.state
  //       const isCellSel = isCellSelection(selection)
  //       const { $head } = selection
  //       const tableCellParent = findParentNodeOfType('tableCell', $head)
  //       if (!tableCellParent || !isCellSel) return
  //     //   view.
  //     }

  //     const extension = defineDOMEventHandler(
  //       'pointerdown',
  //       throttle(handlePointerEvent, 200),
  //     )
  //     editor.use(extension)
  //   }, [])

  return (
    <TableCellPopover>
      <div>v</div>
    </TableCellPopover>
  )
}

export function throttle<Args extends any[]>(
  callback: (...args: Args) => void,
  wait: number,
): (...args: Args) => void {
  let lastTime = 0

  return (...args: Args) => {
    const now = Date.now()
    if (now - lastTime >= wait) {
      callback(...args)
      lastTime = now
    }
  }
}
