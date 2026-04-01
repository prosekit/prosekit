import '@prosekit/pm/view/style/prosemirror.css'

import type { Extension } from '@prosekit/core'
import {
  defineBaseCommands,
  defineBaseKeymap,
  defineHistory,
  defineMarkSpec,
  defineNodeSpec,
  Priority,
  union,
  withPriority,
} from '@prosekit/core'
import type { Attrs } from '@prosekit/pm/model'

type DocExtension = Extension<{ Nodes: { doc: Attrs } }>

/**
 * @internal
 */
function defineDoc(): DocExtension {
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
function defineParagraph(): ParagraphExtension {
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
function defineText(): TextExtension {
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
  target?: string | null
  rel?: string | null
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
      target: { default: null, validate: 'string|null' },
      rel: { default: null, validate: 'string|null' },
    },
    parseDOM: [
      {
        tag: 'a[href]',
        getAttrs: (dom: HTMLElement) => {
          return {
            href: dom.getAttribute('href') || '',
            target: dom.getAttribute('target') || null,
            rel: dom.getAttribute('rel') || null,
          }
        },
      },
    ],
    toDOM(node) {
      const { href, target, rel } = node.attrs as LinkAttrs
      return ['a', { href, target, rel }, 0]
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
    codeBlock: { language: string; lineNumbers?: boolean }
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
    attrs: {
      language: { default: '', validate: 'string' },
      lineNumbers: { default: false, validate: 'boolean' },
    },
    toDOM() {
      return ['pre', ['code', 0]]
    },
  })
}

interface BlockquoteAttrs {
  variant: string
}

type BlockquoteExtension = Extension<{
  Nodes: {
    blockquote: BlockquoteAttrs
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
    attrs: {
      variant: { default: '', validate: 'string' },
    },
    parseDOM: [{ tag: 'blockquote' }],
    toDOM(node) {
      const { variant } = node.attrs as BlockquoteAttrs
      return ['blockquote', { 'data-variant': variant }, 0]
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
