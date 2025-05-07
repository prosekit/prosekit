import { defineBaseKeymap } from 'prosekit/core'
import { union } from 'prosekit/core'
import { defineDoc } from 'prosekit/extensions/doc'
import { defineHeading } from 'prosekit/extensions/heading'
import { defineParagraph } from 'prosekit/extensions/paragraph'
import { defineText } from 'prosekit/extensions/text'

export function defineExtension() {
  return union(
    defineBaseKeymap(),
    defineDoc(),
    defineText(),
    defineParagraph(),
    defineHeading(),
  )
}

export type EditorExtension = ReturnType<typeof defineExtension>
