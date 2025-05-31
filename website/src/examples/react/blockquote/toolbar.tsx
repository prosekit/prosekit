import type { Editor } from 'prosekit/core'
import { useEditorDerivedValue } from 'prosekit/react'

import Button from './button'
import type { EditorExtension } from './extension'

function getToolbarItem(editor: Editor<EditorExtension>) {
  return {
    isActive: editor.nodes.blockquote.isActive(),
    canExec: editor.commands.toggleBlockquote.canExec(),
    command: () => editor.commands.setBlockquote(),
  }
}

export default function Toolbar() {
  const item = useEditorDerivedValue(getToolbarItem)

  return (
    <div className="CSS_TOOLBAR">
      <Button
        pressed={item.isActive}
        disabled={!item.canExec}
        onClick={item.command}
        tooltip="Blockquote"
      >
        <div className="CSS_ICON_BLOCKQUOTE" />
      </Button>
    </div>
  )
}
