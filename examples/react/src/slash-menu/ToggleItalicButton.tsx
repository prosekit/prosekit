import { MouseEvent } from 'react'

import { useNoteEditor } from './use-note-editor'

export default function ToggleItalicButton() {
  const editor = useNoteEditor()

  const onToggleItalic = (event: MouseEvent) => {
    event.preventDefault()
    editor.commands.toggleItalic()
  }

  return <button onMouseDown={onToggleItalic}>Toggle italic</button>
}
