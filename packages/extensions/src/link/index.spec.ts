import { describe, expect, it } from 'vitest'

import { setupDefaultTest } from '../test'

describe('defineLinkCommands', () => {
  const { editor, n, m } = setupDefaultTest()
  const href = 'https://example.com'
  const doc1 = n.doc(n.paragraph('<a>foo<b> bar'))
  const doc2 = n.doc(n.paragraph(m.link({ href }, '<a>foo<b>'), ' bar'))
  const doc3 = n.doc(n.paragraph(m.link({ href }, 'f<a>oo'), ' bar'))

  it('should add a link', () => {
    editor.set(doc1)
    editor.commands.addLink({ href })
    expect(editor.view.state.doc.toJSON()).toEqual(doc2.toJSON())
  })

  it('should remove a link', () => {
    editor.set(doc1)
    editor.commands.removeLink()
    expect(editor.view.state.doc.toJSON()).toEqual(doc1.toJSON())
  })

  it('should expand the selection to cover the link', () => {
    editor.set(doc3)
    expect(editor.view.state.selection.empty).toBe(true)
    editor.commands.expandLink()
    expect(editor.view.state.selection.empty).toBe(false)
    expect(editor.view.state.doc.toJSON()).toEqual(doc2.toJSON())
  })
})
