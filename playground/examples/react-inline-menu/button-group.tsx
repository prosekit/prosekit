import { useEditor } from 'prosekit/react'

import type { EditorExtension } from './extension'
import Toggle from './toggle'

export default function ButtonGroup() {
  const editor = useEditor<EditorExtension>({ update: true })

  return (
    <>
      <Toggle
        pressed={editor.marks.bold.isActive()}
        disabled={!editor.commands.toggleBold.canApply()}
        onClick={() => editor.commands.toggleBold()}
      >
        Bold
      </Toggle>
      <Toggle
        pressed={editor.marks.italic.isActive()}
        disabled={!editor.commands.toggleItalic.canApply()}
        onClick={() => editor.commands.toggleItalic()}
      >
        Italic
      </Toggle>
      <Toggle
        pressed={editor.marks.underline.isActive()}
        disabled={!editor.commands.toggleUnderline.canApply()}
        onClick={() => editor.commands.toggleUnderline()}
      >
        Underline
      </Toggle>
    </>
  )
}
