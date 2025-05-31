import type { Editor } from 'prosekit/core'
import { useEditorDerivedValue } from 'prosekit/react'
import { useCallback } from 'react'

import Button from './button'
import type { EditorExtension } from './extension'

export default function Toolbar() {
  const item = useEditorDerivedValue(useCallback((editor: Editor<EditorExtension>) => {
    return {
      isActive: editor.nodes.codeBlock.isActive(),
      canExec: editor.commands.setCodeBlock.canExec(),
      command: () => editor.commands.setCodeBlock(),
    }
  }, []))

  return (
    <div className="CSS_TOOLBAR">
      <Button
        pressed={item.isActive}
        disabled={!item.canExec}
        onClick={item.command}
      >
        <div className="CSS_ICON_CODE_BLOCK" />
      </Button>
    </div>
  )
}
