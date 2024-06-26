import {
  type MarkBuilder,
  type NodeBuilder,
  defineBaseCommands,
  defineBaseKeymap,
  defineDoc,
  defineHistory,
  defineParagraph,
  defineText,
  union,
  type Extension,
  type ExtractMarks,
  type ExtractNodes,
} from '@prosekit/core'
import { createTestEditor, type TestEditor } from '@prosekit/core/test'

import { defineBlockquote } from '../blockquote'
import { defineBold } from '../bold'
import { defineCode } from '../code'
import { defineHeading } from '../heading'
import { defineImage } from '../image'
import { defineItalic } from '../italic'
import { defineLink } from '../link'
import { defineList } from '../list'
import { defineStrike } from '../strike'
import { defineTable } from '../table'
import { defineUnderline } from '../underline'

/**
 * @internal
 */
export function defineTestExtension() {
  return union([
    defineDoc(),
    defineText(),
    defineHeading(),
    defineHistory(),
    defineList(),
    defineBlockquote(),
    defineBaseKeymap(),
    defineBaseCommands(),
    defineItalic(),
    defineBold(),
    defineUnderline(),
    defineStrike(),
    defineCode(),
    defineLink(),
    defineImage(),
    defineParagraph(),
    defineTable(),
  ])
}

/**
 * @internal
 */
export function setupTest<E extends Extension>(
  extension: E,
): {
  editor: TestEditor<E>
  n: Record<ExtractNodes<E>, NodeBuilder>
  m: Record<ExtractMarks<E>, MarkBuilder>
} {
  const editor = createTestEditor({ extension })

  const div = document.body.appendChild(document.createElement('div'))
  div.style.minWidth = '200px'
  div.style.minHeight = '200px'
  editor.mount(div)
  editor.view.dom.focus()

  const n = editor.nodes
  const m = editor.marks
  return { editor, n, m }
}

/**
 * @internal
 */
export function setupDefaultTest() {
  return setupTest(defineTestExtension())
}
