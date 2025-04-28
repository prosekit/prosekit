import { useEditor } from 'prosekit/react'

import Button from './button'
import type { EditorExtension } from './extension'
import { ImageUploadPopover } from './image-upload-popover'

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
        pressed={editor.marks.underline.isActive()}
        disabled={!editor.commands.toggleUnderline.canExec()}
        onClick={editor.commands.toggleUnderline}
        tooltip="Underline"
      >
        <div className="CSS_ICON_UNDERLINE" />
      </Button>

      <Button
        pressed={editor.marks.strike.isActive()}
        disabled={!editor.commands.toggleStrike.canExec()}
        onClick={editor.commands.toggleStrike}
        tooltip="Strike"
      >
        <div className="CSS_ICON_STRIKE" />
      </Button>

      <Button
        pressed={editor.marks.code.isActive()}
        disabled={!editor.commands.toggleCode.canExec()}
        onClick={editor.commands.toggleCode}
        tooltip="Code"
      >
        <div className="CSS_ICON_CODE" />
      </Button>

      <Button
        pressed={editor.nodes.codeBlock.isActive()}
        disabled={!editor.commands.insertCodeBlock.canExec({ language: 'javascript' })}
        onClick={() => editor.commands.insertCodeBlock({ language: 'javascript' })}
        tooltip="Code Block"
      >
        <div className="CSS_ICON_CODE_BLOCK" />
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

      <Button
        pressed={editor.nodes.horizontalRule.isActive()}
        disabled={!editor.commands.insertHorizontalRule.canExec()}
        onClick={() => editor.commands.insertHorizontalRule()}
        tooltip="Divider"
      >
        <div className="CSS_ICON_MINUS"></div>
      </Button>

      <Button
        pressed={editor.nodes.list.isActive({ kind: 'bullet' })}
        disabled={!editor.commands.toggleList.canExec({ kind: 'bullet' })}
        onClick={() => editor.commands.toggleList({ kind: 'bullet' })}
        tooltip="Bullet List"
      >
        <div className="CSS_ICON_LIST_BULLET" />
      </Button>

      <Button
        pressed={editor.nodes.list.isActive({ kind: 'ordered' })}
        disabled={!editor.commands.toggleList.canExec({ kind: 'ordered' })}
        onClick={() => editor.commands.toggleList({ kind: 'ordered' })}
        tooltip="Ordered List"
      >
        <div className="CSS_ICON_LIST_ORDERED" />
      </Button>

      <Button
        pressed={editor.nodes.list.isActive({ kind: 'task' })}
        disabled={!editor.commands.toggleList.canExec({ kind: 'task' })}
        onClick={() => editor.commands.toggleList({ kind: 'task' })}
        tooltip="Task List"
      >
        <div className="CSS_ICON_LIST_TASK" />
      </Button>

      <Button
        pressed={editor.nodes.list.isActive({ kind: 'toggle' })}
        disabled={!editor.commands.toggleList.canExec({ kind: 'toggle' })}
        onClick={() => editor.commands.toggleList({ kind: 'toggle' })}
        tooltip="Toggle List"
      >
        <div className="CSS_ICON_LIST_TOGGLE" />
      </Button>

      <Button
        pressed={false}
        disabled={!editor.commands.indentList.canExec()}
        tooltip="Increase indentation"
        onClick={() => editor.commands.indentList()}
      >
        <div className="CSS_ICON_LIST_INDENT" />
      </Button>

      <Button
        pressed={false}
        disabled={!editor.commands.dedentList.canExec()}
        tooltip="Decrease indentation"
        onClick={() => editor.commands.dedentList()}
      >
        <div className="CSS_ICON_LIST_DEDENT" />
      </Button>

      <ImageUploadPopover
        disabled={!editor.commands.insertImage.canExec()}
        tooltip="Insert Image"
      >
        <div className="CSS_ICON_IMAGE" />
      </ImageUploadPopover>
    </div>
  )
}
