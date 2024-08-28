import { Themes } from '@prosekit/themes'
import { useEditor } from 'prosekit/react'
import {
  TableHandleColumnRoot,
  TableHandleColumnTrigger,
  TableHandlePopoverContent,
  TableHandlePopoverItem,
  TableHandleRoot,
  TableHandleRowRoot,
  TableHandleRowTrigger,
} from 'prosekit/react/table-handle'

import type { EditorExtension } from './extension'

export function TableHandle() {
  const editor = useEditor<EditorExtension>({ update: true })

  return (
    <TableHandleRoot className="contents">
      <TableHandleColumnRoot className={Themes.TABLE_COLUMN_HANDLE}>
        <TableHandleColumnTrigger>
          <div className={Themes.ICON_TABLE_COLUMN_HANDLE}></div>
        </TableHandleColumnTrigger>
        <TableHandlePopoverContent className={Themes.TABLE_HANDLE_MENU}>
          <TableHandlePopoverItem
            className={Themes.TABLE_CELL_MENU_ITEM}
            onSelect={editor.commands.addTableColumnBefore}
            disabled={!editor.commands.addTableColumnBefore.canExec()}
          >
            Insert Left
          </TableHandlePopoverItem>
          <TableHandlePopoverItem
            className={Themes.TABLE_CELL_MENU_ITEM}
            onSelect={editor.commands.addTableColumnAfter}
            disabled={!editor.commands.addTableColumnAfter.canExec()}
          >
            Insert Right
          </TableHandlePopoverItem>
          <TableHandlePopoverItem
            className={Themes.TABLE_CELL_MENU_ITEM}
            onSelect={editor.commands.deleteCellSelection}
            disabled={!editor.commands.deleteCellSelection.canExec()}
          >
            Clear Contents
          </TableHandlePopoverItem>
          <TableHandlePopoverItem
            className={Themes.TABLE_CELL_MENU_ITEM}
            onSelect={editor.commands.deleteTableColumn}
            disabled={!editor.commands.deleteTableColumn.canExec()}
          >
            Delete Column
          </TableHandlePopoverItem>
        </TableHandlePopoverContent>
      </TableHandleColumnRoot>
      <TableHandleRowRoot className={Themes.TABLE_ROW_HANDLE}>
        <TableHandleRowTrigger>
          <div className={Themes.ICON_DRAG_HANDLE}></div>
        </TableHandleRowTrigger>
        <TableHandlePopoverContent className={Themes.TABLE_HANDLE_MENU}>
          <TableHandlePopoverItem
            className={Themes.TABLE_CELL_MENU_ITEM}
            onSelect={editor.commands.addTableRowAbove}
            disabled={!editor.commands.addTableRowAbove.canExec()}
          >
            Insert Above
          </TableHandlePopoverItem>
          <TableHandlePopoverItem
            className={Themes.TABLE_CELL_MENU_ITEM}
            onSelect={editor.commands.addTableRowBelow}
            disabled={!editor.commands.addTableRowBelow.canExec()}
          >
            Insert Below
          </TableHandlePopoverItem>
          <TableHandlePopoverItem
            className={Themes.TABLE_CELL_MENU_ITEM}
            onSelect={editor.commands.deleteCellSelection}
            disabled={!editor.commands.deleteCellSelection.canExec()}
          >
            Clear Contents
          </TableHandlePopoverItem>
          <TableHandlePopoverItem
            className={Themes.TABLE_CELL_MENU_ITEM}
            onSelect={editor.commands.deleteTableRow}
            disabled={!editor.commands.deleteTableRow.canExec()}
          >
            Delete Row
          </TableHandlePopoverItem>
        </TableHandlePopoverContent>
      </TableHandleRowRoot>
    </TableHandleRoot>
  )
}
