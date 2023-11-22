import { useEditor } from 'prosekit/react'

import type { EditorExtension } from './extension'
import Toggle from './toggle'

export default function ButtonGroup() {
  const editor = useEditor<EditorExtension>({ update: true })

  return (
    <>
      <Toggle
        active={editor.marks.bold.isActive()}
        available={editor.commands.toggleBold.canApply()}
        onChange={() => editor.commands.toggleBold()}
      >
        Bold
      </Toggle>
      <Toggle
        active={editor.marks.italic.isActive()}
        available={editor.commands.toggleItalic.canApply()}
        onChange={() => editor.commands.toggleItalic()}
      >
        Italic
      </Toggle>
      <Toggle
        active={editor.marks.underline.isActive()}
        available={editor.commands.toggleUnderline.canApply()}
        onChange={() => editor.commands.toggleUnderline()}
      >
        Underline
      </Toggle>
    </>
  )
}
