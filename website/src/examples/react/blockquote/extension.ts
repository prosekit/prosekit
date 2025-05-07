import { defineBaseKeymap } from 'prosekit/core'
import { union } from 'prosekit/core'
import { defineBlockquote } from 'prosekit/extensions/blockquote'
import { defineDoc } from 'prosekit/extensions/doc'
import { defineParagraph } from 'prosekit/extensions/paragraph'
import { defineText } from 'prosekit/extensions/text'

export function defineExtension() {
  return union(
    defineBaseKeymap(),
    defineDoc(),
    defineText(),
    defineParagraph(),
    defineBlockquote(),
  )
}

export type EditorExtension = ReturnType<typeof defineExtension>
