import { Themes } from '@prosekit/themes'
import { useEditor } from 'prosekit/react'
import {
  TableColumnPopoverRoot,
  TableColumnPopoverTrigger,
  TableHandlePopoverContent,
  TableHandlePopoverItem,
  TableHandleRoot,
  TableRowPopoverRoot,
  TableRowPopoverTrigger,
} from 'prosekit/react/table-handle'

import type { EditorExtension } from './extension'

export function TableHandle() {
  const editor = useEditor<EditorExtension>({ update: true })

  return (
    <TableHandleRoot className="contents">
      <TableColumnPopoverRoot className={Themes.TABLE_COLUMN_HANDLE}>
        <TableColumnPopoverTrigger>
          <div className={Themes.ICON_TABLE_COLUMN_HANDLE}></div>
        </TableColumnPopoverTrigger>
        <TableHandlePopoverContent className={Themes.TABLE_HANDLE_MENU}>
          <TableHandlePopoverItem
            className={Themes.TABLE_CELL_MENU_ITEM}
            onSelect={editor.commands.addTableColumnBefore}
            disabled={!editor.commands.addTableColumnBefore.canExec()}
          >
            <div>Insert Left</div>
          </TableHandlePopoverItem>
          <TableHandlePopoverItem
            className={Themes.TABLE_CELL_MENU_ITEM}
            onSelect={editor.commands.addTableColumnAfter}
            disabled={!editor.commands.addTableColumnAfter.canExec()}
          >
            <div>Insert Right</div>
          </TableHandlePopoverItem>
          <TableHandlePopoverItem
            className={Themes.TABLE_CELL_MENU_ITEM}
            onSelect={editor.commands.deleteCellSelection}
            disabled={!editor.commands.deleteCellSelection.canExec()}
          >
            <div>Clear Contents</div>
          </TableHandlePopoverItem>
          <TableHandlePopoverItem
            className={Themes.TABLE_CELL_MENU_ITEM}
            onSelect={editor.commands.deleteTableColumn}
            disabled={!editor.commands.deleteTableColumn.canExec()}
          >
            <div>Delete Column</div>
          </TableHandlePopoverItem>
        </TableHandlePopoverContent>
      </TableColumnPopoverRoot>
      <TableRowPopoverRoot className={Themes.TABLE_ROW_HANDLE}>
        <TableRowPopoverTrigger>
          <div className={Themes.ICON_DRAG_HANDLE}></div>
        </TableRowPopoverTrigger>
        <TableHandlePopoverContent className={Themes.TABLE_HANDLE_MENU}>
          <TableHandlePopoverItem
            className={Themes.TABLE_CELL_MENU_ITEM}
            onSelect={editor.commands.addTableRowAbove}
            disabled={!editor.commands.addTableRowAbove.canExec()}
          >
            <div>Insert Above</div>
          </TableHandlePopoverItem>
          <TableHandlePopoverItem
            className={Themes.TABLE_CELL_MENU_ITEM}
            onSelect={editor.commands.addTableRowBelow}
            disabled={!editor.commands.addTableRowBelow.canExec()}
          >
            <div>add row below</div>
          </TableHandlePopoverItem>
          <TableHandlePopoverItem
            className={Themes.TABLE_CELL_MENU_ITEM}
            onSelect={editor.commands.deleteCellSelection}
            disabled={!editor.commands.deleteCellSelection.canExec()}
          >
            <div>Clear Contents</div>
          </TableHandlePopoverItem>{' '}
          <TableHandlePopoverItem
            className={Themes.TABLE_CELL_MENU_ITEM}
            onSelect={editor.commands.deleteTableRow}
            disabled={!editor.commands.deleteTableRow.canExec()}
          >
            <div>Delete Row</div>
          </TableHandlePopoverItem>
        </TableHandlePopoverContent>
      </TableRowPopoverRoot>
    </TableHandleRoot>
  )
}
