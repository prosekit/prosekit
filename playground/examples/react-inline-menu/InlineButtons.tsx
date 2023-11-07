import { useEditor } from 'prosekit/react'

import type { EditorExtension } from './extension'

export default function InlineButtons() {
  const editor = useEditor<EditorExtension>({ update: true })

  return (
    <>
      <button
        data-state={editor.marks.bold.isActive() ? 'on' : 'off'}
        onClick={() => editor.commands.toggleBold()}
        onMouseDown={(event) => event.preventDefault()}
        className="TOGGLE_BUTTON"
      >
        Bold
      </button>
      <button
        data-state={editor.marks.italic.isActive() ? 'on' : 'off'}
        onClick={() => editor.commands.toggleItalic()}
        onMouseDown={(event) => event.preventDefault()}
        className="TOGGLE_BUTTON"
      >
        Italic
      </button>
      <button
        data-state={editor.marks.underline.isActive() ? 'on' : 'off'}
        onClick={() => editor.commands.toggleUnderline()}
        onMouseDown={(event) => event.preventDefault()}
        className="TOGGLE_BUTTON"
      >
        Underline
      </button>
    </>
  )
}
