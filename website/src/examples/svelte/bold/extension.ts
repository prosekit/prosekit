import { defineBaseKeymap } from 'prosekit/core'

import { defineDoc } from 'prosekit/extensions/doc'
import { defineParagraph } from 'prosekit/extensions/paragraph'
import { defineText } from 'prosekit/extensions/text'

import { union } from 'prosekit/core'
import { defineBold } from 'prosekit/extensions/bold'

export function defineExtension() {
  return union(
    defineBaseKeymap(),
    defineDoc_DEBUG2(),
    defineText(),
    defineParagraph(),
    defineBold(),
  )
}

export type EditorExtension = ReturnType<typeof defineExtension>
