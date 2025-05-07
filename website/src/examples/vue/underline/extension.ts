import { defineBaseKeymap } from 'prosekit/core'

import { defineDoc } from 'prosekit/extensions/doc'
import { defineParagraph } from 'prosekit/extensions/paragraph'
import { defineText } from 'prosekit/extensions/text'

import { union } from 'prosekit/core'
import { defineUnderline } from 'prosekit/extensions/underline'

export function defineExtension() {
  return union(
    defineBaseKeymap(),
    defineDoc_DEBUG2(),
    defineText(),
    defineParagraph(),
    defineUnderline(),
  )
}

export type EditorExtension = ReturnType<typeof defineExtension>
