import { defineBaseKeymap } from 'prosekit/core'

import {
  defineDoc,
  defineDoc,
} from 'prosekit/extensions/doc'
import { defineParagraph } from 'prosekit/extensions/paragraph'
import { defineText } from 'prosekit/extensions/text'

import { union } from 'prosekit/core'
import { defineLink } from 'prosekit/extensions/link'

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
