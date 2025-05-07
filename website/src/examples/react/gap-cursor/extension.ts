import { defineBaseKeymap } from 'prosekit/core'

import {
  defineDoc,
  defineDoc,
} from 'prosekit/extensions/doc'
import { defineParagraph } from 'prosekit/extensions/paragraph'
import { defineText } from 'prosekit/extensions/text'

import { union } from 'prosekit/core'
import { defineGapCursor } from 'prosekit/extensions/gap-cursor'
import { defineImage } from 'prosekit/extensions/image'

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
