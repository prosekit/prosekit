import type { Editor } from 'prosekit/core'
import type { TableExtension } from 'prosekit/extensions/table'
import { useEditorDerivedValue } from 'prosekit/preact'
import {
  MenuItem,
  MenuPopup,
  MenuPositioner,
  MenuRoot,
} from 'prosekit/preact/menu'
import {
  TableHandleColumnPopup,
  TableHandleColumnPositioner,
  TableHandleColumnTrigger,
  TableHandleDragPreview,
  TableHandleDropIndicator,
  TableHandleRoot,
  TableHandleRowPopup,
  TableHandleRowPositioner,
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

interface Props {
  dir?: 'ltr' | 'rtl'
}

export default function TableHandle(props: Props) {
  const state = useEditorDerivedValue(getTableHandleState)

  return (
    <TableHandleRoot className="contents">
      <TableHandleDragPreview />
      <TableHandleDropIndicator />
      <TableHandleColumnPositioner className="CSS_TABLE_COLUMN_HANDLE">
        <TableHandleColumnPopup>
          <MenuRoot>
            <TableHandleColumnTrigger className="CSS_TABLE_COLUMN_HANDLE_TRIGGER">
              <div className="CSS_ICON_TABLE_COLUMN_HANDLE"></div>
            </TableHandleColumnTrigger>
            <MenuPositioner>
              <MenuPopup className="CSS_TABLE_HANDLE_MENU">
                {state.addTableColumnBefore.canExec && (
                  <MenuItem
                    className="CSS_TABLE_CELL_MENU_ITEM"
                    onClick={state.addTableColumnBefore.command}
                  >
                    <span>Insert Left</span>
                  </MenuItem>
                )}
                {state.addTableColumnAfter.canExec && (
                  <MenuItem
                    className="CSS_TABLE_CELL_MENU_ITEM"
                    onClick={state.addTableColumnAfter.command}
                  >
                    <span>Insert Right</span>
                  </MenuItem>
                )}
                {state.deleteCellSelection.canExec && (
                  <MenuItem
                    className="CSS_TABLE_CELL_MENU_ITEM"
                    onClick={state.deleteCellSelection.command}
                  >
                    <span>Clear Contents</span>
                    <span className="CSS_TABLE_CELL_MENU_ITEM_SHORTCUT">Del</span>
                  </MenuItem>
                )}
                {state.deleteTableColumn.canExec && (
                  <MenuItem
                    className="CSS_TABLE_CELL_MENU_ITEM"
                    onClick={state.deleteTableColumn.command}
                  >
                    <span>Delete Column</span>
                  </MenuItem>
                )}
                {state.deleteTable.canExec && (
                  <MenuItem
                    className="CSS_TABLE_CELL_MENU_ITEM"
                    data-danger=""
                    onClick={state.deleteTable.command}
                  >
                    <span>Delete Table</span>
                  </MenuItem>
                )}
              </MenuPopup>
            </MenuPositioner>
          </MenuRoot>
        </TableHandleColumnPopup>
      </TableHandleColumnPositioner>
      <TableHandleRowPositioner
        placement={props.dir === 'rtl' ? 'right' : 'left'}
        className="CSS_TABLE_ROW_HANDLE"
      >
        <TableHandleRowPopup>
          <MenuRoot>
            <TableHandleRowTrigger className="CSS_TABLE_ROW_HANDLE_TRIGGER">
              <div className="CSS_ICON_TABLE_ROW_HANDLE"></div>
            </TableHandleRowTrigger>
            <MenuPositioner>
              <MenuPopup className="CSS_TABLE_HANDLE_MENU">
                {state.addTableRowAbove.canExec && (
                  <MenuItem
                    className="CSS_TABLE_CELL_MENU_ITEM"
                    onClick={state.addTableRowAbove.command}
                  >
                    <span>Insert Above</span>
                  </MenuItem>
                )}
                {state.addTableRowBelow.canExec && (
                  <MenuItem
                    className="CSS_TABLE_CELL_MENU_ITEM"
                    onClick={state.addTableRowBelow.command}
                  >
                    <span>Insert Below</span>
                  </MenuItem>
                )}
                {state.deleteCellSelection.canExec && (
                  <MenuItem
                    className="CSS_TABLE_CELL_MENU_ITEM"
                    onClick={state.deleteCellSelection.command}
                  >
                    <span>Clear Contents</span>
                    <span className="CSS_TABLE_CELL_MENU_ITEM_SHORTCUT">Del</span>
                  </MenuItem>
                )}
                {state.deleteTableRow.canExec && (
                  <MenuItem
                    className="CSS_TABLE_CELL_MENU_ITEM"
                    onClick={state.deleteTableRow.command}
                  >
                    <span>Delete Row</span>
                  </MenuItem>
                )}
                {state.deleteTable.canExec && (
                  <MenuItem
                    className="CSS_TABLE_CELL_MENU_ITEM"
                    data-danger=""
                    onClick={state.deleteTable.command}
                  >
                    <span>Delete Table</span>
                  </MenuItem>
                )}
              </MenuPopup>
            </MenuPositioner>
          </MenuRoot>
        </TableHandleRowPopup>
      </TableHandleRowPositioner>
    </TableHandleRoot>
  )
}
