import { defineBaseKeymap, union } from 'prosekit/core'
import { defineCodeBlock, defineCodeBlockShiki } from 'prosekit/extensions/code-block'
import { defineDoc } from 'prosekit/extensions/doc'
import { defineParagraph } from 'prosekit/extensions/paragraph'
import { defineText } from 'prosekit/extensions/text'

import { defineCodeBlockView } from '../../ui/code-block-view'

export function defineExtension() {
  return union(
    defineBaseKeymap(),
    defineDoc(),
    defineText(),
    defineParagraph(),
    defineCodeBlock(),
    defineCodeBlockShiki(),
    defineCodeBlockView(),
  )
}

export type EditorExtension = ReturnType<typeof defineExtension>
