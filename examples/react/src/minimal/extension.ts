import 'prosekit/basic/style.css'

import { addBasicExtension } from 'prosekit/basic'

export function addNoteExtension() {
  return addBasicExtension()
}

export type NoteExtension = ReturnType<typeof addNoteExtension>
