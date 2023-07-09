import { useEditor } from 'prosekit/vue'

import { NoteExtension } from './extension'

export function useNoteEditor() {
  return useEditor<NoteExtension>()
}
