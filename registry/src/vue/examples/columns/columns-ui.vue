<script setup lang="ts">
import type { Editor } from 'prosekit/core'
import { useEditorDerivedValue } from 'prosekit/vue'
import { ColumnsPopoverPopup, ColumnsPopoverPositioner, ColumnsPopoverRoot } from 'prosekit/vue/columns-popover'

import Button from '../../ui/button/button.vue'

import type { EditorExtension } from './extension.ts'

function getColumnMenuItems(editor: Editor<EditorExtension>) {
  return {
    addBefore: {
      canExec: editor.commands.addColumnBefore.canExec(),
      command: () => {
        editor.commands.addColumnBefore()
        editor.focus()
      },
    },
    addAfter: {
      canExec: editor.commands.addColumnAfter.canExec(),
      command: () => {
        editor.commands.addColumnAfter()
        editor.focus()
      },
    },
    distribute: {
      canExec: editor.commands.distributeColumnGroup.canExec(),
      command: () => {
        editor.commands.distributeColumnGroup()
        editor.focus()
      },
    },
    remove: {
      canExec: editor.commands.removeColumn.canExec(),
      command: () => {
        editor.commands.removeColumn()
        editor.focus()
      },
    },
  }
}

const items = useEditorDerivedValue(getColumnMenuItems)
</script>

<template>
  <ColumnsPopoverRoot>
    <ColumnsPopoverPositioner class="CSS_INLINE_MENU_POSITIONER">
      <ColumnsPopoverPopup class="CSS_INLINE_MENU_MAIN_POPUP">
        <Button
          :pressed="false"
          :disabled="!items.addBefore.canExec"
          tooltip="Add column before"
          @click="items.addBefore.command"
        >
          <div class="CSS_ICON_ARROW_LEFT" />
        </Button>
        <Button
          :pressed="false"
          :disabled="!items.addAfter.canExec"
          tooltip="Add column after"
          @click="items.addAfter.command"
        >
          <div class="CSS_ICON_PLUS" />
        </Button>
        <Button
          :pressed="false"
          :disabled="!items.distribute.canExec"
          tooltip="Equalize columns"
          @click="items.distribute.command"
        >
          <span class="text-sm leading-none">=</span>
        </Button>
        <Button
          :pressed="false"
          :disabled="!items.remove.canExec"
          tooltip="Remove column"
          @click="items.remove.command"
        >
          <div class="CSS_ICON_MINUS" />
        </Button>
      </ColumnsPopoverPopup>
    </ColumnsPopoverPositioner>
  </ColumnsPopoverRoot>
</template>
