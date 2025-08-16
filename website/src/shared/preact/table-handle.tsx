import { useEditor } from 'prosekit/preact'
import {
  TableHandleColumnRoot,
  TableHandleColumnTrigger,
  TableHandleDragPreview,
  TableHandleDropIndicator,
  TableHandlePopoverContent,
  TableHandlePopoverItem,
  TableHandleRoot,
  TableHandleRowRoot,
  TableHandleRowTrigger,
} from 'prosekit/preact/table-handle'

import type { EditorExtension } from './extension'

export default function TableHandle() {
  const editor = useEditor<EditorExtension>({ update: true })

  return (
    <TableHandleRoot className="contents">
      <TableHandleDragPreview />
      <TableHandleDropIndicator />
      <TableHandleColumnRoot className="CSS_TABLE_COLUMN_HANDLE">
        <TableHandleColumnTrigger className="CSS_TABLE_COLUMN_HANDLE_TRIGGER">
          <div className="CSS_ICON_TABLE_COLUMN_HANDLE"></div>
        </TableHandleColumnTrigger>
        <TableHandlePopoverContent className="CSS_TABLE_HANDLE_MENU">
          {editor.commands.addTableColumnBefore.canExec() && (
            <TableHandlePopoverItem
              className="CSS_TABLE_CELL_MENU_ITEM"
              onSelect={() => editor.commands.addTableColumnBefore()}
            >
              <span>Insert Left</span>
            </TableHandlePopoverItem>
          )}
          {editor.commands.addTableColumnAfter.canExec() && (
            <TableHandlePopoverItem
              className="CSS_TABLE_CELL_MENU_ITEM"
              onSelect={() => editor.commands.addTableColumnAfter()}
            >
              <span>Insert Right</span>
            </TableHandlePopoverItem>
          )}
          {editor.commands.deleteCellSelection.canExec() && (
            <TableHandlePopoverItem
              className="CSS_TABLE_CELL_MENU_ITEM"
              onSelect={() => editor.commands.deleteCellSelection()}
            >
              <span>Clear Contents</span>
              <span className="CSS_TABLE_CELL_MENU_ITEM_SHORTCUT">Del</span>
            </TableHandlePopoverItem>
          )}
          {editor.commands.deleteTableColumn.canExec() && (
            <TableHandlePopoverItem
              className="CSS_TABLE_CELL_MENU_ITEM"
              onSelect={() => editor.commands.deleteTableColumn()}
            >
              <span>Delete Column</span>
            </TableHandlePopoverItem>
          )}
        </TableHandlePopoverContent>
      </TableHandleColumnRoot>

      <TableHandleRowRoot className="CSS_TABLE_ROW_HANDLE">
        <TableHandleRowTrigger className="CSS_TABLE_ROW_HANDLE_TRIGGER">
          <div className="CSS_ICON_TABLE_ROW_HANDLE"></div>
        </TableHandleRowTrigger>
        <TableHandlePopoverContent className="CSS_TABLE_HANDLE_MENU">
          {editor.commands.addTableRowAbove.canExec() && (
            <TableHandlePopoverItem
              className="CSS_TABLE_CELL_MENU_ITEM"
              onSelect={() => editor.commands.addTableRowAbove()}
            >
              <span>Insert Above</span>
            </TableHandlePopoverItem>
          )}
          {editor.commands.addTableRowBelow.canExec() && (
            <TableHandlePopoverItem
              className="CSS_TABLE_CELL_MENU_ITEM"
              onSelect={() => editor.commands.addTableRowBelow()}
            >
              <span>Insert Below</span>
            </TableHandlePopoverItem>
          )}
          {editor.commands.deleteCellSelection.canExec() && (
            <TableHandlePopoverItem
              className="CSS_TABLE_CELL_MENU_ITEM"
              onSelect={() => editor.commands.deleteCellSelection()}
            >
              <span>Clear Contents</span>
              <span className="CSS_TABLE_CELL_MENU_ITEM_SHORTCUT">Del</span>
            </TableHandlePopoverItem>
          )}
          {editor.commands.deleteTableRow.canExec() && (
            <TableHandlePopoverItem
              className="CSS_TABLE_CELL_MENU_ITEM"
              onSelect={() => editor.commands.deleteTableRow()}
            >
              <span>Delete Row</span>
            </TableHandlePopoverItem>
          )}
        </TableHandlePopoverContent>
      </TableHandleRowRoot>
    </TableHandleRoot>
  )
}
