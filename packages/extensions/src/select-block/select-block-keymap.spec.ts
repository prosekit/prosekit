import { union } from '@prosekit/core'
import {
  AllSelection,
  TextSelection,
} from '@prosekit/pm/state'
import {
  describe,
  expect,
  it,
} from 'vitest'

import { setupTestFromExtension } from '../testing'
import { defineTestExtension } from '../testing'
import { pressKey } from '../testing/keyboard'

import { defineSelectBlock } from './select-block'

function setupTestWithSelectBlock() {
  const extension = union(defineTestExtension(), defineSelectBlock())
  const { editor, n, m } = setupTestFromExtension(extension)

  return {
    editor,
    n,
    m,
  }
}

describe('selectBlock keymap and command', () => {
  it('should select single paragraph on first Ctrl-A', async () => {
    const { editor, n } = setupTestWithSelectBlock()

    const doc = n.doc(n.paragraph('Hello <a>world'), n.paragraph('Foo bar'))
    editor.set(doc)

    await pressKey('mod-a')

    const selection = editor.state.selection
    expect(selection).toBeInstanceOf(TextSelection)
    expect(selection.from).toBe(1) // After doc node
    expect(selection.to).toBe(12) // End of paragraph
  })

  it('should select all on second Ctrl-A after selecting block', async () => {
    const { editor, n } = setupTestWithSelectBlock()

    const doc = n.doc(n.paragraph('Hello world'), n.paragraph('Foo bar'))
    editor.set(doc)
    // Select first paragraph fully
    const tr = editor.state.tr
    tr.setSelection(TextSelection.create(tr.doc, 1, 12))
    editor.view.dispatch(tr)

    await pressKey('mod-a')

    const selection = editor.state.selection
    expect(selection).toBeInstanceOf(AllSelection)
  })

  it('should select blockquote container when text block is fully selected', async () => {
    const { editor, n } = setupTestWithSelectBlock()

    const doc = n.doc(n.blockquote(n.paragraph('Hello world')))
    editor.set(doc)
    // Select all text in the paragraph
    const tr = editor.state.tr
    tr.setSelection(TextSelection.create(tr.doc, 2, 13))
    editor.view.dispatch(tr)

    await pressKey('mod-a')

    const selection = editor.state.selection
    expect(selection).toBeInstanceOf(TextSelection)
    // Should select the entire blockquote, not just the paragraph
    expect(selection.from).toBe(1) // Start of blockquote
    expect(selection.to).toBe(14) // End of blockquote
  })

  it('should select list container when text block is fully selected', async () => {
    const { editor, n } = setupTestWithSelectBlock()

    const doc = n.doc(n.list({ kind: 'bullet' }, n.paragraph('Item 1'), n.paragraph('Item 2')))
    editor.set(doc)
    // Select all text in first paragraph
    const tr = editor.state.tr
    tr.setSelection(TextSelection.create(tr.doc, 2, 9))
    editor.view.dispatch(tr)

    await pressKey('mod-a')

    const selection = editor.state.selection
    expect(selection).toBeInstanceOf(TextSelection)
    // Should select the entire list, not just the paragraph
    expect(selection.from).toBe(1) // Start of list
    expect(selection.to).toBeGreaterThan(9) // End of list
  })

  it('should select all blocks when selection spans multiple blocks', async () => {
    const { editor, n } = setupTestWithSelectBlock()

    const doc = n.doc(n.paragraph('First'), n.paragraph('Second'), n.paragraph('Third'))
    editor.set(doc)
    // Select across multiple paragraphs
    const tr = editor.state.tr
    tr.setSelection(TextSelection.create(tr.doc, 2, 15))
    editor.view.dispatch(tr)

    await pressKey('mod-a')

    const selection = editor.state.selection
    expect(selection).toBeInstanceOf(TextSelection)
    // Should select from first block start to last block end
    expect(selection.from).toBe(1) // Start of first paragraph
    expect(selection.to).toBeGreaterThan(15) // End of last paragraph
  })

  it('should select heading block', async () => {
    const { editor, n } = setupTestWithSelectBlock()

    const doc = n.doc(n.heading({ level: 1 }, 'Hello <a>world'))
    editor.set(doc)

    await pressKey('mod-a')

    const selection = editor.state.selection
    expect(selection).toBeInstanceOf(TextSelection)
    expect(selection.from).toBe(1)
    expect(selection.to).toBe(12)
  })

  it('should do nothing if already all selected', async () => {
    const { editor, n } = setupTestWithSelectBlock()

    const doc = n.doc(n.paragraph('Hello world'))
    editor.set(doc)
    const tr = editor.state.tr
    tr.setSelection(new AllSelection(tr.doc))
    editor.view.dispatch(tr)

    await pressKey('mod-a')

    const selection = editor.state.selection
    expect(selection).toBeInstanceOf(AllSelection)
  })

  it('should use selectBlock command directly', () => {
    const { editor, n } = setupTestWithSelectBlock()

    const doc = n.doc(n.paragraph('Hello <a>world'))
    editor.set(doc)

    const result = editor.commands.selectBlock?.()

    expect(result).toBe(true)
    const selection = editor.state.selection
    expect(selection).toBeInstanceOf(TextSelection)
    expect(selection.from).toBe(1)
    expect(selection.to).toBe(12)
  })

  it('should select blockquote when cursor is inside', async () => {
    const { editor, n } = setupTestWithSelectBlock()

    const doc = n.doc(n.blockquote(n.paragraph('Hello <a>world')))
    editor.set(doc)

    await pressKey('mod-a')

    const selection = editor.state.selection
    expect(selection).toBeInstanceOf(TextSelection)
    // Should select the entire blockquote
    expect(selection.from).toBe(1) // Start of blockquote
    expect(selection.to).toBe(14) // End of blockquote
  })

  it('should select nested list item correctly', async () => {
    const { editor, n } = setupTestWithSelectBlock()

    const doc = n.doc(
      n.list({ kind: 'bullet' }, n.paragraph('Item 1'), n.list({ kind: 'bullet' }, n.paragraph('Nested 1'), n.paragraph('Nested 2'))),
    )
    editor.set(doc)
    // Place cursor in nested item using <a> tag
    const docWithCursor = n.doc(
      n.list({ kind: 'bullet' }, n.paragraph('Item 1'), n.list({ kind: 'bullet' }, n.paragraph('Nested <a>1'), n.paragraph('Nested 2'))),
    )
    editor.set(docWithCursor)

    await pressKey('mod-a')

    const selection = editor.state.selection
    expect(selection).toBeInstanceOf(TextSelection)
    // Should select the nested list, not the outer list
    expect(selection.from).toBeGreaterThan(1)
  })
})
