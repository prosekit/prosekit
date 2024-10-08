<script setup lang="ts">
import { Themes } from '@prosekit/themes'
import { useEditor } from 'prosekit/vue'
import {
  TableHandleRoot,
  TableHandleColumnRoot,
  TableHandleColumnTrigger,
  TableHandlePopoverContent,
  TableHandlePopoverItem,
  TableHandleRowRoot,
  TableHandleRowTrigger,
} from 'prosekit/vue/table-handle'

import type { EditorExtension } from './extension'

const editor = useEditor<EditorExtension>({ update: true })
</script>

<template>
  <TableHandleRoot class="contents">
    <TableHandleColumnRoot :class="Themes.TABLE_COLUMN_HANDLE">
      <TableHandleColumnTrigger>
        <div :class="Themes.ICON_TABLE_COLUMN_HANDLE"></div>
      </TableHandleColumnTrigger>
      <TableHandlePopoverContent :class="Themes.TABLE_HANDLE_MENU">
        <TableHandlePopoverItem
          v-if="editor.commands.addTableColumnBefore.canExec()"
          :class="Themes.TABLE_CELL_MENU_ITEM"
          @select="editor.commands.addTableColumnBefore"
        >
          Insert Left
        </TableHandlePopoverItem>
        <TableHandlePopoverItem
          v-if="editor.commands.addTableColumnAfter.canExec()"
          :class="Themes.TABLE_CELL_MENU_ITEM"
          @select="editor.commands.addTableColumnAfter"
        >
          Insert Right
        </TableHandlePopoverItem>
        <TableHandlePopoverItem
          v-if="editor.commands.deleteCellSelection.canExec()"
          :class="Themes.TABLE_CELL_MENU_ITEM"
          @select="editor.commands.deleteCellSelection"
        >
          Clear Contents
        </TableHandlePopoverItem>
        <TableHandlePopoverItem
          v-if="editor.commands.deleteTableColumn.canExec()"
          :class="Themes.TABLE_CELL_MENU_ITEM"
          @select="editor.commands.deleteTableColumn"
        >
          Delete Column
        </TableHandlePopoverItem>
      </TableHandlePopoverContent>
    </TableHandleColumnRoot>
    <TableHandleRowRoot :class="Themes.TABLE_ROW_HANDLE">
      <TableHandleRowTrigger>
        <div :class="Themes.ICON_DRAG_HANDLE"></div>
      </TableHandleRowTrigger>
      <TableHandlePopoverContent :class="Themes.TABLE_HANDLE_MENU">
        <TableHandlePopoverItem
          v-if="editor.commands.addTableRowAbove.canExec()"
          :class="Themes.TABLE_CELL_MENU_ITEM"
          @select="editor.commands.addTableRowAbove"
        >
          Insert Above
        </TableHandlePopoverItem>
        <TableHandlePopoverItem
          v-if="editor.commands.addTableRowBelow.canExec()"
          :class="Themes.TABLE_CELL_MENU_ITEM"
          @select="editor.commands.addTableRowBelow"
        >
          Insert Below
        </TableHandlePopoverItem>
        <TableHandlePopoverItem
          v-if="editor.commands.deleteCellSelection.canExec()"
          :class="Themes.TABLE_CELL_MENU_ITEM"
          @select="editor.commands.deleteCellSelection"
        >
          Clear Contents
        </TableHandlePopoverItem>
        <TableHandlePopoverItem
          v-if="editor.commands.deleteTableRow.canExec()"
          :class="Themes.TABLE_CELL_MENU_ITEM"
          @select="editor.commands.deleteTableRow"
        >
          Delete Row
        </TableHandlePopoverItem>
      </TableHandlePopoverContent>
    </TableHandleRowRoot>
  </TableHandleRoot>
</template>
