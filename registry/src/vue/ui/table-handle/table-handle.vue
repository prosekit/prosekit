<script setup lang="ts">
import type { Editor } from 'prosekit/core'
import type { TableExtension } from 'prosekit/extensions/table'
import { useEditorDerivedValue } from 'prosekit/vue'
import { MenuItem, MenuPopup, MenuPositioner } from 'prosekit/vue/menu'
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

interface Props {
  dir?: 'ltr' | 'rtl'
}

const props = defineProps<Props>()

const state = useEditorDerivedValue(getTableHandleState)
</script>

<template>
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
              <MenuItem
                v-if="state.addTableColumnBefore.canExec"
                class="CSS_TABLE_CELL_MENU_ITEM"
                @select="state.addTableColumnBefore.command"
              >
                <span>Insert Left</span>
              </MenuItem>
              <MenuItem
                v-if="state.addTableColumnAfter.canExec"
                class="CSS_TABLE_CELL_MENU_ITEM"
                @select="state.addTableColumnAfter.command"
              >
                <span>Insert Right</span>
              </MenuItem>
              <MenuItem
                v-if="state.deleteCellSelection.canExec"
                class="CSS_TABLE_CELL_MENU_ITEM"
                @select="state.deleteCellSelection.command"
              >
                <span>Clear Contents</span>
                <span class="CSS_TABLE_CELL_MENU_ITEM_SHORTCUT">Del</span>
              </MenuItem>
              <MenuItem
                v-if="state.deleteTableColumn.canExec"
                class="CSS_TABLE_CELL_MENU_ITEM"
                @select="state.deleteTableColumn.command"
              >
                <span>Delete Column</span>
              </MenuItem>
              <MenuItem
                v-if="state.deleteTable.canExec"
                class="CSS_TABLE_CELL_MENU_ITEM"
                data-danger
                @select="state.deleteTable.command"
              >
                <span>Delete Table</span>
              </MenuItem>
            </MenuPopup>
          </MenuPositioner>
        </TableHandleColumnMenuRoot>
      </TableHandleColumnPopup>
    </TableHandleColumnPositioner>
    <TableHandleRowPositioner
      :placement="props.dir === 'rtl' ? 'right' : 'left'"
      class="CSS_TABLE_HANDLE_ROW_POSITIONER"
    >
      <TableHandleRowPopup class="CSS_TABLE_HANDLE_ROW_POPUP">
        <TableHandleRowMenuRoot>
          <TableHandleRowMenuTrigger class="CSS_TABLE_ROW_HANDLE_TRIGGER">
            <div class="CSS_ICON_TABLE_ROW_HANDLE"></div>
          </TableHandleRowMenuTrigger>
          <MenuPositioner class="CSS_TABLE_MENU_POSITIONER">
            <MenuPopup class="CSS_TABLE_MENU_POPUP">
              <MenuItem
                v-if="state.addTableRowAbove.canExec"
                class="CSS_TABLE_CELL_MENU_ITEM"
                @select="state.addTableRowAbove.command"
              >
                <span>Insert Above</span>
              </MenuItem>
              <MenuItem
                v-if="state.addTableRowBelow.canExec"
                class="CSS_TABLE_CELL_MENU_ITEM"
                @select="state.addTableRowBelow.command"
              >
                <span>Insert Below</span>
              </MenuItem>
              <MenuItem
                v-if="state.deleteCellSelection.canExec"
                class="CSS_TABLE_CELL_MENU_ITEM"
                @select="state.deleteCellSelection.command"
              >
                <span>Clear Contents</span>
                <span class="CSS_TABLE_CELL_MENU_ITEM_SHORTCUT">Del</span>
              </MenuItem>
              <MenuItem
                v-if="state.deleteTableRow.canExec"
                class="CSS_TABLE_CELL_MENU_ITEM"
                @select="state.deleteTableRow.command"
              >
                <span>Delete Row</span>
              </MenuItem>
              <MenuItem
                v-if="state.deleteTable.canExec"
                class="CSS_TABLE_CELL_MENU_ITEM"
                data-danger
                @select="state.deleteTable.command"
              >
                <span>Delete Table</span>
              </MenuItem>
            </MenuPopup>
          </MenuPositioner>
        </TableHandleRowMenuRoot>
      </TableHandleRowPopup>
    </TableHandleRowPositioner>
  </TableHandleRoot>
</template>
