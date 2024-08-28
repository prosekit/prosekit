import { Themes } from '@prosekit/themes'
import { useEditor } from 'prosekit/react'
import {
  TableHandlePopoverContent,
  TableHandlePopoverItem,
  TableRowPopoverRoot,
  TableRowPopoverTrigger,
} from 'prosekit/react/table-handle'

import type { EditorExtension } from './extension'

export function TableRowHandle() {
  const editor = useEditor<EditorExtension>({ update: true })

  return (
    <TableRowPopoverRoot className={Themes.TABLE_ROW_HANDLE}>
      <TableRowPopoverTrigger>
        <div className={Themes.ICON_DRAG_HANDLE}></div>
      </TableRowPopoverTrigger>
      <TableHandlePopoverContent className={Themes.TABLE_HANDLE_MENU}>
        <TableHandlePopoverItem
          className={Themes.TABLE_CELL_MENU_ITEM}
          command={() => {
            editor.commands.clearTableCellContent()
          }}
          disabled={!editor.commands.clearTableCellContent.canApply()}
        >
          <div>clear row content</div>
        </TableHandlePopoverItem>
        <TableHandlePopoverItem
          className={Themes.TABLE_CELL_MENU_ITEM}
          command={editor.commands.deleteTableRow}
          disabled={!editor.commands.deleteTableRow.canApply()}
        >
          <div>remove row</div>
        </TableHandlePopoverItem>
        <TableHandlePopoverItem
          className={Themes.TABLE_CELL_MENU_ITEM}
          command={editor.commands.addTableRowAbove}
          disabled={!editor.commands.addTableRowAbove.canApply()}
        >
          <div>add row above</div>
        </TableHandlePopoverItem>
        <TableHandlePopoverItem
          className={Themes.TABLE_CELL_MENU_ITEM}
          command={editor.commands.addTableRowBelow}
          disabled={!editor.commands.addTableRowBelow.canApply()}
        >
          <div>add row below</div>
        </TableHandlePopoverItem>
        <TableHandlePopoverItem
          className={Themes.TABLE_CELL_MENU_ITEM}
          command={(table) => editor.commands.selectTable({ table })}
        >
          <div>select entire table</div>
        </TableHandlePopoverItem>
        <TableHandlePopoverItem
          className={Themes.TABLE_CELL_MENU_ITEM}
          command={editor.commands.deleteTable}
        >
          <div>remove entire table</div>
        </TableHandlePopoverItem>
      </TableHandlePopoverContent>
    </TableRowPopoverRoot>
  )
}
