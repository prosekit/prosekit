import { defineBaseKeymap } from 'prosekit/core'

import { defineDoc } from 'prosekit/extensions/doc'
import { defineParagraph } from 'prosekit/extensions/paragraph'
import { defineText } from 'prosekit/extensions/text'

import { union } from 'prosekit/core'
import { defineDropCursor } from 'prosekit/extensions/drop-cursor'
import { defineImage } from 'prosekit/extensions/image'

export function defineExtension() {
  return union(
    defineBaseKeymap(),
    defineDoc_DEBUG2(),
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
