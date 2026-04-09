import type { Editor } from 'prosekit/core'
import type { TableExtension } from 'prosekit/extensions/table'
import { useEditorDerivedValue } from 'prosekit/react'
import { MenuItem, MenuPopup, MenuPositioner } from 'prosekit/react/menu'
import {
  TableHandleColumnMenuRoot,
  TableHandleColumnMenuTrigger,
  TableHandleColumnPopup,
  TableHandleColumnPositioner,
  TableHandleDragPreview,
  TableHandleDropIndicator,
  TableHandleRoot,
  TableHandleRowMenuRoot,
  TableHandleRowMenuTrigger,
  TableHandleRowPopup,
  TableHandleRowPositioner,
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
      <TableHandleColumnPositioner className="CSS_TABLE_HANDLE_COLUMN_POSITIONER">
        <TableHandleColumnPopup className="CSS_TABLE_HANDLE_COLUMN_POPUP">
          <TableHandleColumnMenuRoot className="contents">
            <TableHandleColumnMenuTrigger className="CSS_TABLE_COLUMN_HANDLE_TRIGGER">
              <div className="CSS_ICON_TABLE_COLUMN_HANDLE"></div>
            </TableHandleColumnMenuTrigger>
            <MenuPositioner className="CSS_TABLE_MENU_POSITIONER">
              <MenuPopup className="CSS_TABLE_MENU_POPUP">
                {state.addTableColumnBefore.canExec && (
                  <MenuItem
                    className="CSS_TABLE_CELL_MENU_ITEM"
                    onSelect={state.addTableColumnBefore.command}
                  >
                    <span>Insert Left</span>
                  </MenuItem>
                )}
                {state.addTableColumnAfter.canExec && (
                  <MenuItem
                    className="CSS_TABLE_CELL_MENU_ITEM"
                    onSelect={state.addTableColumnAfter.command}
                  >
                    <span>Insert Right</span>
                  </MenuItem>
                )}
                {state.deleteCellSelection.canExec && (
                  <MenuItem
                    className="CSS_TABLE_CELL_MENU_ITEM"
                    onSelect={state.deleteCellSelection.command}
                  >
                    <span>Clear Contents</span>
                    <span className="CSS_TABLE_CELL_MENU_ITEM_SHORTCUT">Del</span>
                  </MenuItem>
                )}
                {state.deleteTableColumn.canExec && (
                  <MenuItem
                    className="CSS_TABLE_CELL_MENU_ITEM"
                    onSelect={state.deleteTableColumn.command}
                  >
                    <span>Delete Column</span>
                  </MenuItem>
                )}
                {state.deleteTable.canExec && (
                  <MenuItem
                    className="CSS_TABLE_CELL_MENU_ITEM"
                    data-danger=""
                    onSelect={state.deleteTable.command}
                  >
                    <span>Delete Table</span>
                  </MenuItem>
                )}
              </MenuPopup>
            </MenuPositioner>
          </TableHandleColumnMenuRoot>
        </TableHandleColumnPopup>
      </TableHandleColumnPositioner>
      <TableHandleRowPositioner
        placement={props.dir === 'rtl' ? 'right' : 'left'}
        className="CSS_TABLE_HANDLE_ROW_POSITIONER"
      >
        <TableHandleRowPopup className="CSS_TABLE_HANDLE_ROW_POPUP">
          <TableHandleRowMenuRoot className="contents">
            <TableHandleRowMenuTrigger className="CSS_TABLE_ROW_HANDLE_TRIGGER">
              <div className="CSS_ICON_TABLE_ROW_HANDLE"></div>
            </TableHandleRowMenuTrigger>
            <MenuPositioner className="CSS_TABLE_MENU_POSITIONER">
              <MenuPopup className="CSS_TABLE_MENU_POPUP">
                {state.addTableRowAbove.canExec && (
                  <MenuItem
                    className="CSS_TABLE_CELL_MENU_ITEM"
                    onSelect={state.addTableRowAbove.command}
                  >
                    <span>Insert Above</span>
                  </MenuItem>
                )}
                {state.addTableRowBelow.canExec && (
                  <MenuItem
                    className="CSS_TABLE_CELL_MENU_ITEM"
                    onSelect={state.addTableRowBelow.command}
                  >
                    <span>Insert Below</span>
                  </MenuItem>
                )}
                {state.deleteCellSelection.canExec && (
                  <MenuItem
                    className="CSS_TABLE_CELL_MENU_ITEM"
                    onSelect={state.deleteCellSelection.command}
                  >
                    <span>Clear Contents</span>
                    <span className="CSS_TABLE_CELL_MENU_ITEM_SHORTCUT">Del</span>
                  </MenuItem>
                )}
                {state.deleteTableRow.canExec && (
                  <MenuItem
                    className="CSS_TABLE_CELL_MENU_ITEM"
                    onSelect={state.deleteTableRow.command}
                  >
                    <span>Delete Row</span>
                  </MenuItem>
                )}
                {state.deleteTable.canExec && (
                  <MenuItem
                    className="CSS_TABLE_CELL_MENU_ITEM"
                    data-danger=""
                    onSelect={state.deleteTable.command}
                  >
                    <span>Delete Table</span>
                  </MenuItem>
                )}
              </MenuPopup>
            </MenuPositioner>
          </TableHandleRowMenuRoot>
        </TableHandleRowPopup>
      </TableHandleRowPositioner>
    </TableHandleRoot>
  )
}
