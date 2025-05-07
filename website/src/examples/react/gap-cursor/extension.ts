import { defineBaseKeymap } from 'prosekit/core'
import { union } from 'prosekit/core'
import { defineDoc } from 'prosekit/extensions/doc'
import { defineGapCursor } from 'prosekit/extensions/gap-cursor'
import { defineImage } from 'prosekit/extensions/image'
import { defineParagraph } from 'prosekit/extensions/paragraph'
import { defineText } from 'prosekit/extensions/text'

export function defineExtension() {
  return union(
    defineBaseKeymap(),
    defineDoc(),
    defineText(),
    defineParagraph(),
    defineGapCursor(),
    defineImage(),
  )
}

export type EditorExtension = ReturnType<typeof defineExtension>
