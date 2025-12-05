import type { Editor } from 'prosekit/core'
import type { TableExtension } from 'prosekit/extensions/table'
import { useEditorDerivedValue } from 'prosekit/solid'
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
} from 'prosekit/solid/table-handle'
import {
  Show,
  type JSX,
} from 'solid-js'

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

export default function TableHandle(props: Props): JSX.Element {
  const state = useEditorDerivedValue(getTableHandleState)

  return (
    <TableHandleRoot class="contents">
      <TableHandleDragPreview />
      <TableHandleDropIndicator />
      <TableHandleColumnRoot class="CSS_TABLE_COLUMN_HANDLE">
        <TableHandleColumnTrigger class="CSS_TABLE_COLUMN_HANDLE_TRIGGER">
          <div class="CSS_ICON_TABLE_COLUMN_HANDLE"></div>
        </TableHandleColumnTrigger>
        <TableHandlePopoverContent class="CSS_TABLE_HANDLE_MENU">
          <Show when={state().addTableColumnBefore.canExec}>
            <TableHandlePopoverItem
              class="CSS_TABLE_CELL_MENU_ITEM"
              onSelect={() => state().addTableColumnBefore.command()}
            >
              <span>Insert Left</span>
            </TableHandlePopoverItem>
          </Show>
          <Show when={state().addTableColumnAfter.canExec}>
            <TableHandlePopoverItem
              class="CSS_TABLE_CELL_MENU_ITEM"
              onSelect={() => state().addTableColumnAfter.command()}
            >
              <span>Insert Right</span>
            </TableHandlePopoverItem>
          </Show>
          <Show when={state().deleteCellSelection.canExec}>
            <TableHandlePopoverItem
              class="CSS_TABLE_CELL_MENU_ITEM"
              onSelect={() => state().deleteCellSelection.command()}
            >
              <span>Clear Contents</span>
              <span class="CSS_TABLE_CELL_MENU_ITEM_SHORTCUT">Del</span>
            </TableHandlePopoverItem>
          </Show>
          <Show when={state().deleteTableColumn.canExec}>
            <TableHandlePopoverItem
              class="CSS_TABLE_CELL_MENU_ITEM"
              onSelect={() => state().deleteTableColumn.command()}
            >
              <span>Delete Column</span>
            </TableHandlePopoverItem>
          </Show>
          <Show when={state().deleteTable.canExec}>
            <TableHandlePopoverItem
              class="CSS_TABLE_CELL_MENU_ITEM"
              data-danger=""
              onSelect={() => state().deleteTable.command()}
            >
              <span>Delete Table</span>
            </TableHandlePopoverItem>
          </Show>
        </TableHandlePopoverContent>
      </TableHandleColumnRoot>
      <TableHandleRowRoot
        placement={props.dir === 'rtl' ? 'right' : 'left'}
        class="CSS_TABLE_ROW_HANDLE"
      >
        <TableHandleRowTrigger class="CSS_TABLE_ROW_HANDLE_TRIGGER">
          <div class="CSS_ICON_TABLE_ROW_HANDLE"></div>
        </TableHandleRowTrigger>
        <TableHandlePopoverContent class="CSS_TABLE_HANDLE_MENU">
          <Show when={state().addTableRowAbove.canExec}>
            <TableHandlePopoverItem
              class="CSS_TABLE_CELL_MENU_ITEM"
              onSelect={() => state().addTableRowAbove.command()}
            >
              <span>Insert Above</span>
            </TableHandlePopoverItem>
          </Show>
          <Show when={state().addTableRowBelow.canExec}>
            <TableHandlePopoverItem
              class="CSS_TABLE_CELL_MENU_ITEM"
              onSelect={() => state().addTableRowBelow.command()}
            >
              <span>Insert Below</span>
            </TableHandlePopoverItem>
          </Show>
          <Show when={state().deleteCellSelection.canExec}>
            <TableHandlePopoverItem
              class="CSS_TABLE_CELL_MENU_ITEM"
              onSelect={() => state().deleteCellSelection.command()}
            >
              <span>Clear Contents</span>
              <span class="CSS_TABLE_CELL_MENU_ITEM_SHORTCUT">Del</span>
            </TableHandlePopoverItem>
          </Show>
          <Show when={state().deleteTableRow.canExec}>
            <TableHandlePopoverItem
              class="CSS_TABLE_CELL_MENU_ITEM"
              onSelect={() => state().deleteTableRow.command()}
            >
              <span>Delete Row</span>
            </TableHandlePopoverItem>
          </Show>
          <Show when={state().deleteTable.canExec}>
            <TableHandlePopoverItem
              class="CSS_TABLE_CELL_MENU_ITEM"
              data-danger=""
              onSelect={() => state().deleteTable.command()}
            >
              <span>Delete Table</span>
            </TableHandlePopoverItem>
          </Show>
        </TableHandlePopoverContent>
      </TableHandleRowRoot>
    </TableHandleRoot>
  )
}
