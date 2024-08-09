import { Themes } from '@prosekit/themes'
import { useEditor } from 'prosekit/react'
import {
  TableCellPopoverRoot,
  TableCellPopoverTrigger,
  TableCellPopoverContent,
  TableCellPopoverItem,
} from 'prosekit/react/table-handle'

import type { EditorExtension } from './extension'

export function TableHandle() {
  const editor = useEditor<EditorExtension>({ update: true })

  return (
    <TableCellPopoverRoot className={Themes.TABLE_CELL_HANDLE}>
      <TableCellPopoverTrigger>
        <div className={Themes.ICON_TABLE_CELL_HANDLE}></div>
      </TableCellPopoverTrigger>
      <TableCellPopoverContent className={Themes.TABLE_CELL_MENU}>
        <TableCellPopoverItem
          className={Themes.TABLE_CELL_MENU_ITEM}
          onClick={() => editor.commands.clearTableCellContent()}
          disabled={!editor.commands.clearTableCellContent.canApply()}
        >
          <div>clear cell content</div>
        </TableCellPopoverItem>
        <TableCellPopoverItem
          className={Themes.TABLE_CELL_MENU_ITEM}
          onClick={() => editor.commands.mergeTableCells()}
          disabled={!editor.commands.mergeTableCells.canApply()}
        >
          <div>merge cells</div>
        </TableCellPopoverItem>
        <TableCellPopoverItem
          className={Themes.TABLE_CELL_MENU_ITEM}
          onClick={() => editor.commands.splitTableCell()}
          disabled={!editor.commands.splitTableCell.canApply()}
        >
          <div>split cell</div>
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
