import { useEditor } from 'prosekit/react'

import Button from './button'
import type { EditorExtension } from './extension'

export default function Toolbar() {
  const editor = useEditor<EditorExtension>({ update: true })

  return (
    <div className="CSS_TOOLBAR">
      <Button
        pressed={false}
        disabled={!editor.commands.undo.canExec()}
        onClick={editor.commands.undo}
        tooltip="Undo"
      >
        <div className="CSS_ICON_UNDO" />
      </Button>

      <Button
        pressed={false}
        disabled={!editor.commands.redo.canExec()}
        onClick={editor.commands.redo}
        tooltip="Redo"
      >
        <div className="CSS_ICON_REDO" />
      </Button>

      <Button
        pressed={editor.marks.bold.isActive()}
        disabled={!editor.commands.toggleBold.canExec()}
        onClick={editor.commands.toggleBold}
        tooltip="Bold"
      >
        <div className="CSS_ICON_BOLD" />
      </Button>

      <Button
        pressed={editor.marks.italic.isActive()}
        disabled={!editor.commands.toggleItalic.canExec()}
        onClick={editor.commands.toggleItalic}
        tooltip="Italic"
      >
        <div className="CSS_ICON_ITALIC" />
      </Button>

      <Button
        pressed={editor.nodes.heading.isActive({ level: 1 })}
        disabled={!editor.commands.toggleHeading.canExec({ level: 1 })}
        onClick={() => editor.commands.toggleHeading({ level: 1 })}
        tooltip="Heading 1"
      >
        <div className="CSS_ICON_H1" />
      </Button>

      <Button
        pressed={editor.nodes.heading.isActive({ level: 2 })}
        disabled={!editor.commands.toggleHeading.canExec({ level: 2 })}
        onClick={() => editor.commands.toggleHeading({ level: 2 })}
        tooltip="Heading 2"
      >
        <div className="CSS_ICON_H2" />
      </Button>

      <Button
        pressed={editor.nodes.heading.isActive({ level: 3 })}
        disabled={!editor.commands.toggleHeading.canExec({ level: 3 })}
        onClick={() => editor.commands.toggleHeading({ level: 3 })}
        tooltip="Heading 3"
      >
        <div className="CSS_ICON_H3" />
      </Button>
    </div>
  )
}
