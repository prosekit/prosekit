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
  type ExtractMarkActions,
  type ExtractNodeActions,
  type NodeChild,
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
import { defineList, type ListAttrs } from '../list'
import { defineStrike } from '../strike'
import { defineTable } from '../table'
import { defineUnderline } from '../underline'

/**
 * @internal
 */
export function defineTestExtension() {
  return union(
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
  )
}

/**
 * @internal
 */
export function setupTestFromExtension<E extends Extension>(
  extension: E,
): {
  editor: TestEditor<E>
  n: ExtractNodeActions<E>
  m: ExtractMarkActions<E>
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
  const { editor, m, n } = setupTestFromExtension(defineTestExtension())

  const listWithAttrs = (attrs: ListAttrs) => {
    return (...children: NodeChild[]) => {
      return n.list(attrs, ...children)
    }
  }

  const headingWithAttrs = (attrs: { level: number }) => {
    return (...children: NodeChild[]) => {
      return n.heading(attrs, ...children)
    }
  }

  return {
    editor,
    m,
    n: {
      ...n,

      p: n.paragraph,

      h1: headingWithAttrs({ level: 1 }),
      h2: headingWithAttrs({ level: 2 }),
      h3: headingWithAttrs({ level: 3 }),
      h4: headingWithAttrs({ level: 4 }),
      h5: headingWithAttrs({ level: 5 }),
      h6: headingWithAttrs({ level: 6 }),

      bullet: listWithAttrs({ kind: 'bullet' }),
      ordered: listWithAttrs({ kind: 'ordered' }),
      checked: listWithAttrs({ kind: 'task', checked: true }),
      unchecked: listWithAttrs({ kind: 'task', checked: false }),
      collapsed: listWithAttrs({ kind: 'toggle', collapsed: true }),
      expanded: listWithAttrs({ kind: 'toggle', collapsed: false }),
    },
  }
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
      return isApple ? 'Meta' : 'Control'
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
