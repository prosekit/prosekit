import { union } from '@prosekit/core'
import type { EditorState } from '@prosekit/pm/state'
import { Decoration } from '@prosekit/pm/view'
import { describe, expect, it } from 'vitest'

import { defineTestExtension, setupTestFromExtension } from '../testing/index.ts'

import {
  codeBlockPreviewDecorationsPluginKey,
  defineCodeBlockPreviewPlugin,
  hasCodeBlockPreviewHiddenDecoration,
  HIDE_CODE_BLOCK_PREVIEW,
  isCodeBlockPreviewHiddenDecoration,
} from './code-block-preview.ts'

function setupEditor() {
  const extension = union(
    defineTestExtension(),
    defineCodeBlockPreviewPlugin(),
  )
  return setupTestFromExtension(extension)
}

describe('hasCodeBlockPreviewHiddenDecoration', () => {
  it('returns false for an empty array', () => {
    expect(hasCodeBlockPreviewHiddenDecoration([])).toBe(false)
  })

  it('returns true when a decoration has the HIDE_CODE_BLOCK_PREVIEW spec', () => {
    const deco = Decoration.node(0, 1, {}, HIDE_CODE_BLOCK_PREVIEW)
    expect(hasCodeBlockPreviewHiddenDecoration([deco])).toBe(true)
  })

  it('returns false when no decoration has the HIDE spec', () => {
    const deco = Decoration.node(0, 1, {}, { someOtherProp: true })
    expect(hasCodeBlockPreviewHiddenDecoration([deco])).toBe(false)
  })

  it('returns true when one of multiple decorations has the HIDE spec', () => {
    const deco1 = Decoration.node(0, 1, {}, { someOther: true })
    const deco2 = Decoration.node(2, 3, {}, HIDE_CODE_BLOCK_PREVIEW)
    expect(hasCodeBlockPreviewHiddenDecoration([deco1, deco2])).toBe(true)
  })

  it('returns false for inline decorations without spec', () => {
    const deco = Decoration.inline(0, 1, { class: 'foo' })
    expect(hasCodeBlockPreviewHiddenDecoration([deco])).toBe(false)
  })
})

describe('defineCodeBlockPreviewPlugin', () => {
  it('adds hide-preview decoration when cursor is inside a code block', () => {
    const { editor, n } = setupEditor()

    const doc = n.doc(
      n.codeBlock({ language: 'javascript' }, '<a>console.log("hello")'),
    )
    editor.set(doc)

    expect(getCodeBlockPreviewDecorations(editor.view.state).length).toBe(1)
  })

  it('does not add decorations when cursor is outside a code block', () => {
    const { editor, n } = setupEditor()

    const doc = n.doc(
      n.paragraph('<a>hello'),
      n.codeBlock({ language: 'javascript' }, 'console.log("hello")'),
    )
    editor.set(doc)

    expect(getCodeBlockPreviewDecorations(editor.view.state).length).toBe(0)
  })

  it('adds decorations for code blocks overlapped by a non-empty selection', () => {
    const { editor, n } = setupEditor()

    // Selection spans from inside the code block into the following paragraph
    const doc = n.doc(
      n.codeBlock({ language: 'javascript' }, '<a>console.log("hello")'),
      n.paragraph('world<b>'),
    )
    editor.set(doc)

    expect(getCodeBlockPreviewDecorations(editor.view.state).length).toBe(1)
  })

  it('only decorates the code block where the cursor is', () => {
    const { editor, n } = setupEditor()

    const doc = n.doc(
      n.codeBlock({ language: 'javascript' }, 'first'),
      n.codeBlock({ language: 'typescript' }, '<a>second'),
      n.codeBlock({ language: 'python' }, 'third'),
    )
    editor.set(doc)

    expect(getCodeBlockPreviewDecorations(editor.view.state).length).toBe(1)
  })

  it('returns empty decoration set when document has no code blocks', () => {
    const { editor, n } = setupEditor()

    const doc = n.doc(
      n.paragraph('<a>hello world'),
    )
    editor.set(doc)

    expect(getCodeBlockPreviewDecorations(editor.view.state).length).toBe(0)
  })

  it('handles cursor at the start of a code block', () => {
    const { editor, n } = setupEditor()

    const doc = n.doc(
      n.paragraph('before'),
      n.codeBlock({ language: 'javascript' }, '<a>console.log("hello")'),
    )
    editor.set(doc)

    expect(getCodeBlockPreviewDecorations(editor.view.state).length).toBe(1)
  })

  it('handles cursor at the end of a code block', () => {
    const { editor, n } = setupEditor()

    const doc = n.doc(
      n.codeBlock({ language: 'javascript' }, 'console.log("hello")<a>'),
      n.paragraph('after'),
    )
    editor.set(doc)

    expect(getCodeBlockPreviewDecorations(editor.view.state).length).toBe(1)
  })
})

function getCodeBlockPreviewDecorations(state: EditorState): Decoration[] {
  const pluginState = codeBlockPreviewDecorationsPluginKey.getState(state)
  if (!pluginState) {
    return []
  }
  const decorations = pluginState.find()
  return decorations.filter(isCodeBlockPreviewHiddenDecoration)
}
