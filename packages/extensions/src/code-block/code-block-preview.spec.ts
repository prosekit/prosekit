import { union } from '@prosekit/core'
import { Decoration, DecorationSet } from '@prosekit/pm/view'
import { describe, expect, it } from 'vitest'

import { defineTestExtension, setupTestFromExtension } from '../testing/index.ts'

import {
  codeBlockPreviewDecorationsPluginKey,
  defineCodeBlockPreviewDecorations,
  hasCodeBlockPreviewHiddenDecoration,
  HIDE_CODE_BLOCK_PREVIEW,
} from './code-block-preview.ts'
import type { EditorState } from '@prosekit/pm/state'

function setupEditor() {
  const extension = union(
    defineTestExtension(),
    defineCodeBlockPreviewDecorations(),
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

describe('defineCodeBlockPreviewDecorations', () => {
  it('adds hide-preview decoration when cursor is inside a code block', () => {
    const { editor, n } = setupEditor()

    const doc = n.doc(
      n.codeBlock({ language: 'javascript' }, '<a>console.log("hello")'),
    )
    editor.set(doc)

    const found = getCodeBlockPreviewDecorations(editor.view.state)?.find()
    expect(found?.length).toBeGreaterThan(0)
    expect(hasCodeBlockPreviewHiddenDecoration(found ?? [])).toBe(true)
  })

  it('does not add decorations when cursor is outside a code block', () => {
    const { editor, n } = setupEditor()

    const doc = n.doc(
      n.paragraph('<a>hello'),
      n.codeBlock({ language: 'javascript' }, 'console.log("hello")'),
    )
    editor.set(doc)

    const found = getCodeBlockPreviewDecorations(editor.view.state)?.find()
    expect(hasCodeBlockPreviewHiddenDecoration(found ?? [])).toBe(false)
  })

  it('adds decorations for code blocks overlapped by a non-empty selection', () => {
    const { editor, n } = setupEditor()

    // Selection spans from inside the code block into the following paragraph
    const doc = n.doc(
      n.codeBlock({ language: 'javascript' }, '<a>console.log("hello")'),
      n.paragraph('world<b>'),
    )
    editor.set(doc)

    const found = getCodeBlockPreviewDecorations(editor.view.state)?.find()
    expect(hasCodeBlockPreviewHiddenDecoration(found ?? [])).toBe(true)
  })

  it('only decorates the code block where the cursor is', () => {
    const { editor, n } = setupEditor()

    const doc = n.doc(
      n.codeBlock({ language: 'javascript' }, 'first'),
      n.codeBlock({ language: 'typescript' }, '<a>second'),
      n.codeBlock({ language: 'python' }, 'third'),
    )
    editor.set(doc)

    const found = getCodeBlockPreviewDecorations(editor.view.state)?.find()
    const hideDecorations = found?.filter((d) => {
      const spec = d.spec as string | undefined
      return spec === HIDE_CODE_BLOCK_PREVIEW
    })
    expect(hideDecorations?.length).toBe(1)
  })

  it('returns empty decoration set when document has no code blocks', () => {
    const { editor, n } = setupEditor()

    const doc = n.doc(
      n.paragraph('<a>hello world'),
    )
    editor.set(doc)

    const decorations = getCodeBlockPreviewDecorations(editor.view.state)
    expect(decorations?.find().length).toBe(0)
  })

  it('handles cursor at the start of a code block', () => {
    const { editor, n } = setupEditor()

    const doc = n.doc(
      n.paragraph('before'),
      n.codeBlock({ language: 'javascript' }, '<a>console.log("hello")'),
    )
    editor.set(doc)

    const found = getCodeBlockPreviewDecorations(editor.view.state)?.find()
    expect(hasCodeBlockPreviewHiddenDecoration(found ?? [])).toBe(true)
  })

  it('handles cursor at the end of a code block', () => {
    const { editor, n } = setupEditor()

    const doc = n.doc(
      n.codeBlock({ language: 'javascript' }, 'console.log("hello")<a>'),
      n.paragraph('after'),
    )
    editor.set(doc)

    const found = getCodeBlockPreviewDecorations(editor.view.state)?.find()
    expect(hasCodeBlockPreviewHiddenDecoration(found ?? [])).toBe(true)
  })
})

/**
 * Extracts the code-block-preview decorations from the editor state.
 * Uses the public {@link EditorState.plugins} API to find the plugin
 * and calls its decorations function.
 */
function getCodeBlockPreviewDecorations(state: EditorState): DecorationSet | undefined {
  return codeBlockPreviewDecorationsPluginKey.getState(state)
}
