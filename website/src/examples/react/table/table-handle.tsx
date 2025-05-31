import type { Editor } from 'prosekit/core'
import { useEditorDerivedValue } from 'prosekit/react'
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

function getTableHandleState(editor: Editor<EditorExtension>) {
  return {
    addTableColumnBefore: {
      canExec: editor.commands.addTableColumnBefore.canExec(),
      command: () => editor.commands.addTableColumnBefore(),
    },
    addTableColumnAfter: {
      canExec: editor.commands.addTableColumnAfter.canExec(),
      command: () => editor.commands.addTableColumnAfter(),
    },
    deleteCellSelection: {
      canExec: editor.commands.deleteCellSelection.canExec(),
      command: () => editor.commands.deleteCellSelection(),
    },
    deleteTableColumn: {
      canExec: editor.commands.deleteTableColumn.canExec(),
      command: () => editor.commands.deleteTableColumn(),
    },
    addTableRowAbove: {
      canExec: editor.commands.addTableRowAbove.canExec(),
      command: () => editor.commands.addTableRowAbove(),
    },
    addTableRowBelow: {
      canExec: editor.commands.addTableRowBelow.canExec(),
      command: () => editor.commands.addTableRowBelow(),
    },
    deleteTableRow: {
      canExec: editor.commands.deleteTableRow.canExec(),
      command: () => editor.commands.deleteTableRow(),
    },
  }
}

export function TableHandle() {
  const state = useEditorDerivedValue(getTableHandleState)

  return (
    <TableHandleRoot className="contents">
      <TableHandleColumnRoot className="CSS_TABLE_COLUMN_HANDLE">
        <TableHandleColumnTrigger>
          <div className="CSS_ICON_TABLE_COLUMN_HANDLE"></div>
        </TableHandleColumnTrigger>
        <TableHandlePopoverContent className="CSS_TABLE_HANDLE_MENU">
          {state.addTableColumnBefore.canExec && (
            <TableHandlePopoverItem
              className="CSS_TABLE_CELL_MENU_ITEM"
              onSelect={state.addTableColumnBefore.command}
            >
              <span>Insert Left</span>
            </TableHandlePopoverItem>
          )}
          {state.addTableColumnAfter.canExec && (
            <TableHandlePopoverItem
              className="CSS_TABLE_CELL_MENU_ITEM"
              onSelect={state.addTableColumnAfter.command}
            >
              <span>Insert Right</span>
            </TableHandlePopoverItem>
          )}
          {state.deleteCellSelection.canExec && (
            <TableHandlePopoverItem
              className="CSS_TABLE_CELL_MENU_ITEM"
              onSelect={state.deleteCellSelection.command}
            >
              <span>Clear Contents</span>
              <span className="CSS_TABLE_CELL_MENU_ITEM_SHORTCUT">Del</span>
            </TableHandlePopoverItem>
          )}
          {state.deleteTableColumn.canExec && (
            <TableHandlePopoverItem
              className="CSS_TABLE_CELL_MENU_ITEM"
              onSelect={state.deleteTableColumn.command}
            >
              <span>Delete Column</span>
            </TableHandlePopoverItem>
          )}
        </TableHandlePopoverContent>
      </TableHandleColumnRoot>
      <TableHandleRowRoot className="CSS_TABLE_ROW_HANDLE">
        <TableHandleRowTrigger>
          <div className="CSS_ICON_TABLE_ROW_HANDLE"></div>
        </TableHandleRowTrigger>
        <TableHandlePopoverContent className="CSS_TABLE_HANDLE_MENU">
          {state.addTableRowAbove.canExec && (
            <TableHandlePopoverItem
              className="CSS_TABLE_CELL_MENU_ITEM"
              onSelect={state.addTableRowAbove.command}
            >
              <span>Insert Above</span>
            </TableHandlePopoverItem>
          )}
          {state.addTableRowBelow.canExec && (
            <TableHandlePopoverItem
              className="CSS_TABLE_CELL_MENU_ITEM"
              onSelect={state.addTableRowBelow.command}
            >
              <span>Insert Below</span>
            </TableHandlePopoverItem>
          )}
          {state.deleteCellSelection.canExec && (
            <TableHandlePopoverItem
              className="CSS_TABLE_CELL_MENU_ITEM"
              onSelect={state.deleteCellSelection.command}
            >
              <span>Clear Contents</span>
              <span className="CSS_TABLE_CELL_MENU_ITEM_SHORTCUT">Del</span>
            </TableHandlePopoverItem>
          )}
          {state.deleteTableRow.canExec && (
            <TableHandlePopoverItem
              className="CSS_TABLE_CELL_MENU_ITEM"
              onSelect={state.deleteTableRow.command}
            >
              <span>Delete Row</span>
            </TableHandlePopoverItem>
          )}
        </TableHandlePopoverContent>
      </TableHandleRowRoot>
    </TableHandleRoot>
  )
}
