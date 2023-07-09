import { useEditor } from 'prosekit/react'

import { NoteExtension } from './extension'

export function useNoteEditor() {
  return useEditor<NoteExtension>()
}
