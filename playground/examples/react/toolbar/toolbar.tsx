import { Themes } from '@prosekit/themes'
import { useEditor } from 'prosekit/react'

import Button from './button'
import type { EditorExtension } from './extension'
import { ImageUploadPopover } from './image-upload-popover'

export default function Toolbar() {
  const editor = useEditor<EditorExtension>({ update: true })

  return (
    <div className={Themes.TOOLBAR}>
      <Button
        pressed={false}
        disabled={!editor.commands.undo.canApply()}
        onClick={editor.commands.undo}
        tooltip="Undo"
      >
        <div className={Themes.ICON_UNDO} />
      </Button>

      <Button
        pressed={false}
        disabled={!editor.commands.redo.canApply()}
        onClick={editor.commands.redo}
        tooltip="Redo"
      >
        <div className={Themes.ICON_REDO} />
      </Button>

      <Button
        pressed={editor.marks.bold.isActive()}
        disabled={!editor.commands.toggleBold.canApply()}
        onClick={editor.commands.toggleBold}
        tooltip="Bold"
      >
        <div className={Themes.ICON_BOLD} />
      </Button>

      <Button
        pressed={editor.marks.italic.isActive()}
        disabled={!editor.commands.toggleItalic.canApply()}
        onClick={editor.commands.toggleItalic}
        tooltip="Italic"
      >
        <div className={Themes.ICON_ITALIC} />
      </Button>

      <Button
        pressed={editor.nodes.heading.isActive({ level: 1 })}
        disabled={!editor.commands.toggleHeading.canApply({ level: 1 })}
        onClick={() => editor.commands.toggleHeading({ level: 1 })}
        tooltip="Heading 1"
      >
        <div className={Themes.ICON_H1} />
      </Button>

      <Button
        pressed={editor.nodes.heading.isActive({ level: 2 })}
        disabled={!editor.commands.toggleHeading.canApply({ level: 2 })}
        onClick={() => editor.commands.toggleHeading({ level: 2 })}
        tooltip="Heading 2"
      >
        <div className={Themes.ICON_H2} />
      </Button>

      <Button
        pressed={editor.nodes.heading.isActive({ level: 3 })}
        disabled={!editor.commands.toggleHeading.canApply({ level: 3 })}
        onClick={() => editor.commands.toggleHeading({ level: 3 })}
        tooltip="Heading 3"
      >
        <div className={Themes.ICON_H3} />
      </Button>

      <ImageUploadPopover
        disabled={!editor.commands.insertImage.canApply()}
        tooltip="Insert Image"
      >
        <div className={Themes.ICON_IMAGE} />
      </ImageUploadPopover>
    </div>
  )
}
