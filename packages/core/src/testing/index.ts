import type { Attrs } from '@prosekit/pm/model'

import { union } from '../editor/union'
import { defineBaseCommands } from '../extensions/command'
import { defineDoc } from '../extensions/doc'
import { defineHistory } from '../extensions/history'
import { defineBaseKeymap } from '../extensions/keymap-base'
import { defineMarkSpec } from '../extensions/mark-spec'
import { defineNodeSpec } from '../extensions/node-spec'
import { defineParagraph } from '../extensions/paragraph'
import { defineText } from '../extensions/text'
import { createTestEditor, type TestEditor } from '../test'
import type {
  Extension,
  ExtractMarkActions,
  ExtractNodeActions,
} from '../types/extension'

type BoldExtension = Extension<{
  Marks: {
    bold: Attrs
  }
}>

function defineBold(): BoldExtension {
  return defineMarkSpec({
    name: 'bold',
    parseDOM: [{ tag: 'strong' }],
    toDOM() {
      return ['strong', 0]
    },
  })
}

type ItalicExtension = Extension<{
  Marks: {
    italic: Attrs
  }
}>

function defineItalic(): ItalicExtension {
  return defineMarkSpec({
    name: 'italic',
    parseDOM: [{ tag: 'em' }],
    toDOM() {
      return ['em', 0]
    },
  })
}

type HeadingExtension = Extension<{
  Nodes: {
    heading: { level: number }
  }
}>

function defineHeading(): HeadingExtension {
  return defineNodeSpec({
    name: 'heading',
    attrs: { level: { default: 1 } },
    content: 'inline*',
    group: 'block',
    defining: true,
    parseDOM: [
      { tag: 'h1', attrs: { level: 1 } },
      { tag: 'h2', attrs: { level: 2 } },
      { tag: 'h3', attrs: { level: 3 } },
      { tag: 'h4', attrs: { level: 4 } },
      { tag: 'h5', attrs: { level: 5 } },
      { tag: 'h6', attrs: { level: 6 } },
    ],
    toDOM(node) {
      return [`h${node.attrs.level}`, 0]
    },
  })
}

type CodeBlockExtension = Extension<{
  Nodes: {
    codeBlock: { language: string }
  }
}>

function defineCodeBlock(): CodeBlockExtension {
  return defineNodeSpec({
    name: 'codeBlock',
    content: 'text*',
    group: 'block',
    code: true,
    defining: true,
    marks: '',
    attrs: { language: { default: '' } },
    toDOM() {
      return ['pre', ['code', 0]]
    },
  })
}

/**
 * @internal
 */
export function defineTestExtension() {
  return union([
    defineBaseCommands(),
    defineBaseKeymap(),
    defineDoc(),
    defineHistory(),
    defineParagraph(),
    defineText(),
    defineBold(),
    defineItalic(),
    defineHeading(),
    defineCodeBlock(),
  ])
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

  return {
    editor,
    m,
    n: { ...n, p: n.paragraph },
  }
}
