import type { Editor } from 'prosekit/core'
import { useDerivedValue } from 'prosekit/react'
import { useCallback } from 'react'

import Button from './button'
import type { EditorExtension } from './extension'

export default function Toolbar() {
  const item = useDerivedValue(useCallback((editor: Editor<EditorExtension>) => {
    return {
      isActive: editor.nodes.blockquote.isActive(),
      canExec: editor.commands.toggleBlockquote.canExec(),
      command: () => editor.commands.setBlockquote(),
    }
  }, []))

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
