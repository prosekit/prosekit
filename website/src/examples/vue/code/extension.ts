import { defineBaseKeymap } from 'prosekit/core'

import { defineDoc } from 'prosekit/extensions/doc'
import { defineParagraph } from 'prosekit/extensions/paragraph'
import { defineText } from 'prosekit/extensions/text'

import { union } from 'prosekit/core'
import { defineCode } from 'prosekit/extensions/code'

export function defineExtension() {
  return union(
    defineBaseKeymap(),
    defineDoc_DEBUG2(),
    defineText(),
    defineParagraph(),
    defineCode(),
  )
}

export type EditorExtension = ReturnType<typeof defineExtension>
