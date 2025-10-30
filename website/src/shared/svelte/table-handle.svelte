<script lang="ts">
import { useEditor } from 'prosekit/svelte'
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
import type { EditorExtension } from './extension'

const editor = useEditor<EditorExtension>({ update: true })
</script>

<TableHandleRoot class="contents">
  <TableHandleDragPreview />
  <TableHandleDropIndicator />
  <TableHandleColumnRoot class="CSS_TABLE_COLUMN_HANDLE">
    <TableHandleColumnTrigger class="CSS_TABLE_COLUMN_HANDLE_TRIGGER">
      <div class="CSS_ICON_TABLE_COLUMN_HANDLE"></div>
    </TableHandleColumnTrigger>
    <TableHandlePopoverContent class="CSS_TABLE_HANDLE_MENU">
      {#if $editor.commands.addTableColumnBefore.canExec()}
        <TableHandlePopoverItem
          class="CSS_TABLE_CELL_MENU_ITEM"
          onSelect={$editor.commands.addTableColumnBefore}
        >
          <span>Insert Left</span>
        </TableHandlePopoverItem>
      {/if}
      {#if $editor.commands.addTableColumnAfter.canExec()}
        <TableHandlePopoverItem
          class="CSS_TABLE_CELL_MENU_ITEM"
          onSelect={$editor.commands.addTableColumnAfter}
        >
          <span>Insert Right</span>
        </TableHandlePopoverItem>
      {/if}
      {#if $editor.commands.deleteCellSelection.canExec()}
        <TableHandlePopoverItem
          class="CSS_TABLE_CELL_MENU_ITEM"
          onSelect={$editor.commands.deleteCellSelection}
        >
          <span>Clear Contents</span>
          <span class="CSS_TABLE_CELL_MENU_ITEM_SHORTCUT">Del</span>
        </TableHandlePopoverItem>
      {/if}
      {#if $editor.commands.deleteTableColumn.canExec()}
        <TableHandlePopoverItem
          class="CSS_TABLE_CELL_MENU_ITEM"
          onSelect={$editor.commands.deleteTableColumn}
        >
          <span>Delete Column</span>
        </TableHandlePopoverItem>
      {/if}
      {#if $editor.commands.deleteTable.canExec()}
        <TableHandlePopoverItem
          class="CSS_TABLE_CELL_MENU_ITEM"
          data-danger
          onSelect={$editor.commands.deleteTable}
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
      {#if $editor.commands.addTableRowAbove.canExec()}
        <TableHandlePopoverItem
          class="CSS_TABLE_CELL_MENU_ITEM"
          onSelect={$editor.commands.addTableRowAbove}
        >
          <span>Insert Above</span>
        </TableHandlePopoverItem>
      {/if}
      {#if $editor.commands.addTableRowBelow.canExec()}
        <TableHandlePopoverItem
          class="CSS_TABLE_CELL_MENU_ITEM"
          onSelect={$editor.commands.addTableRowBelow}
        >
          <span>Insert Below</span>
        </TableHandlePopoverItem>
      {/if}
      {#if $editor.commands.deleteCellSelection.canExec()}
        <TableHandlePopoverItem
          class="CSS_TABLE_CELL_MENU_ITEM"
          onSelect={$editor.commands.deleteCellSelection}
        >
          <span>Clear Contents</span>
          <span class="CSS_TABLE_CELL_MENU_ITEM_SHORTCUT">Del</span>
        </TableHandlePopoverItem>
      {/if}
      {#if $editor.commands.deleteTableRow.canExec()}
        <TableHandlePopoverItem
          class="CSS_TABLE_CELL_MENU_ITEM"
          onSelect={$editor.commands.deleteTableRow}
        >
          <span>Delete Row</span>
        </TableHandlePopoverItem>
      {/if}
      {#if $editor.commands.deleteTable.canExec()}
        <TableHandlePopoverItem
          class="CSS_TABLE_CELL_MENU_ITEM"
          data-danger
          onSelect={$editor.commands.deleteTable}
        >
          <span>Delete Table</span>
        </TableHandlePopoverItem>
      {/if}
    </TableHandlePopoverContent>
  </TableHandleRowRoot>
</TableHandleRoot>
