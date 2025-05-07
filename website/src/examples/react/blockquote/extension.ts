import { defineBaseKeymap } from 'prosekit/core'

import { defineDoc } from 'prosekit/extensions/doc'
import { defineParagraph } from 'prosekit/extensions/paragraph'
import { defineText } from 'prosekit/extensions/text'

import { union } from 'prosekit/core'
import { defineBlockquote } from 'prosekit/extensions/blockquote'

export function defineExtension() {
  return union(
    defineBaseKeymap(),
    defineDoc_DEBUG2(),
    defineText(),
    defineParagraph(),
    defineBlockquote(),
  )
}

export type EditorExtension = ReturnType<typeof defineExtension>
