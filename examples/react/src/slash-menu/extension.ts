import 'prosekit/basic/style.css'
import 'prosekit/extensions/placeholder/style.css'

import { addBasicExtension } from 'prosekit/basic'
import { defineExtension } from 'prosekit/core'
import { addPlaceholder } from 'prosekit/extensions/placeholder'

export function addNoteExtension() {
  return defineExtension([
    addBasicExtension(),
    addPlaceholder({ placeholder: 'Press / for commands...' }),
  ])
}

export type NoteExtension = ReturnType<typeof addNoteExtension>
