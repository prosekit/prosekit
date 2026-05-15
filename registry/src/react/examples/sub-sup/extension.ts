import { defineBaseKeymap, union } from 'prosekit/core'
import { defineDoc } from 'prosekit/extensions/doc'
import { defineParagraph } from 'prosekit/extensions/paragraph'
import { defineSubSup } from 'prosekit/extensions/sub-sup'
import { defineText } from 'prosekit/extensions/text'

export function defineExtension() {
  return union(
    defineBaseKeymap(),
    defineDoc(),
    defineText(),
    defineParagraph(),
    defineSubSup(),
  )
}

export type EditorExtension = ReturnType<typeof defineExtension>
