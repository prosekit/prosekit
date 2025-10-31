import type { Editor } from 'prosekit/core'
import { useEditorDerivedValue } from 'prosekit/react'

import Button from './button'
import type { EditorExtension } from './extension'

function isTextAlignActive(editor: Editor<EditorExtension>, value: string) {
  return Object.values(editor.nodes).some((node) => {
    // @ts-expect-error - textAlign attribute may not exist on all node types
    return node.isActive({ textAlign: value })
  })
}

function getToolbarItems(editor: Editor<EditorExtension>) {
  return {
    left: {
      isActive: isTextAlignActive(editor, 'left'),
      canExec: editor.commands.setTextAlign.canExec('left'),
      command: () => editor.commands.setTextAlign('left'),
    },
    center: {
      isActive: isTextAlignActive(editor, 'center'),
      canExec: editor.commands.setTextAlign.canExec('center'),
      command: () => editor.commands.setTextAlign('center'),
    },
    right: {
      isActive: isTextAlignActive(editor, 'right'),
      canExec: editor.commands.setTextAlign.canExec('right'),
      command: () => editor.commands.setTextAlign('right'),
    },
    justify: {
      isActive: isTextAlignActive(editor, 'justify'),
      canExec: editor.commands.setTextAlign.canExec('justify'),
      command: () => editor.commands.setTextAlign('justify'),
    },
  }
}

export default function Toolbar() {
  const items = useEditorDerivedValue(getToolbarItems)

  return (
    <div className="CSS_TOOLBAR">
      <Button
        pressed={items.left.isActive}
        disabled={!items.left.canExec}
        onClick={items.left.command}
        tooltip="Left"
      >
        Left
      </Button>

      <Button
        pressed={items.center.isActive}
        disabled={!items.center.canExec}
        onClick={items.center.command}
        tooltip="Center"
      >
        Center
      </Button>

      <Button
        pressed={items.right.isActive}
        disabled={!items.right.canExec}
        onClick={items.right.command}
        tooltip="Right"
      >
        Right
      </Button>

      <Button
        pressed={items.justify.isActive}
        disabled={!items.justify.canExec}
        onClick={items.justify.command}
        tooltip="Justify"
      >
        Justify
      </Button>
    </div>
  )
}
