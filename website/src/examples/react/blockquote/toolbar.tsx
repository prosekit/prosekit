import type { Editor } from 'prosekit/core'
import { useEditorDerivedValue } from 'prosekit/react'

import Button from './button'
import type { EditorExtension } from './extension'

function getToolbarItems(editor: Editor<EditorExtension>) {
  return {
    blockquote: {
      isActive: editor.nodes.blockquote.isActive(),
      canExec: editor.commands.toggleBlockquote.canExec(),
      command: () => editor.commands.setBlockquote(),
    },
  }
}

export default function Toolbar() {
  const items = useEditorDerivedValue(getToolbarItems)

  return (
    <div className="CSS_TOOLBAR">
      <Button
        pressed={items.blockquote.isActive}
        disabled={!items.blockquote.canExec}
        onClick={items.blockquote.command}
        tooltip="Blockquote"
      >
        <div className="CSS_ICON_BLOCKQUOTE" />
      </Button>
    </div>
  )
}
