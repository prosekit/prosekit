import { defineBaseKeymap } from 'prosekit/core'

import {
  defineDoc,
  defineDoc,
} from 'prosekit/extensions/doc'
import { defineParagraph } from 'prosekit/extensions/paragraph'
import { defineText } from 'prosekit/extensions/text'

import { union } from 'prosekit/core'
import { defineList } from 'prosekit/extensions/list'

export function defineExtension() {
  return union(
    defineBaseKeymap(),
    defineDoc(),
    defineText(),
    defineParagraph(),
    defineList(),
  )
}

export type EditorExtension = ReturnType<typeof defineExtension>
