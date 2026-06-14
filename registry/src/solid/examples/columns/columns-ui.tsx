import type { Editor } from 'prosekit/core'
import { useEditorDerivedValue } from 'prosekit/solid'
import { ColumnsPopoverPopup, ColumnsPopoverPositioner, ColumnsPopoverRoot } from 'prosekit/solid/columns-popover'
import type { JSX } from 'solid-js'

import Button from '../../ui/button/button.tsx'

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

export default function ColumnsUi(): JSX.Element {
  const items = useEditorDerivedValue(getColumnMenuItems)

  return (
    <ColumnsPopoverRoot>
      <ColumnsPopoverPositioner class="CSS_INLINE_MENU_POSITIONER">
        <ColumnsPopoverPopup class="CSS_INLINE_MENU_MAIN_POPUP">
          <Button
            pressed={false}
            disabled={!items().addBefore.canExec}
            onClick={items().addBefore.command}
            tooltip="Add column before"
          >
            <div class="CSS_ICON_ARROW_LEFT"></div>
          </Button>
          <Button
            pressed={false}
            disabled={!items().addAfter.canExec}
            onClick={items().addAfter.command}
            tooltip="Add column after"
          >
            <div class="CSS_ICON_PLUS"></div>
          </Button>
          <Button
            pressed={false}
            disabled={!items().distribute.canExec}
            onClick={items().distribute.command}
            tooltip="Equalize columns"
          >
            <span class="text-sm leading-none">=</span>
          </Button>
          <Button
            pressed={false}
            disabled={!items().remove.canExec}
            onClick={items().remove.command}
            tooltip="Remove column"
          >
            <div class="CSS_ICON_MINUS"></div>
          </Button>
        </ColumnsPopoverPopup>
      </ColumnsPopoverPositioner>
    </ColumnsPopoverRoot>
  )
}
