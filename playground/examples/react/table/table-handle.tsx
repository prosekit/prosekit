import { Themes } from '@prosekit/themes'
import { useEditor } from 'prosekit/react'
import {
  PopoverContent,
  PopoverRoot,
  PopoverTrigger,
} from 'prosekit/react/popover'
import {
  TableCellPopoverRoot,
  TableCellPopoverTrigger,
  TableCellPopoverContent,
  TableCellPopoverItem,
} from 'prosekit/react/table-handle'

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
    <TableCellPopoverRoot
      ref={(ref) => {
        console.log(ref)
      }}
      className={Themes.TABLE_CELL_HANDLE}
    >
      <TableCellPopoverTrigger>
        <div className={Themes.ICON_TABLE_CELL_HANDLE}></div>
      </TableCellPopoverTrigger>
      <TableCellPopoverContent>
        <TableCellPopoverItem>
          <div>change font color</div>
          <div>change background color</div>
        </TableCellPopoverItem>
      </TableCellPopoverContent>
    </TableCellPopoverRoot>
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
