import type { Editor } from 'prosekit/core'
import { useEditorDerivedValue } from 'prosekit/react'

import Button from './button'
import type { EditorExtension } from './extension'

function getToolbarItem(editor: Editor<EditorExtension>) {
  return {
    isActive: editor.nodes.horizontalRule.isActive(),
    canExec: editor.commands.insertHorizontalRule.canExec(),
    command: () => editor.commands.insertHorizontalRule(),
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
        tooltip="Divider"
      >
        <div className="CSS_ICON_MINUS"></div>
      </Button>
    </div>
  )
}
