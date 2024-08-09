import { Themes } from '@prosekit/themes'
import { useEditor } from 'prosekit/react'
import {
  TableCellPopoverRoot,
  TableCellPopoverTrigger,
  TableHandlePopoverContent,
  TableHandlePopoverItem,
} from 'prosekit/react/table-handle'

import type { EditorExtension } from './extension'

export function TableCellHandle() {
  const editor = useEditor<EditorExtension>({ update: true })

  return (
    <TableCellPopoverRoot className={Themes.TABLE_CELL_HANDLE}>
      <TableCellPopoverTrigger>
        <div className={Themes.ICON_TABLE_CELL_HANDLE}></div>
      </TableCellPopoverTrigger>
      <TableHandlePopoverContent className={Themes.TABLE_CELL_MENU}>
        <TableHandlePopoverItem
          className={Themes.TABLE_CELL_MENU_ITEM}
          onClick={() => editor.commands.clearTableCellContent()}
          disabled={!editor.commands.clearTableCellContent.canApply()}
        >
          <div>clear cell content</div>
        </TableHandlePopoverItem>
        <TableHandlePopoverItem
          className={Themes.TABLE_CELL_MENU_ITEM}
          onClick={() => editor.commands.mergeTableCells()}
          disabled={!editor.commands.mergeTableCells.canApply()}
        >
          <div>merge cells</div>
        </TableHandlePopoverItem>
        <TableHandlePopoverItem
          className={Themes.TABLE_CELL_MENU_ITEM}
          onClick={() => editor.commands.splitTableCell()}
          disabled={!editor.commands.splitTableCell.canApply()}
        >
          <div>split cell</div>
        </TableHandlePopoverItem>
      </TableHandlePopoverContent>
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
