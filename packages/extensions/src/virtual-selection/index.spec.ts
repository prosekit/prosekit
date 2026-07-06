import { union } from '@prosekit/core'
import { TextSelection } from '@prosekit/pm/state'
import { describe, expect, it, vi } from 'vitest'

import { defineDoc } from '../doc/index.ts'
import { defineParagraph } from '../paragraph/index.ts'
import { setupTestFromExtension } from '../testing/index.ts'
import { defineText } from '../text/index.ts'

import { defineVirtualSelection } from './index.ts'

function setup() {
  const extension = union(
    defineDoc(),
    defineText(),
    defineParagraph(),
    defineVirtualSelection(),
  )
  const { editor, n } = setupTestFromExtension(extension)
  editor.set(n.doc(n.paragraph('hello world')))

  const setSelection = (from: number, to: number) => {
    editor.view.dispatch(
      editor.state.tr.setSelection(TextSelection.create(editor.state.doc, from, to)),
    )
  }

  const getVirtualSelectionText = () => {
    return Array.from(editor.view.dom.querySelectorAll('.prosekit-virtual-selection'))
      .map((element) => element.textContent)
      .join('|')
  }

  return {
    editor,
    getVirtualSelectionText,
    setSelection,
  }
}

describe('defineVirtualSelection', () => {
  it('shows the selection as a decoration after blur', () => {
    const { editor, getVirtualSelectionText, setSelection } = setup()

    setSelection(1, 6)
    expect(getVirtualSelectionText()).toBe('')

    editor.blur()
    expect(getVirtualSelectionText()).toBe('hello')
  })

  it('removes the native selection inside the editor on blur', () => {
    const { editor, setSelection } = setup()

    setSelection(1, 6)
    expect(window.getSelection()?.toString()).toBe('hello')

    editor.blur()
    expect(window.getSelection()?.rangeCount).toBe(0)
  })

  it('follows selection changes dispatched while blurred', () => {
    const { editor, getVirtualSelectionText, setSelection } = setup()

    setSelection(1, 6)
    editor.blur()
    expect(getVirtualSelectionText()).toBe('hello')

    setSelection(7, 12)
    expect(getVirtualSelectionText()).toBe('world')
  })

  it('keeps the decoration through doc changes', () => {
    const { editor, getVirtualSelectionText, setSelection } = setup()

    setSelection(1, 6)
    editor.blur()

    editor.view.dispatch(editor.state.tr.insertText('say ', 1))
    expect(getVirtualSelectionText()).toBe('hello')
  })

  it('restores the native selection on focus', async () => {
    const { editor, getVirtualSelectionText, setSelection } = setup()

    setSelection(1, 6)
    editor.blur()
    expect(window.getSelection()?.rangeCount).toBe(0)

    editor.focus()
    await vi.waitFor(() => {
      expect(window.getSelection()?.toString()).toBe('hello')
    })
    expect(getVirtualSelectionText()).toBe('')
  })
})
