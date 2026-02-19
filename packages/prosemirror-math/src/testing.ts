import 'prosemirror-view/style/prosemirror.css'

import {
  defineBaseCommands,
  defineBaseKeymap,
  defineKeymap,
  defineNodeSpec,
  defineNodeView,
  definePlugin,
  Priority,
  union,
  withPriority,
  type Extension,
  type ExtractNodeActions,
  type PlainExtension,
} from '@prosekit/core'
import { createTestEditor, type TestEditor } from '@prosekit/core/test'
import { createEnterRuleCommand, type EnterRule } from 'prosemirror-enter-rules'
import { inputRules } from 'prosemirror-inputrules'
import type { Attrs } from 'prosemirror-model'

import { createCursorInsidePlugin } from './cursor-inside-plugin.ts'
import { renderKaTeXMathBlock, renderKaTeXMathInline } from './katex.ts'
import { mathBlockEnterRule } from './math-block-enter-rule.ts'
import { mathBlockSpec } from './math-block-spec.ts'
import { createMathBlockView } from './math-block-view.ts'
import { createMathInlineInputRule } from './math-inline-input-rule.ts'
import { mathInlineSpec } from './math-inline-spec.ts'
import { createMathInlineView } from './math-inline-view.ts'
import { renderMathJaxMathBlock, renderMathJaxMathInline } from './mathjax.ts'
import { renderTemmlMathBlock, renderTemmlMathInline } from './temml.ts'

type RenderMath = (text: string, element: HTMLElement) => void

interface MathRenderer {
  renderBlock: RenderMath
  renderInline: RenderMath
}

export const temmlRenderer: MathRenderer = {
  renderBlock: renderTemmlMathBlock,
  renderInline: renderTemmlMathInline,
}

export const katexRenderer: MathRenderer = {
  renderBlock: renderKaTeXMathBlock,
  renderInline: renderKaTeXMathInline,
}

export const mathjaxRenderer: MathRenderer = {
  renderBlock: renderMathJaxMathBlock,
  renderInline: renderMathJaxMathInline,
}

export const renderers = {
  temml: temmlRenderer,
  katex: katexRenderer,
  mathjax: mathjaxRenderer,
} as const

type DocExtension = Extension<{ Nodes: { doc: Attrs } }>

function defineDoc(): DocExtension {
  return defineNodeSpec({
    name: 'doc',
    content: 'block+',
    topNode: true,
  })
}

type TextExtension = Extension<{ Nodes: { text: Attrs } }>

function defineText(): TextExtension {
  return defineNodeSpec({
    name: 'text',
    group: 'inline',
  })
}

type ParagraphExtension = Extension<{ Nodes: { paragraph: Attrs } }>

function defineParagraph(): ParagraphExtension {
  return withPriority(
    defineNodeSpec({
      name: 'paragraph',
      content: 'inline*',
      group: 'block',
      parseDOM: [{ tag: 'p' }],
      toDOM() {
        return ['p', 0]
      },
    }),
    Priority.highest,
  )
}

type CodeBlockExtension = Extension<{ Nodes: { codeBlock: Attrs } }>

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
    },
    toDOM() {
      return ['pre', ['code', 0]]
    },
  })
}

type MathBlockExtension = Extension<{ Nodes: { mathBlock: Attrs } }>

function defineMathBlockSpec(): MathBlockExtension {
  return defineNodeSpec({
    ...mathBlockSpec,
    name: 'mathBlock',
  })
}

type MathInlineExtension = Extension<{ Nodes: { mathInline: Attrs } }>

function defineMathInlineSpec(): MathInlineExtension {
  return defineNodeSpec({
    ...mathInlineSpec,
    name: 'mathInline',
  })
}

function defineMathBlockView(renderer: MathRenderer): Extension {
  return defineNodeView({
    name: 'mathBlock',
    constructor: (node, _view, _getPos, decorations) => {
      return createMathBlockView(
        renderer.renderBlock,
        node,
        decorations,
      )
    },
  })
}

function defineMathInlineView(renderer: MathRenderer): Extension {
  return defineNodeView({
    name: 'mathInline',
    constructor: (node, _view, _getPos, decorations) => {
      return createMathInlineView(
        renderer.renderInline,
        node,
        decorations,
      )
    },
  })
}

function defineEnterRule(rules: EnterRule[]): PlainExtension {
  const command = createEnterRuleCommand({ rules })
  return defineKeymap({ Enter: command })
}

function defineTestExtension(renderer: MathRenderer) {
  return union(
    defineDoc(),
    defineText(),
    defineParagraph(),
    defineCodeBlock(),
    defineMathBlockSpec(),
    defineMathInlineSpec(),
    defineMathBlockView(renderer),
    defineMathInlineView(renderer),
    defineEnterRule([mathBlockEnterRule]),
    definePlugin(inputRules({ rules: [createMathInlineInputRule('mathInline')] })),
    definePlugin(createCursorInsidePlugin()),
    defineBaseCommands(),
    defineBaseKeymap(),
  )
}

function setupTestFromExtension<E extends Extension>(
  extension: E,
): {
  editor: TestEditor<E>
  n: ExtractNodeActions<E>
} {
  const editor = createTestEditor({ extension })

  const div = document.body.appendChild(document.createElement('div'))
  div.style.minWidth = '200px'
  div.style.minHeight = '200px'
  editor.mount(div)
  editor.view.dom.focus()

  const n = editor.nodes
  return { editor, n }
}

export function setupTest(renderer: MathRenderer = temmlRenderer) {
  const { editor, n } = setupTestFromExtension(defineTestExtension(renderer))

  return {
    editor,
    n: { ...n, p: n.paragraph },
  }
}
