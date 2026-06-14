<script lang="ts">
import type { Editor } from 'prosekit/core'
import { useEditorDerivedValue } from 'prosekit/svelte'
import { ColumnsPopoverPopup, ColumnsPopoverPositioner, ColumnsPopoverRoot } from 'prosekit/svelte/columns-popover'

import Button from '../../ui/button/button.svelte'

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
      canExec: editor.commands.distributeColumns.canExec(),
      command: () => {
        editor.commands.distributeColumns()
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

<ColumnsPopoverRoot>
  <ColumnsPopoverPositioner class="CSS_INLINE_MENU_POSITIONER">
    <ColumnsPopoverPopup class="CSS_INLINE_MENU_MAIN_POPUP">
      <Button
        pressed={false}
        disabled={!$items.addBefore.canExec}
        tooltip="Add column before"
        onClick={$items.addBefore.command}
      >
        <div class="CSS_ICON_ARROW_LEFT"></div>
      </Button>
      <Button
        pressed={false}
        disabled={!$items.addAfter.canExec}
        tooltip="Add column after"
        onClick={$items.addAfter.command}
      >
        <div class="CSS_ICON_PLUS"></div>
      </Button>
      <Button
        pressed={false}
        disabled={!$items.distribute.canExec}
        tooltip="Equalize columns"
        onClick={$items.distribute.command}
      >
        <span class="text-sm leading-none">=</span>
      </Button>
      <Button
        pressed={false}
        disabled={!$items.remove.canExec}
        tooltip="Remove column"
        onClick={$items.remove.command}
      >
        <div class="CSS_ICON_MINUS"></div>
      </Button>
    </ColumnsPopoverPopup>
  </ColumnsPopoverPositioner>
</ColumnsPopoverRoot>
