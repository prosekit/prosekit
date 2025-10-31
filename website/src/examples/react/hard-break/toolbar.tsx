import type { Editor } from 'prosekit/core'
import { useEditorDerivedValue } from 'prosekit/react'

import Button from './button'
import type { EditorExtension } from './extension'

function getToolbarItems(editor: Editor<EditorExtension>) {
  return {
    hardBreak: {
      isActive: false,
      canExec: editor.commands.insertHardBreak.canExec(),
      command: () => editor.commands.insertHardBreak(),
    },
  }
}

export default function Toolbar() {
  const items = useEditorDerivedValue(getToolbarItems)

  return (
    <div className="CSS_TOOLBAR">
      <Button
        pressed={items.hardBreak.isActive}
        disabled={!items.hardBreak.canExec}
        onClick={items.hardBreak.command}
        tooltip="Insert Hard Break"
      >
        Hard Break
      </Button>
    </div>
  )
}
