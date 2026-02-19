import { TextSelection } from 'prosemirror-state'
import { describe, expect, it } from 'vitest'

import { setupTest } from './testing.ts'

describe('cursorInsidePlugin', () => {
  it('applies decoration when cursor is inside mathBlock', () => {
    const { editor, n } = setupTest()
    editor.set(n.doc(n.mathBlock('x^2')))

    // Place cursor inside the math block
    const { state } = editor.view
    const tr = state.tr.setSelection(
      TextSelection.near(state.doc.resolve(2)),
    )
    editor.view.dispatch(tr)

    const mathBlock = editor.view.dom.querySelector('.prosemirror-math-block')
    expect(mathBlock?.classList.contains('prosemirror-math-head-inside')).toBe(true)
  })

  it('applies decoration when cursor is inside mathInline', () => {
    const { editor, n } = setupTest()
    editor.set(n.doc(n.paragraph(n.mathInline('y'))))

    // Place cursor inside the math inline node
    const { state } = editor.view
    const tr = state.tr.setSelection(
      TextSelection.near(state.doc.resolve(2)),
    )
    editor.view.dispatch(tr)

    const mathInline = editor.view.dom.querySelector('.prosemirror-math-inline')
    expect(mathInline?.classList.contains('prosemirror-math-head-inside')).toBe(true)
  })

  it('does not apply decoration when cursor is outside math nodes', () => {
    const { editor, n } = setupTest()
    editor.set(n.doc(n.paragraph('hello'), n.mathBlock('x^2')))

    // Place cursor inside the paragraph (position 2 should be inside "hello")
    const { state } = editor.view
    const tr = state.tr.setSelection(
      TextSelection.near(state.doc.resolve(2)),
    )
    editor.view.dispatch(tr)

    const mathBlock = editor.view.dom.querySelector('.prosemirror-math-block')
    expect(mathBlock?.classList.contains('prosemirror-math-head-inside')).toBe(false)
  })
})
