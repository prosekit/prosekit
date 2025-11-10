<script lang="ts">
import type { Editor } from 'prosekit/core'
import type { TableExtension } from 'prosekit/extensions/table'
import { useEditorDerivedValue } from 'prosekit/svelte'
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

const state = useEditorDerivedValue(getTableHandleState)
</script>

<TableHandleRoot class="contents">
  <TableHandleDragPreview />
  <TableHandleDropIndicator />
  <TableHandleColumnRoot class="CSS_TABLE_COLUMN_HANDLE">
    <TableHandleColumnTrigger class="CSS_TABLE_COLUMN_HANDLE_TRIGGER">
      <div class="CSS_ICON_TABLE_COLUMN_HANDLE"></div>
    </TableHandleColumnTrigger>
    <TableHandlePopoverContent class="CSS_TABLE_HANDLE_MENU">
      {#if $state.addTableColumnBefore.canExec}
        <TableHandlePopoverItem
          class="CSS_TABLE_CELL_MENU_ITEM"
          onSelect={$state.addTableColumnBefore.command}
        >
          <span>Insert Left</span>
        </TableHandlePopoverItem>
      {/if}
      {#if $state.addTableColumnAfter.canExec}
        <TableHandlePopoverItem
          class="CSS_TABLE_CELL_MENU_ITEM"
          onSelect={$state.addTableColumnAfter.command}
        >
          <span>Insert Right</span>
        </TableHandlePopoverItem>
      {/if}
      {#if $state.deleteCellSelection.canExec}
        <TableHandlePopoverItem
          class="CSS_TABLE_CELL_MENU_ITEM"
          onSelect={$state.deleteCellSelection.command}
        >
          <span>Clear Contents</span>
          <span class="CSS_TABLE_CELL_MENU_ITEM_SHORTCUT">Del</span>
        </TableHandlePopoverItem>
      {/if}
      {#if $state.deleteTableColumn.canExec}
        <TableHandlePopoverItem
          class="CSS_TABLE_CELL_MENU_ITEM"
          onSelect={$state.deleteTableColumn.command}
        >
          <span>Delete Column</span>
        </TableHandlePopoverItem>
      {/if}
      {#if $state.deleteTable.canExec}
        <TableHandlePopoverItem
          class="CSS_TABLE_CELL_MENU_ITEM"
          data-danger=""
          onSelect={$state.deleteTable.command}
        >
          <span>Delete Table</span>
        </TableHandlePopoverItem>
      {/if}
    </TableHandlePopoverContent>
  </TableHandleColumnRoot>
  <TableHandleRowRoot class="CSS_TABLE_ROW_HANDLE">
    <TableHandleRowTrigger class="CSS_TABLE_ROW_HANDLE_TRIGGER">
      <div class="CSS_ICON_TABLE_ROW_HANDLE"></div>
    </TableHandleRowTrigger>
    <TableHandlePopoverContent class="CSS_TABLE_HANDLE_MENU">
      {#if $state.addTableRowAbove.canExec}
        <TableHandlePopoverItem
          class="CSS_TABLE_CELL_MENU_ITEM"
          onSelect={$state.addTableRowAbove.command}
        >
          <span>Insert Above</span>
        </TableHandlePopoverItem>
      {/if}
      {#if $state.addTableRowBelow.canExec}
        <TableHandlePopoverItem
          class="CSS_TABLE_CELL_MENU_ITEM"
          onSelect={$state.addTableRowBelow.command}
        >
          <span>Insert Below</span>
        </TableHandlePopoverItem>
      {/if}
      {#if $state.deleteCellSelection.canExec}
        <TableHandlePopoverItem
          class="CSS_TABLE_CELL_MENU_ITEM"
          onSelect={$state.deleteCellSelection.command}
        >
          <span>Clear Contents</span>
          <span class="CSS_TABLE_CELL_MENU_ITEM_SHORTCUT">Del</span>
        </TableHandlePopoverItem>
      {/if}
      {#if $state.deleteTableRow.canExec}
        <TableHandlePopoverItem
          class="CSS_TABLE_CELL_MENU_ITEM"
          onSelect={$state.deleteTableRow.command}
        >
          <span>Delete Row</span>
        </TableHandlePopoverItem>
      {/if}
      {#if $state.deleteTable.canExec}
        <TableHandlePopoverItem
          class="CSS_TABLE_CELL_MENU_ITEM"
          data-danger=""
          onSelect={$state.deleteTable.command}
        >
          <span>Delete Table</span>
        </TableHandlePopoverItem>
      {/if}
    </TableHandlePopoverContent>
  </TableHandleRowRoot>
</TableHandleRoot>
