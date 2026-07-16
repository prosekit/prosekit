import { defineNodeSpec, defineNodeView, union } from '@prosekit/core'
import { TextSelection } from '@prosekit/pm/state'
import { describe, expect, it, vi } from 'vitest'
import { userEvent } from 'vitest/browser'

import { defineDoc } from '../doc/index.ts'
import { defineParagraph } from '../paragraph/index.ts'
import { setupTestFromExtension } from '../testing/index.ts'
import { defineText } from '../text/index.ts'

import { defineVirtualSelection } from './index.ts'

function defineNestedEditableNodeView() {
  return union(
    defineNodeSpec({
      name: 'nestedEditable',
      content: 'block+',
      group: 'block',
      toDOM: () => ['div', 0],
    }),
    defineNodeView({
      name: 'nestedEditable',
      constructor: () => {
        const dom = document.createElement('div')
        const button = document.createElement('button')
        const contentDOM = document.createElement('div')

        dom.dataset.testid = 'nested-editable'
        button.dataset.testid = 'nested-editable-control'
        button.contentEditable = 'false'
        button.textContent = 'Control'
        contentDOM.dataset.testid = 'nested-editable-content'

        dom.append(button, contentDOM)
        return { dom, contentDOM }
      },
    }),
  )
}

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
    const elements = Array.from(editor.view.dom.querySelectorAll('.prosekit-virtual-selection'))
    return elements
      .map((element) => element.textContent)
      .join('|')
  }

  return {
    editor,
    getVirtualSelectionText,
    setSelection,
  }
}

function setupNestedEditableNodeView() {
  const extension = union(
    defineDoc(),
    defineText(),
    defineParagraph(),
    defineNestedEditableNodeView(),
    defineVirtualSelection(),
  )
  const { editor, n } = setupTestFromExtension(extension)
  editor.set(n.doc(n.nestedEditable(n.paragraph('selected'), n.paragraph('target'))))
  editor.view.dispatch(
    editor.state.tr.setSelection(TextSelection.create(editor.state.doc, 2, 10)),
  )
  editor.blur()
  return editor
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

  it('removes the decoration before pointer focus in a nested editable node view', async () => {
    const editor = setupNestedEditableNodeView()

    const target = editor.view.dom.querySelector('p:last-child')
    if (!target) throw new Error('Could not find the target paragraph')
    let hadDecorationOnMouseDown = false
    editor.view.dom.addEventListener('mousedown', () => {
      hadDecorationOnMouseDown = Boolean(
        editor.view.dom.querySelector('.prosekit-virtual-selection'),
      )
    }, { once: true })

    await userEvent.click(target)

    expect(hadDecorationOnMouseDown).toBe(false)
    expect(editor.state.selection.empty).toBe(true)
    expect(editor.state.selection.$from.parent.textContent).toBe('target')
  })

  it('keeps the decoration for non-editable controls and secondary pointers', async () => {
    const editor = setupNestedEditableNodeView()
    const control = editor.view.dom.querySelector<HTMLButtonElement>(
      '[data-testid="nested-editable-control"]',
    )
    const target = editor.view.dom.querySelector('p:last-child')
    if (!control || !target) throw new Error('Could not find nested node view elements')

    await userEvent.click(control)
    expect(editor.view.hasFocus()).toBe(false)
    expect(editor.view.dom.querySelector('.prosekit-virtual-selection')).not.toBeNull()

    target.dispatchEvent(
      new PointerEvent('pointerdown', {
        bubbles: true,
        button: 2,
        isPrimary: true,
      }),
    )
    expect(editor.view.dom.querySelector('.prosekit-virtual-selection')).not.toBeNull()
  })
})
