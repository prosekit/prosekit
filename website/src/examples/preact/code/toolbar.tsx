import type { Editor } from 'prosekit/core'
import { useEditorDerivedValue } from 'prosekit/preact'

import Button from './button'
import type { EditorExtension } from './extension'

function getToolbarItems(editor: Editor<EditorExtension>) {
  return {
    code: {
      isActive: editor.marks.code.isActive(),
      canExec: editor.commands.toggleCode.canExec(),
      command: () => editor.commands.toggleCode(),
    },
  }
}

export default function Toolbar() {
  const items = useEditorDerivedValue(getToolbarItems)

  return (
    <div class="CSS_TOOLBAR">
      <Button
        pressed={items.code.isActive}
        disabled={!items.code.canExec}
        onClick={items.code.command}
        tooltip="Code"
      >
        <div class="CSS_ICON_CODE"></div>
      </Button>
    </div>
  )
}
