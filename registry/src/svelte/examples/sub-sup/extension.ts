import { defineBaseKeymap, union } from 'prosekit/core'
import { defineDoc } from 'prosekit/extensions/doc'
import { defineParagraph } from 'prosekit/extensions/paragraph'
import { defineSubscript } from 'prosekit/extensions/subscript'
import { defineSuperscript } from 'prosekit/extensions/superscript'
import { defineText } from 'prosekit/extensions/text'

export function defineExtension() {
  return union(
    defineBaseKeymap(),
    defineDoc(),
    defineText(),
    defineParagraph(),
    defineSubscript(),
    defineSuperscript(),
  )
}

export type EditorExtension = ReturnType<typeof defineExtension>
