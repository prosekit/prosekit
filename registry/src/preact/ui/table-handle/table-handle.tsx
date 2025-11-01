import type { Editor } from 'prosekit/core'
import type { TableExtension } from 'prosekit/extensions/table'
import { useEditorDerivedValue } from 'prosekit/preact'
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

function getTableHandleState(editor: Editor<TableExtension>) {
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
    deleteTable: {
      canExec: editor.commands.deleteTable.canExec(),
      command: () => editor.commands.deleteTable(),
    },
  }
}

export default function TableHandle() {
  const state = useEditorDerivedValue(getTableHandleState)

  return (
    <TableHandleRoot className="contents">
      <TableHandleDragPreview />
      <TableHandleDropIndicator />
      <TableHandleColumnRoot className="CSS_TABLE_COLUMN_HANDLE">
        <TableHandleColumnTrigger className="CSS_TABLE_COLUMN_HANDLE_TRIGGER">
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
          {state.deleteTable.canExec && (
            <TableHandlePopoverItem
              className="CSS_TABLE_CELL_MENU_ITEM"
              data-danger
              onSelect={state.deleteTable.command}
            >
              <span>Delete Table</span>
            </TableHandlePopoverItem>
          )}
        </TableHandlePopoverContent>
      </TableHandleColumnRoot>
      <TableHandleRowRoot className="CSS_TABLE_ROW_HANDLE">
        <TableHandleRowTrigger className="CSS_TABLE_ROW_HANDLE_TRIGGER">
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
          {state.deleteTable.canExec && (
            <TableHandlePopoverItem
              className="CSS_TABLE_CELL_MENU_ITEM"
              data-danger
              onSelect={state.deleteTable.command}
            >
              <span>Delete Table</span>
            </TableHandlePopoverItem>
          )}
        </TableHandlePopoverContent>
      </TableHandleRowRoot>
    </TableHandleRoot>
  )
}
