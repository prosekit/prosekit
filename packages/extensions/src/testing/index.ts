import '@prosekit/pm/view/style/prosemirror.css'

import {
  defineBaseCommands,
  defineBaseKeymap,
  defineHistory,
  union,
  type Extension,
  type ExtractMarkActions,
  type ExtractNodeActions,
  type NodeChild,
} from '@prosekit/core'
import {
  createTestEditor,
  type TestEditor,
} from '@prosekit/core/test'
import { keyboard } from 'vitest-browser-commands/playwright'

import { defineBlockquote } from '../blockquote'
import { defineBold } from '../bold'
import { defineCode } from '../code'
import { defineCodeBlock } from '../code-block'
import { defineColor } from '../color'
import { defineDoc } from '../doc'
import { defineHardBreak } from '../hard-break'
import { defineHeading } from '../heading'
import { defineHorizontalRule } from '../horizontal-rule'
import { defineImage } from '../image'
import { defineItalic } from '../italic'
import { defineLink } from '../link'
import {
  defineList,
  type ListAttrs,
} from '../list'
import { defineParagraph } from '../paragraph'
import { defineStrike } from '../strike'
import { defineTable } from '../table'
import type { CellAttrs } from '../table/table-spec'
import { defineText } from '../text'
import { defineUnderline } from '../underline'

import {
  readHtmlTextFromClipboard,
  readPlainTextFromClipboard,
} from './clipboard'

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
    defineColor(),
    defineLink(),
    defineImage(),
    defineParagraph(),
    defineTable(),
    defineHorizontalRule(),
    defineHardBreak(),
    defineCodeBlock(),
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

  const p = n.paragraph

  const td = (text?: string, attrs?: CellAttrs) => {
    return n.tableCell({ ...attrs }, text ? p(text) : p())
  }

  const th = (text?: string, attrs?: CellAttrs) => {
    return n.tableHeaderCell({ ...attrs }, text ? p(text) : p())
  }

  const copy = async () => {
    editor.view.dom.focus()
    await keyboard.press('ControlOrMeta+C')
    const html = await readHtmlTextFromClipboard()
    const plain = await readPlainTextFromClipboard()
    return { html, plain }
  }

  return {
    editor,
    m,
    n: {
      ...n,

      p,

      td,
      th,
      tr: n.tableRow,

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
    copy,
  }
}
