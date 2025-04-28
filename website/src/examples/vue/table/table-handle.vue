<script setup lang="ts">
import { useEditor } from 'prosekit/vue'
import {
  TableHandleColumnRoot,
  TableHandleColumnTrigger,
  TableHandlePopoverContent,
  TableHandlePopoverItem,
  TableHandleRoot,
  TableHandleRowRoot,
  TableHandleRowTrigger,
} from 'prosekit/vue/table-handle'

import type { EditorExtension } from './extension'

const editor = useEditor<EditorExtension>({ update: true })
</script>

<template>
  <TableHandleRoot class="contents">
    <TableHandleColumnRoot class="CSS_TABLE_COLUMN_HANDLE">
      <TableHandleColumnTrigger>
        <div class="CSS_ICON_TABLE_COLUMN_HANDLE"></div>
      </TableHandleColumnTrigger>
      <TableHandlePopoverContent class="CSS_TABLE_HANDLE_MENU">
        <TableHandlePopoverItem
          v-if="editor.commands.addTableColumnBefore.canExec()"
          class="CSS_TABLE_CELL_MENU_ITEM"
          @select="editor.commands.addTableColumnBefore"
        >
          <span>Insert Left</span>
        </TableHandlePopoverItem>
        <TableHandlePopoverItem
          v-if="editor.commands.addTableColumnAfter.canExec()"
          class="CSS_TABLE_CELL_MENU_ITEM"
          @select="editor.commands.addTableColumnAfter"
        >
          <span>Insert Right</span>
        </TableHandlePopoverItem>
        <TableHandlePopoverItem
          v-if="editor.commands.deleteCellSelection.canExec()"
          class="CSS_TABLE_CELL_MENU_ITEM"
          @select="editor.commands.deleteCellSelection"
        >
          <span>Clear Contents</span>
          <span class="CSS_TABLE_CELL_MENU_ITEM_SHORTCUT">Del</span>
        </TableHandlePopoverItem>
        <TableHandlePopoverItem
          v-if="editor.commands.deleteTableColumn.canExec()"
          class="CSS_TABLE_CELL_MENU_ITEM"
          @select="editor.commands.deleteTableColumn"
        >
          <span>Delete Column</span>
        </TableHandlePopoverItem>
      </TableHandlePopoverContent>
    </TableHandleColumnRoot>
    <TableHandleRowRoot class="CSS_TABLE_ROW_HANDLE">
      <TableHandleRowTrigger>
        <div class="CSS_ICON_DRAG_HANDLE"></div>
      </TableHandleRowTrigger>
      <TableHandlePopoverContent class="CSS_TABLE_HANDLE_MENU">
        <TableHandlePopoverItem
          v-if="editor.commands.addTableRowAbove.canExec()"
          class="CSS_TABLE_CELL_MENU_ITEM"
          @select="editor.commands.addTableRowAbove"
        >
          <span>Insert Above</span>
        </TableHandlePopoverItem>
        <TableHandlePopoverItem
          v-if="editor.commands.addTableRowBelow.canExec()"
          class="CSS_TABLE_CELL_MENU_ITEM"
          @select="editor.commands.addTableRowBelow"
        >
          <span>Insert Below</span>
        </TableHandlePopoverItem>
        <TableHandlePopoverItem
          v-if="editor.commands.deleteCellSelection.canExec()"
          class="CSS_TABLE_CELL_MENU_ITEM"
          @select="editor.commands.deleteCellSelection"
        >
          <span>Clear Contents</span>
          <span class="CSS_TABLE_CELL_MENU_ITEM_SHORTCUT">Del</span>
        </TableHandlePopoverItem>
        <TableHandlePopoverItem
          v-if="editor.commands.deleteTableRow.canExec()"
          class="CSS_TABLE_CELL_MENU_ITEM"
          @select="editor.commands.deleteTableRow"
        >
          <span>Delete Row</span>
        </TableHandlePopoverItem>
      </TableHandlePopoverContent>
    </TableHandleRowRoot>
  </TableHandleRoot>
</template>
