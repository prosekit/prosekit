import { useEditor } from 'prosekit/react'
import { useState } from 'react'

import type { EditorExtension } from './extension'
import { ImageUploadPopover } from './image-upload-popover'
import Toggle from './toggle'

export default function Toolbar() {
  const editor = useEditor<EditorExtension>({ update: true })

  const [imagePopoverOpen, setImagePopoverOpen] = useState(false)
  const closeImagePopover = () => {
    setImagePopoverOpen(false)
  }
  const toggleImagePopover = () => {
    setImagePopoverOpen((value) => !value)
  }

  return (
    <div className="TOOLBAR">
      <Toggle
        available={editor.commands.undo.canApply()}
        onChange={editor.commands.undo}
      >
        <div className="ICON_UNDO" />
      </Toggle>

      <Toggle
        available={editor.commands.redo.canApply()}
        onChange={editor.commands.redo}
      >
        <div className="ICON_REDO" />
      </Toggle>

      <Toggle
        active={editor.marks.bold.isActive()}
        available={editor.commands.toggleBold.canApply()}
        onChange={editor.commands.toggleBold}
      >
        <div className="ICON_BOLD" />
      </Toggle>

      <Toggle
        active={editor.marks.italic.isActive()}
        available={editor.commands.toggleItalic.canApply()}
        onChange={editor.commands.toggleItalic}
      >
        <div className="ICON_ITALIC" />
      </Toggle>

      <Toggle
        active={editor.nodes.heading.isActive({ level: 1 })}
        available={editor.commands.toggleHeading.canApply({ level: 1 })}
        onChange={() => editor.commands.toggleHeading({ level: 1 })}
      >
        <div className="ICON_H1" />
      </Toggle>

      <Toggle
        active={editor.nodes.heading.isActive({ level: 2 })}
        available={editor.commands.toggleHeading.canApply({ level: 2 })}
        onChange={() => editor.commands.toggleHeading({ level: 2 })}
      >
        <div className="ICON_H2" />
      </Toggle>

      <Toggle
        active={editor.nodes.heading.isActive({ level: 3 })}
        available={editor.commands.toggleHeading.canApply({ level: 3 })}
        onChange={() => editor.commands.toggleHeading({ level: 3 })}
      >
        <div className="ICON_H3" />
      </Toggle>

      <ImageUploadPopover open={imagePopoverOpen} onClose={closeImagePopover}>
        <Toggle
          active={false}
          available={editor.commands.insertImage.canApply()}
          onChange={toggleImagePopover}
        >
          <div className="ICON_IMAGE" />
        </Toggle>
      </ImageUploadPopover>
    </div>
  )
}
