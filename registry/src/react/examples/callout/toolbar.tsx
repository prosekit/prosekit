'use client'

import type { EditorExtension } from './extension.ts'
import type { Editor } from 'prosekit/core'
import { useEditorDerivedValue } from 'prosekit/react'

import { Button } from '../../ui/button/index.ts'

function getToolbarItems(editor: Editor<EditorExtension>) {
  return {
    callout: editor.commands.toggleCallout
      ? {
        isActive: editor.nodes.callout.isActive(),
        canExec: editor.commands.toggleCallout.canExec(),
        command: () => editor.commands.toggleCallout(),
      }
      : undefined,
  }
}

export default function CalloutToolbar() {
  const items = useEditorDerivedValue(getToolbarItems)

  return (
    <div className="CSS_TOOLBAR">
      {items.callout && (
        <Button
          pressed={items.callout.isActive}
          disabled={!items.callout.canExec}
          onClick={items.callout.command}
          tooltip="Callout"
        >
          <div className="CSS_ICON_CALLOUT" />
        </Button>
      )}
    </div>
  )
}
