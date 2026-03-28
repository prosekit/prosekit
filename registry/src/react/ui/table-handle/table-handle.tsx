import type { Editor } from 'prosekit/core'
import type { TableExtension } from 'prosekit/extensions/table'
import { useEditorDerivedValue } from 'prosekit/react'
import {
  TableHandleColumnRoot,
  TableHandleColumnTrigger,
  TableHandleDragPreview,
  TableHandleDropIndicator,
  TableHandlePopoverItem,
  TableHandlePopoverPopup,
  TableHandlePopoverPositioner,
  TableHandleRoot,
  TableHandleRowRoot,
  TableHandleRowTrigger,
} from 'prosekit/react/table-handle'

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

interface Props {
  dir?: 'ltr' | 'rtl'
}

export default function TableHandle(props: Props) {
  const state = useEditorDerivedValue(getTableHandleState)

  return (
    <TableHandleRoot className="contents">
      <TableHandleDragPreview />
      <TableHandleDropIndicator />
      <TableHandleColumnRoot className="CSS_TABLE_COLUMN_HANDLE">
        <TableHandleColumnTrigger className="CSS_TABLE_COLUMN_HANDLE_TRIGGER">
          <div className="CSS_ICON_TABLE_COLUMN_HANDLE"></div>
        </TableHandleColumnTrigger>
        <TableHandlePopoverPositioner>
          <TableHandlePopoverPopup className="CSS_TABLE_HANDLE_MENU">
            {state.addTableColumnBefore.canExec && (
              <TableHandlePopoverItem
                className="CSS_TABLE_CELL_MENU_ITEM"
                onItemSelect={state.addTableColumnBefore.command}
              >
                <span>Insert Left</span>
              </TableHandlePopoverItem>
            )}
            {state.addTableColumnAfter.canExec && (
              <TableHandlePopoverItem
                className="CSS_TABLE_CELL_MENU_ITEM"
                onItemSelect={state.addTableColumnAfter.command}
              >
                <span>Insert Right</span>
              </TableHandlePopoverItem>
            )}
            {state.deleteCellSelection.canExec && (
              <TableHandlePopoverItem
                className="CSS_TABLE_CELL_MENU_ITEM"
                onItemSelect={state.deleteCellSelection.command}
              >
                <span>Clear Contents</span>
                <span className="CSS_TABLE_CELL_MENU_ITEM_SHORTCUT">Del</span>
              </TableHandlePopoverItem>
            )}
            {state.deleteTableColumn.canExec && (
              <TableHandlePopoverItem
                className="CSS_TABLE_CELL_MENU_ITEM"
                onItemSelect={state.deleteTableColumn.command}
              >
                <span>Delete Column</span>
              </TableHandlePopoverItem>
            )}
            {state.deleteTable.canExec && (
              <TableHandlePopoverItem
                className="CSS_TABLE_CELL_MENU_ITEM"
                data-danger=""
                onItemSelect={state.deleteTable.command}
              >
                <span>Delete Table</span>
              </TableHandlePopoverItem>
            )}
          </TableHandlePopoverPopup>
        </TableHandlePopoverPositioner>
      </TableHandleColumnRoot>
      <TableHandleRowRoot
        placement={props.dir === 'rtl' ? 'right' : 'left'}
        className="CSS_TABLE_ROW_HANDLE"
      >
        <TableHandleRowTrigger className="CSS_TABLE_ROW_HANDLE_TRIGGER">
          <div className="CSS_ICON_TABLE_ROW_HANDLE"></div>
        </TableHandleRowTrigger>
        <TableHandlePopoverPositioner>
          <TableHandlePopoverPopup className="CSS_TABLE_HANDLE_MENU">
            {state.addTableRowAbove.canExec && (
              <TableHandlePopoverItem
                className="CSS_TABLE_CELL_MENU_ITEM"
                onItemSelect={state.addTableRowAbove.command}
              >
                <span>Insert Above</span>
              </TableHandlePopoverItem>
            )}
            {state.addTableRowBelow.canExec && (
              <TableHandlePopoverItem
                className="CSS_TABLE_CELL_MENU_ITEM"
                onItemSelect={state.addTableRowBelow.command}
              >
                <span>Insert Below</span>
              </TableHandlePopoverItem>
            )}
            {state.deleteCellSelection.canExec && (
              <TableHandlePopoverItem
                className="CSS_TABLE_CELL_MENU_ITEM"
                onItemSelect={state.deleteCellSelection.command}
              >
                <span>Clear Contents</span>
                <span className="CSS_TABLE_CELL_MENU_ITEM_SHORTCUT">Del</span>
              </TableHandlePopoverItem>
            )}
            {state.deleteTableRow.canExec && (
              <TableHandlePopoverItem
                className="CSS_TABLE_CELL_MENU_ITEM"
                onItemSelect={state.deleteTableRow.command}
              >
                <span>Delete Row</span>
              </TableHandlePopoverItem>
            )}
            {state.deleteTable.canExec && (
              <TableHandlePopoverItem
                className="CSS_TABLE_CELL_MENU_ITEM"
                data-danger=""
                onItemSelect={state.deleteTable.command}
              >
                <span>Delete Table</span>
              </TableHandlePopoverItem>
            )}
          </TableHandlePopoverPopup>
        </TableHandlePopoverPositioner>
      </TableHandleRowRoot>
    </TableHandleRoot>
  )
}
