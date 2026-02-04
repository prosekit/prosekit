import { describe, expect, it } from 'vitest'

import { setupTest } from '../testing'

describe('toggle-wrap', () => {
  it('adds the node wrapping the selection', () => {
    const { editor, n } = setupTest()

    const doc1 = n.doc(n.paragraph('<a>hello'))
    const doc2 = n.doc(n.blockquote(n.paragraph('<a>hello')))

    editor.set(doc1)
    expect(editor.state.doc.toJSON()).toEqual(doc1.toJSON())

    editor.commands.toggleWrap({ type: 'blockquote' })
    expect(editor.state.doc.toJSON()).toEqual(doc2.toJSON())
  })

  it('lift the wrapped node', () => {
    const { editor, n } = setupTest()

    const doc1 = n.doc(n.blockquote(n.paragraph('<a>hello')))
    const doc2 = n.doc(n.paragraph('<a>hello'))

    editor.set(doc1)
    expect(editor.state.doc.toJSON()).toEqual(doc1.toJSON())

    editor.commands.toggleWrap({ type: 'paragraph' })
    expect(editor.state.doc.toJSON()).toEqual(doc2.toJSON())
  })
})
