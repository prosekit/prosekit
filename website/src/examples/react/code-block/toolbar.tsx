import type { Editor } from 'prosekit/core'
import { useEditorDerivedValue } from 'prosekit/react'

import Button from './button'
import type { EditorExtension } from './extension'

function getToolbarItems(editor: Editor<EditorExtension>) {
  return {
    codeBlock: {
      isActive: editor.nodes.codeBlock.isActive(),
      canExec: editor.commands.setCodeBlock.canExec(),
      command: () => editor.commands.setCodeBlock(),
    },
  }
}

export default function Toolbar() {
  const items = useEditorDerivedValue(getToolbarItems)

  return (
    <div className="CSS_TOOLBAR">
      <Button
        pressed={items.codeBlock.isActive}
        disabled={!items.codeBlock.canExec}
        onClick={items.codeBlock.command}
      >
        <div className="CSS_ICON_CODE_BLOCK" />
      </Button>
    </div>
  )
}
