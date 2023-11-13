import { useEditor } from 'prosekit/react'

import ToggleButton from './ToggleButton'
import type { EditorExtension } from './extension'

export default function ButtonGroup() {
  const editor = useEditor<EditorExtension>({ update: true })

  return (
    <>
      <ToggleButton
        active={editor.marks.bold.isActive()}
        available={editor.commands.toggleBold.canApply()}
        onChange={() => editor.commands.toggleBold()}
      >
        Bold
      </ToggleButton>
      <ToggleButton
        active={editor.marks.italic.isActive()}
        available={editor.commands.toggleItalic.canApply()}
        onChange={() => editor.commands.toggleItalic()}
      >
        Italic
      </ToggleButton>
      <ToggleButton
        active={editor.marks.underline.isActive()}
        available={editor.commands.toggleUnderline.canApply()}
        onChange={() => editor.commands.toggleUnderline()}
      >
        Underline
      </ToggleButton>
    </>
  )
}
