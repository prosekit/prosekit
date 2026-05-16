'use client'

import type { Editor } from 'prosekit/core'
import { useEditorDerivedValue } from 'prosekit/react'

import { Button } from '../../ui/button'

import type { EditorExtension } from './extension'

function getToolbarItems(editor: Editor<EditorExtension>) {
  return {
    highlight: {
      isActive: editor.marks.highlight.isActive(),
      canExec: editor.commands.toggleHighlight.canExec(),
      command: () => editor.commands.toggleHighlight(),
    },
  }
}

export default function Toolbar() {
  const items = useEditorDerivedValue(getToolbarItems)

  return (
    <div className="CSS_TOOLBAR">
      <Button
        pressed={items.highlight.isActive}
        disabled={!items.highlight.canExec}
        onClick={items.highlight.command}
      >
        Highlight
      </Button>
    </div>
  )
}
