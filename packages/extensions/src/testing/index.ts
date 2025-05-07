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

import { defineBlockquote } from '../blockquote'
import { defineBold } from '../bold'
import { defineCode } from '../code'
import { defineCodeBlock } from '../code-block'
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
import { defineText } from '../text'
import { defineUnderline } from '../underline'

import {
  readHtmlTextFromClipboard,
  readPlainTextFromClipboard,
} from './clipboard'
import { pressKey } from './keyboard'

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

  const copy = async () => {
    editor.view.dom.focus()
    await pressKey('mod-C')
    const html = await readHtmlTextFromClipboard()
    const plain = await readPlainTextFromClipboard()
    return { html, plain }
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
    copy,
  }
}
