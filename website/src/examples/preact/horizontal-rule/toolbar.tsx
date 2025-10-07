import type { Editor } from 'prosekit/core'
import { useEditorDerivedValue } from 'prosekit/preact'

import Button from './button'
import type { EditorExtension } from './extension'

function getToolbarItems(editor: Editor<EditorExtension>) {
  return {
    horizontalRule: {
      isActive: editor.nodes.horizontalRule.isActive(),
      canExec: editor.commands.insertHorizontalRule.canExec(),
      command: () => editor.commands.insertHorizontalRule(),
    },
  }
}

export default function Toolbar() {
  const items = useEditorDerivedValue(getToolbarItems)

  return (
    <div class="CSS_TOOLBAR">
      <Button
        pressed={items.horizontalRule.isActive}
        disabled={!items.horizontalRule.canExec}
        onClick={items.horizontalRule.command}
        tooltip="Divider"
      >
        <div class="CSS_ICON_MINUS"></div>
      </Button>
    </div>
  )
}
