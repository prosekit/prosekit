import type { Editor } from 'prosekit/core'
import { useEditorDerivedValue } from 'prosekit/preact'

import Button from './button'
import type { EditorExtension } from './extension'

function getToolbarItems(editor: Editor<EditorExtension>) {
  return {
    italic: {
      isActive: editor.marks.italic.isActive(),
      canExec: editor.commands.toggleItalic.canExec(),
      command: () => editor.commands.toggleItalic(),
    },
  }
}

export default function Toolbar() {
  const items = useEditorDerivedValue(getToolbarItems)

  return (
    <div class="CSS_TOOLBAR">
      <Button
        pressed={items.italic.isActive}
        disabled={!items.italic.canExec}
        onClick={items.italic.command}
        tooltip="Italic"
      >
        <div class="CSS_ICON_ITALIC"></div>
      </Button>
    </div>
  )
}
