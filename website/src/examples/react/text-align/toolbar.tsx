import type { Editor } from 'prosekit/core'
import { useEditorDerivedValue } from 'prosekit/react'

import Button from './button'
import type { EditorExtension } from './extension'

const headingLevels = [1, 2, 3, 4, 5, 6] as const

function getToolbarItems(editor: Editor<EditorExtension>) {
  const isTextAlignActive = (value: 'left' | 'center' | 'right' | 'justify') => {
    const paragraphActive = editor.nodes.paragraph?.isActive({ textAlign: value }) ?? false
    const headingActive = headingLevels.some((level) => {
      return editor.nodes.heading?.isActive({ level, textAlign: value }) ?? false
    })
    return paragraphActive || headingActive
  }

  return {
    left: {
      isActive: isTextAlignActive('left'),
      canExec: editor.commands.setTextAlign.canExec('left'),
      command: () => editor.commands.setTextAlign('left'),
    },
    center: {
      isActive: isTextAlignActive('center'),
      canExec: editor.commands.setTextAlign.canExec('center'),
      command: () => editor.commands.setTextAlign('center'),
    },
    right: {
      isActive: isTextAlignActive('right'),
      canExec: editor.commands.setTextAlign.canExec('right'),
      command: () => editor.commands.setTextAlign('right'),
    },
    justify: {
      isActive: isTextAlignActive('justify'),
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
        tooltip="Align Left"
      >
        Left
      </Button>

      <Button
        pressed={items.center.isActive}
        disabled={!items.center.canExec}
        onClick={items.center.command}
        tooltip="Align Center"
      >
        Center
      </Button>

      <Button
        pressed={items.right.isActive}
        disabled={!items.right.canExec}
        onClick={items.right.command}
        tooltip="Align Right"
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
