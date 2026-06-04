import { union } from '@prosekit/core'
import { TextSelection } from '@prosekit/pm/state'
import { describe, expect, it } from 'vitest'

import { defineDoc } from '../doc/index.ts'
import { defineParagraph } from '../paragraph/index.ts'
import { defineText } from '../text/index.ts'
import { setupTestFromExtension } from '../testing/index.ts'

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
  it('keeps showing the selection captured on blur', () => {
    const { editor, getVirtualSelectionText, setSelection } = setup()

    setSelection(1, 6)
    editor.blur()
    expect(getVirtualSelectionText()).toBe('hello')

    setSelection(7, 12)
    expect(getVirtualSelectionText()).toBe('hello')
  })

  it('maps the captured selection through document changes', () => {
    const { editor, getVirtualSelectionText, setSelection } = setup()

    setSelection(1, 6)
    editor.blur()

    editor.view.dispatch(editor.state.tr.insertText('say ', 1))

    expect(getVirtualSelectionText()).toBe('hello')
  })

  it('marks the editor while virtual selection is active', () => {
    const { editor, setSelection } = setup()

    setSelection(1, 6)
    editor.blur()
    expect(editor.view.dom.classList.contains('prosekit-virtual-selection-active')).toBe(true)

    editor.focus()
    expect(editor.view.dom.classList.contains('prosekit-virtual-selection-active')).toBe(false)
  })
})
