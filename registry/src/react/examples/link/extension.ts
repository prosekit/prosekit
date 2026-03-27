import { defineBaseKeymap, union } from 'prosekit/core'
import { defineDoc } from 'prosekit/extensions/doc'
import { defineLink } from 'prosekit/extensions/link'
import { defineParagraph } from 'prosekit/extensions/paragraph'
import { defineText } from 'prosekit/extensions/text'

export function defineExtension() {
  return union(
    defineBaseKeymap(),
    defineDoc(),
    defineText(),
    defineParagraph(),
    defineLink(),
  )
}

export type EditorExtension = ReturnType<typeof defineExtension>
