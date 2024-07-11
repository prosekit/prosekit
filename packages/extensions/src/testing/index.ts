import {
  defineBaseCommands,
  defineBaseKeymap,
  defineDoc,
  defineHistory,
  defineParagraph,
  defineText,
  isApple,
  union,
  type Extension,
  type ExtractMarks,
  type ExtractNodes,
  type MarkBuilder,
  type NodeBuilder,
} from '@prosekit/core'
import { createTestEditor, type TestEditor } from '@prosekit/core/test'
import { userEvent } from '@vitest/browser/context'

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
export function setupTestFromExtension<E extends Extension>(
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
export function setupTest() {
  return setupTestFromExtension(defineTestExtension())
}

/**
 * @example
 *
 * ```ts
 * await pressKey('mod-1')
 * await pressKey('Backspace')
 * ```
 *
 * @internal
 */
export async function pressKey(input: string) {
  const keys = input.split('-').map((key) => {
    if (key.toLowerCase() === 'mod') {
      return isApple ? 'Meta' : 'Ctrl'
    }
    return key
  })
  const seq: string[] = []
  for (const key of keys) {
    // Press key without releasing it
    seq.push('{' + key + '>}')
  }
  for (const key of keys.toReversed()) {
    // Release a previously pressed key
    seq.push('{/' + key + '}')
  }
  return await userEvent.keyboard(seq.join(''))
}
