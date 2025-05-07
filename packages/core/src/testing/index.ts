import '@prosekit/pm/view/style/prosemirror.css'

import type { Attrs } from '@prosekit/pm/model'

import { union } from '../editor/union'
import { withPriority } from '../editor/with-priority'
import { defineBaseCommands } from '../extensions/command'
import { defineHistory } from '../extensions/history'
import { defineBaseKeymap } from '../extensions/keymap-base'
import { defineMarkSpec } from '../extensions/mark-spec'
import { defineNodeSpec } from '../extensions/node-spec'
import {
  createTestEditor,
  type TestEditor,
} from '../test'
import type {
  Extension,
  ExtractMarkActions,
  ExtractNodeActions,
} from '../types/extension'
import { Priority } from '../types/priority'

type DocExtension = Extension<{ Nodes: { doc: Attrs } }>

/**
 * @internal
 */
export function defineDoc(): DocExtension {
  return defineNodeSpec({
    name: 'doc',
    content: 'block+',
    topNode: true,
  })
}

type ParagraphExtension = Extension<{
  Nodes: {
    paragraph: Attrs
  }
}>

/**
 * @internal
 */
function defineParagraphSpec(): ParagraphExtension {
  return defineNodeSpec({
    name: 'paragraph',
    content: 'inline*',
    group: 'block',
    parseDOM: [{ tag: 'p' }],
    toDOM() {
      return ['p', 0]
    },
  })
}

/**
 * @internal
 */
export function defineParagraph(): ParagraphExtension {
  return withPriority(defineParagraphSpec(), Priority.highest)
}

type TextExtension = Extension<{
  Nodes: {
    text: Attrs
  }
}>

/**
 * @internal
 */
export function defineText(): TextExtension {
  return defineNodeSpec({
    name: 'text',
    group: 'inline',
  })
}

type BoldExtension = Extension<{
  Marks: {
    bold: Attrs
  }
}>

/**
 * @internal
 */
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

/**
 * @internal
 */
function defineItalic(): ItalicExtension {
  return defineMarkSpec({
    name: 'italic',
    parseDOM: [{ tag: 'em' }],
    toDOM() {
      return ['em', 0]
    },
  })
}

interface LinkAttrs {
  href: string
}

type LinkExtension = Extension<{
  Marks: {
    link: LinkAttrs
  }
}>

/**
 * @internal
 */
function defineLink(): LinkExtension {
  return defineMarkSpec<'link', LinkAttrs>({
    name: 'link',
    inclusive: false,
    attrs: {
      href: { validate: 'string' },
    },
    parseDOM: [
      {
        tag: 'a[href]',
        getAttrs: (dom: HTMLElement) => {
          return {
            href: dom.getAttribute('href') || '',
          }
        },
      },
    ],
    toDOM(node) {
      const { href } = node.attrs as LinkAttrs
      return ['a', { href }, 0]
    },
  })
}

type HeadingExtension = Extension<{
  Nodes: {
    heading: Attrs
  }
}>

/**
 * @internal
 */
function defineHeading(): HeadingExtension {
  return defineNodeSpec({
    name: 'heading',
    content: 'inline*',
    group: 'block',
    defining: true,
    parseDOM: [{ tag: 'h1' }],
    toDOM() {
      return ['h1', 0]
    },
  })
}

type CodeBlockExtension = Extension<{
  Nodes: {
    codeBlock: { language: string }
  }
}>

/**
 * @internal
 */
function defineCodeBlock(): CodeBlockExtension {
  return defineNodeSpec({
    name: 'codeBlock',
    content: 'text*',
    group: 'block',
    code: true,
    defining: true,
    marks: '',
    attrs: { language: { default: '', validate: 'string' } },
    toDOM() {
      return ['pre', ['code', 0]]
    },
  })
}

export type BlockquoteExtension = Extension<{
  Nodes: {
    blockquote: Attrs
  }
}>

/**
 * @internal
 */
function defineBlockquote(): BlockquoteExtension {
  return defineNodeSpec({
    name: 'blockquote',
    content: 'block+',
    group: 'block',
    defining: true,
    parseDOM: [{ tag: 'blockquote' }],
    toDOM() {
      return ['blockquote', 0]
    },
  })
}

/**
 * @internal
 */
export function defineTestExtension() {
  return union(
    defineBaseCommands(),
    defineBaseKeymap(),
    defineDoc(),
    defineHistory(),
    defineParagraph(),
    defineText(),
    defineBold(),
    defineItalic(),
    defineLink(),
    defineHeading(),
    defineCodeBlock(),
    defineBlockquote(),
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

  return {
    editor,
    m,
    n: { ...n, p: n.paragraph },
  }
}
