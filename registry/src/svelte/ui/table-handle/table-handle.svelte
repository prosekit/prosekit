<script lang="ts">
import type { Editor } from 'prosekit/core'
import type { TableExtension } from 'prosekit/extensions/table'
import { useEditorDerivedValue } from 'prosekit/svelte'
import { MenuItem, MenuPopup, MenuPositioner } from 'prosekit/svelte/menu'
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
} from 'prosekit/svelte/table-handle'

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

const props: Props = $props()

const state = useEditorDerivedValue(getTableHandleState)
</script>

<TableHandleRoot>
  <TableHandleDragPreview />
  <TableHandleDropIndicator />
  <TableHandleColumnPositioner class="CSS_TABLE_HANDLE_COLUMN_POSITIONER">
    <TableHandleColumnPopup class="CSS_TABLE_HANDLE_COLUMN_POPUP">
      <TableHandleColumnMenuRoot>
        <TableHandleColumnMenuTrigger class="CSS_TABLE_COLUMN_HANDLE_TRIGGER">
          <div class="CSS_ICON_TABLE_COLUMN_HANDLE"></div>
        </TableHandleColumnMenuTrigger>
        <MenuPositioner class="CSS_TABLE_MENU_POSITIONER">
          <MenuPopup class="CSS_TABLE_MENU_POPUP">
            {#if $state.addTableColumnBefore.canExec}
              <MenuItem
                class="CSS_TABLE_CELL_MENU_ITEM"
                onSelect={$state.addTableColumnBefore.command}
              >
                <span>Insert Left</span>
              </MenuItem>
            {/if}
            {#if $state.addTableColumnAfter.canExec}
              <MenuItem
                class="CSS_TABLE_CELL_MENU_ITEM"
                onSelect={$state.addTableColumnAfter.command}
              >
                <span>Insert Right</span>
              </MenuItem>
            {/if}
            {#if $state.deleteCellSelection.canExec}
              <MenuItem
                class="CSS_TABLE_CELL_MENU_ITEM"
                onSelect={$state.deleteCellSelection.command}
              >
                <span>Clear Contents</span>
                <span class="CSS_TABLE_CELL_MENU_ITEM_SHORTCUT">Del</span>
              </MenuItem>
            {/if}
            {#if $state.deleteTableColumn.canExec}
              <MenuItem
                class="CSS_TABLE_CELL_MENU_ITEM"
                onSelect={$state.deleteTableColumn.command}
              >
                <span>Delete Column</span>
              </MenuItem>
            {/if}
            {#if $state.deleteTable.canExec}
              <MenuItem
                class="CSS_TABLE_CELL_MENU_ITEM"
                data-danger=""
                onSelect={$state.deleteTable.command}
              >
                <span>Delete Table</span>
              </MenuItem>
            {/if}
          </MenuPopup>
        </MenuPositioner>
      </TableHandleColumnMenuRoot>
    </TableHandleColumnPopup>
  </TableHandleColumnPositioner>
  <TableHandleRowPositioner
    placement={props.dir === 'rtl' ? 'right' : 'left'}
    class="CSS_TABLE_HANDLE_ROW_POSITIONER"
  >
    <TableHandleRowPopup class="CSS_TABLE_HANDLE_ROW_POPUP">
      <TableHandleRowMenuRoot>
        <TableHandleRowMenuTrigger class="CSS_TABLE_ROW_HANDLE_TRIGGER">
          <div class="CSS_ICON_TABLE_ROW_HANDLE"></div>
        </TableHandleRowMenuTrigger>
        <MenuPositioner class="CSS_TABLE_MENU_POSITIONER">
          <MenuPopup class="CSS_TABLE_MENU_POPUP">
            {#if $state.addTableRowAbove.canExec}
              <MenuItem
                class="CSS_TABLE_CELL_MENU_ITEM"
                onSelect={$state.addTableRowAbove.command}
              >
                <span>Insert Above</span>
              </MenuItem>
            {/if}
            {#if $state.addTableRowBelow.canExec}
              <MenuItem
                class="CSS_TABLE_CELL_MENU_ITEM"
                onSelect={$state.addTableRowBelow.command}
              >
                <span>Insert Below</span>
              </MenuItem>
            {/if}
            {#if $state.deleteCellSelection.canExec}
              <MenuItem
                class="CSS_TABLE_CELL_MENU_ITEM"
                onSelect={$state.deleteCellSelection.command}
              >
                <span>Clear Contents</span>
                <span class="CSS_TABLE_CELL_MENU_ITEM_SHORTCUT">Del</span>
              </MenuItem>
            {/if}
            {#if $state.deleteTableRow.canExec}
              <MenuItem
                class="CSS_TABLE_CELL_MENU_ITEM"
                onSelect={$state.deleteTableRow.command}
              >
                <span>Delete Row</span>
              </MenuItem>
            {/if}
            {#if $state.deleteTable.canExec}
              <MenuItem
                class="CSS_TABLE_CELL_MENU_ITEM"
                data-danger=""
                onSelect={$state.deleteTable.command}
              >
                <span>Delete Table</span>
              </MenuItem>
            {/if}
          </MenuPopup>
        </MenuPositioner>
      </TableHandleRowMenuRoot>
    </TableHandleRowPopup>
  </TableHandleRowPositioner>
</TableHandleRoot>
