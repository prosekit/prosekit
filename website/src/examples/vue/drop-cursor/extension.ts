import { defineBaseKeymap } from 'prosekit/core'
import { union } from 'prosekit/core'
import { defineDoc } from 'prosekit/extensions/doc'
import { defineDropCursor } from 'prosekit/extensions/drop-cursor'
import { defineImage } from 'prosekit/extensions/image'
import { defineParagraph } from 'prosekit/extensions/paragraph'
import { defineText } from 'prosekit/extensions/text'

export function defineExtension() {
  return union(
    defineBaseKeymap(),
    defineDoc(),
    defineText(),
    defineParagraph(),
    defineImage(),
    defineDropCursor({
      color: false,
      width: 4,
      class: 'CSS_DROP_CURSOR',
    }),
  )
}

export type EditorExtension = ReturnType<typeof defineExtension>
