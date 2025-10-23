import {
  describe,
  expect,
  it,
} from 'vitest'
import { userEvent } from 'vitest/browser'

import { setupTest } from '../testing'

describe('defineLinkCommands', () => {
  const { editor, n, m } = setupTest()
  const href = 'https://example.com'
  const doc1 = n.doc(n.p('<a>foo<b> bar'))
  const doc2 = n.doc(n.p(m.link({ href }, '<a>foo<b>'), ' bar'))
  const doc3 = n.doc(n.p(m.link({ href }, 'f<a>oo'), ' bar'))

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

  it('should toggle a link', () => {
    editor.set(doc1)
    editor.commands.toggleLink({ href })
    expect(editor.view.state.doc.toJSON()).toEqual(doc2.toJSON())
    editor.commands.toggleLink({ href })
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

describe('defineLinkInputRule', () => {
  it('should insert a link after pressing Space', async () => {
    const { editor } = setupTest()
    await userEvent.keyboard('https://example.com')
    expect(editor.view.state.doc.toString()).toMatchInlineSnapshot(
      `"doc(paragraph("https://example.com"))"`,
    )
    await userEvent.keyboard(' ')
    expect(editor.view.state.doc.toString()).toMatchInlineSnapshot(
      `"doc(paragraph(link("https://example.com"), " "))"`,
    )
  })

  it('should handle a link before a period', async () => {
    const { editor } = setupTest()
    await userEvent.keyboard('https://example.com')
    expect(editor.view.state.doc.toString()).toMatchInlineSnapshot(
      `"doc(paragraph("https://example.com"))"`,
    )
    await userEvent.keyboard('.')
    expect(editor.view.state.doc.toString()).toMatchInlineSnapshot(
      `"doc(paragraph("https://example.com."))"`,
    )
    await userEvent.keyboard(' ')
    expect(editor.view.state.doc.toString()).toMatchInlineSnapshot(
      `"doc(paragraph(link("https://example.com"), ". "))"`,
    )
  })
})

describe('defineLinkEnterRule', () => {
  it('should insert a link after pressing Enter', async () => {
    const { editor } = setupTest()
    await userEvent.keyboard('https://example.com')
    expect(editor.view.state.doc.toString()).toMatchInlineSnapshot(
      `"doc(paragraph("https://example.com"))"`,
    )
    await userEvent.keyboard('{Enter}')
    expect(editor.view.state.doc.toString()).toMatchInlineSnapshot(
      `"doc(paragraph(link("https://example.com")), paragraph)"`,
    )
  })
})
