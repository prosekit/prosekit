import { useEditor } from 'prosekit/react'

import type { EditorExtension } from './extension'
import { ImageUploadPopover } from './image-upload-popover'
import Toggle from './toggle'

export default function Toolbar() {
  const editor = useEditor<EditorExtension>({ update: true })

  return (
    <div className="TOOLBAR">
      <Toggle
        pressed={false}
        disabled={!editor.commands.undo.canApply()}
        onClick={editor.commands.undo}
      >
        <div className="ICON_UNDO" />
      </Toggle>

      <Toggle
        pressed={false}
        disabled={!editor.commands.redo.canApply()}
        onClick={editor.commands.redo}
      >
        <div className="ICON_REDO" />
      </Toggle>

      <Toggle
        pressed={editor.marks.bold.isActive()}
        disabled={!editor.commands.toggleBold.canApply()}
        onClick={editor.commands.toggleBold}
      >
        <div className="ICON_BOLD" />
      </Toggle>

      <Toggle
        pressed={editor.marks.italic.isActive()}
        disabled={!editor.commands.toggleItalic.canApply()}
        onClick={editor.commands.toggleItalic}
      >
        <div className="ICON_ITALIC" />
      </Toggle>

      <Toggle
        pressed={editor.nodes.heading.isActive({ level: 1 })}
        disabled={!editor.commands.toggleHeading.canApply({ level: 1 })}
        onClick={() => editor.commands.toggleHeading({ level: 1 })}
      >
        <div className="ICON_H1" />
      </Toggle>

      <Toggle
        pressed={editor.nodes.heading.isActive({ level: 2 })}
        disabled={!editor.commands.toggleHeading.canApply({ level: 2 })}
        onClick={() => editor.commands.toggleHeading({ level: 2 })}
      >
        <div className="ICON_H2" />
      </Toggle>

      <Toggle
        pressed={editor.nodes.heading.isActive({ level: 3 })}
        disabled={!editor.commands.toggleHeading.canApply({ level: 3 })}
        onClick={() => editor.commands.toggleHeading({ level: 3 })}
      >
        <div className="ICON_H3" />
      </Toggle>

      <ImageUploadPopover>
        <div className="ICON_IMAGE" />
      </ImageUploadPopover>
    </div>
  )
}
