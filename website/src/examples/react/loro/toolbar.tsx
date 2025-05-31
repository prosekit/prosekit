import type { Editor } from 'prosekit/core'
import { useEditorDerivedValue } from 'prosekit/react'

import Button from './button'
import type { EditorExtension } from './extension'

function getToolbarItems(editor: Editor<EditorExtension>) {
  return {
    undo: {
      isActive: false,
      canExec: editor.commands.undo.canExec(),
      command: editor.commands.undo,
    },
    redo: {
      isActive: false,
      canExec: editor.commands.redo.canExec(),
      command: editor.commands.redo,
    },
    bold: {
      isActive: editor.marks.bold.isActive(),
      canExec: editor.commands.toggleBold.canExec(),
      command: editor.commands.toggleBold,
    },
    italic: {
      isActive: editor.marks.italic.isActive(),
      canExec: editor.commands.toggleItalic.canExec(),
      command: editor.commands.toggleItalic,
    },
    heading1: {
      isActive: editor.nodes.heading.isActive({ level: 1 }),
      canExec: editor.commands.toggleHeading.canExec({ level: 1 }),
      command: () => editor.commands.toggleHeading({ level: 1 }),
    },
    heading2: {
      isActive: editor.nodes.heading.isActive({ level: 2 }),
      canExec: editor.commands.toggleHeading.canExec({ level: 2 }),
      command: () => editor.commands.toggleHeading({ level: 2 }),
    },
    heading3: {
      isActive: editor.nodes.heading.isActive({ level: 3 }),
      canExec: editor.commands.toggleHeading.canExec({ level: 3 }),
      command: () => editor.commands.toggleHeading({ level: 3 }),
    },
  }
}

export default function Toolbar() {
  const items = useEditorDerivedValue(getToolbarItems)

  return (
    <div className="CSS_TOOLBAR">
      <Button
        pressed={items.undo.isActive}
        disabled={!items.undo.canExec}
        onClick={items.undo.command}
        tooltip="Undo"
      >
        <div className="CSS_ICON_UNDO" />
      </Button>

      <Button
        pressed={items.redo.isActive}
        disabled={!items.redo.canExec}
        onClick={items.redo.command}
        tooltip="Redo"
      >
        <div className="CSS_ICON_REDO" />
      </Button>

      <Button
        pressed={items.bold.isActive}
        disabled={!items.bold.canExec}
        onClick={items.bold.command}
        tooltip="Bold"
      >
        <div className="CSS_ICON_BOLD" />
      </Button>

      <Button
        pressed={items.italic.isActive}
        disabled={!items.italic.canExec}
        onClick={items.italic.command}
        tooltip="Italic"
      >
        <div className="CSS_ICON_ITALIC" />
      </Button>

      <Button
        pressed={items.heading1.isActive}
        disabled={!items.heading1.canExec}
        onClick={items.heading1.command}
        tooltip="Heading 1"
      >
        <div className="CSS_ICON_H1" />
      </Button>

      <Button
        pressed={items.heading2.isActive}
        disabled={!items.heading2.canExec}
        onClick={items.heading2.command}
        tooltip="Heading 2"
      >
        <div className="CSS_ICON_H2" />
      </Button>

      <Button
        pressed={items.heading3.isActive}
        disabled={!items.heading3.canExec}
        onClick={items.heading3.command}
        tooltip="Heading 3"
      >
        <div className="CSS_ICON_H3" />
      </Button>
    </div>
  )
}
