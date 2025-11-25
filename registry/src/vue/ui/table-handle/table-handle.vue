<script setup lang="ts">
import type { Editor } from 'prosekit/core'
import type { TableExtension } from 'prosekit/extensions/table'
import { useEditorDerivedValue } from 'prosekit/vue'
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
} from 'prosekit/vue/table-handle'

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

<template>
  <TableHandleRoot class="contents">
    <TableHandleDragPreview />
    <TableHandleDropIndicator />
    <TableHandleColumnRoot class="CSS_TABLE_COLUMN_HANDLE">
      <TableHandleColumnTrigger class="CSS_TABLE_COLUMN_HANDLE_TRIGGER">
        <div class="CSS_ICON_TABLE_COLUMN_HANDLE"></div>
      </TableHandleColumnTrigger>
      <TableHandlePopoverContent class="CSS_TABLE_HANDLE_MENU">
        <TableHandlePopoverItem
          v-if="state.addTableColumnBefore.canExec"
          class="CSS_TABLE_CELL_MENU_ITEM"
          @select="state.addTableColumnBefore.command"
        >
          <span>Insert Left</span>
        </TableHandlePopoverItem>
        <TableHandlePopoverItem
          v-if="state.addTableColumnAfter.canExec"
          class="CSS_TABLE_CELL_MENU_ITEM"
          @select="state.addTableColumnAfter.command"
        >
          <span>Insert Right</span>
        </TableHandlePopoverItem>
        <TableHandlePopoverItem
          v-if="state.deleteCellSelection.canExec"
          class="CSS_TABLE_CELL_MENU_ITEM"
          @select="state.deleteCellSelection.command"
        >
          <span>Clear Contents</span>
          <span class="CSS_TABLE_CELL_MENU_ITEM_SHORTCUT">Del</span>
        </TableHandlePopoverItem>
        <TableHandlePopoverItem
          v-if="state.deleteTableColumn.canExec"
          class="CSS_TABLE_CELL_MENU_ITEM"
          @select="state.deleteTableColumn.command"
        >
          <span>Delete Column</span>
        </TableHandlePopoverItem>
        <TableHandlePopoverItem
          v-if="state.deleteTable.canExec"
          class="CSS_TABLE_CELL_MENU_ITEM"
          data-danger
          @select="state.deleteTable.command"
        >
          <span>Delete Table</span>
        </TableHandlePopoverItem>
      </TableHandlePopoverContent>
    </TableHandleColumnRoot>
    <TableHandleRowRoot class="CSS_TABLE_ROW_HANDLE">
      <TableHandleRowTrigger class="CSS_TABLE_ROW_HANDLE_TRIGGER">
        <div class="CSS_ICON_TABLE_ROW_HANDLE"></div>
      </TableHandleRowTrigger>
      <TableHandlePopoverContent class="CSS_TABLE_HANDLE_MENU">
        <TableHandlePopoverItem
          v-if="state.addTableRowAbove.canExec"
          class="CSS_TABLE_CELL_MENU_ITEM"
          @select="state.addTableRowAbove.command"
        >
          <span>Insert Above</span>
        </TableHandlePopoverItem>
        <TableHandlePopoverItem
          v-if="state.addTableRowBelow.canExec"
          class="CSS_TABLE_CELL_MENU_ITEM"
          @select="state.addTableRowBelow.command"
        >
          <span>Insert Below</span>
        </TableHandlePopoverItem>
        <TableHandlePopoverItem
          v-if="state.deleteCellSelection.canExec"
          class="CSS_TABLE_CELL_MENU_ITEM"
          @select="state.deleteCellSelection.command"
        >
          <span>Clear Contents</span>
          <span class="CSS_TABLE_CELL_MENU_ITEM_SHORTCUT">Del</span>
        </TableHandlePopoverItem>
        <TableHandlePopoverItem
          v-if="state.deleteTableRow.canExec"
          class="CSS_TABLE_CELL_MENU_ITEM"
          @select="state.deleteTableRow.command"
        >
          <span>Delete Row</span>
        </TableHandlePopoverItem>
        <TableHandlePopoverItem
          v-if="state.deleteTable.canExec"
          class="CSS_TABLE_CELL_MENU_ITEM"
          data-danger
          @select="state.deleteTable.command"
        >
          <span>Delete Table</span>
        </TableHandlePopoverItem>
      </TableHandlePopoverContent>
    </TableHandleRowRoot>
  </TableHandleRoot>
</template>
