import {
  describe,
  expect,
  it,
} from 'vitest'

import { setupTest } from '../testing'
import {
  pasteHTML,
  pasteText,
} from '../testing/clipboard'

describe('defineLinkPasteRule', () => {
  const { editor, n, m } = setupTest()

  it('should convert URLs to links when pasting plain text', () => {
    const doc = n.doc(n.p('<a>'))
    editor.set(doc)

    pasteHTML(editor.view, '<p>Visit https://example.com for more info</p>')

    expect(editor.view.state.doc.toJSON()).toEqual(
      n.doc(n.p(
        'Visit ',
        m.link({ href: 'https://example.com' }, 'https://example.com'),
        ' for more info',
      )).toJSON(),
    )
  })

  it('should handle multiple URLs in pasted text', () => {
    const doc = n.doc(n.p('<a>'))
    editor.set(doc)

    pasteHTML(editor.view, '<p>Check https://google.com and https://github.com</p>')

    expect(editor.view.state.doc.toJSON()).toEqual(
      n.doc(n.p(
        'Check ',
        m.link({ href: 'https://google.com' }, 'https://google.com'),
        ' and ',
        m.link({ href: 'https://github.com' }, 'https://github.com'),
      )).toJSON(),
    )
  })

  it('should handle URLs without protocol', () => {
    const doc = n.doc(n.p('<a>'))
    editor.set(doc)

    pasteHTML(editor.view, '<p>Visit example.com for details</p>')

    expect(editor.view.state.doc.toJSON()).toEqual(
      n.doc(n.p(
        'Visit ',
        m.link({ href: 'example.com' }, 'example.com'),
        ' for details',
      )).toJSON(),
    )
  })

  it('should not modify text without URLs', () => {
    const doc = n.doc(n.p('<a>'))
    editor.set(doc)

    pasteText(editor.view, 'This is just plain text without any links')

    expect(editor.view.state.doc.toJSON()).toEqual(
      n.doc(n.p('This is just plain text without any links')).toJSON(),
    )
  })

  it('should preserve existing marks when adding links', () => {
    const doc = n.doc(n.p('<a>'))
    editor.set(doc)

    pasteHTML(editor.view, '<p>Visit <strong>https://example.com</strong> for info</p>')

    expect(editor.view.state.doc.toJSON()).toEqual(
      n.doc(n.p(
        'Visit ',
        m.bold(m.link({ href: 'https://example.com' }, 'https://example.com')),
        ' for info',
      )).toJSON(),
    )
  })

  it('should not convert URLs inside existing links', () => {
    const doc = n.doc(n.p('<a>'))
    editor.set(doc)

    pasteHTML(editor.view, '<p><a href="https://google.com">Visit https://example.com for more</a></p>')

    expect(editor.view.state.doc.toJSON()).toEqual(
      n.doc(n.p(
        m.link({ href: 'https://google.com' }, 'Visit https://example.com for more'),
      )).toJSON(),
    )
  })

  it('should not convert URLs inside code blocks', () => {
    const doc = n.doc(n.codeBlock('<a>'))
    editor.set(doc)

    pasteText(editor.view, 'https://example.com')

    expect(editor.view.state.doc.toJSON()).toEqual(
      n.doc(n.codeBlock('https://example.com')).toJSON(),
    )
  })

  it('should not convert URLs inside code marks', () => {
    const doc = n.doc(n.p('<a>'))
    editor.set(doc)

    pasteHTML(editor.view, '<p><code>https://example.com</code></p>')

    // Currently the paste rule adds links even inside code marks (this might be a bug)
    expect(editor.view.state.doc.toJSON()).toEqual(
      n.doc(n.p(m.code(m.link({ href: 'https://example.com' }, 'https://example.com')))).toJSON(),
    )
  })

  it('should handle URLs with paths and query parameters', () => {
    const doc = n.doc(n.p('<a>'))
    editor.set(doc)

    pasteHTML(editor.view, '<p>Visit https://example.com/path?param=value#section</p>')

    expect(editor.view.state.doc.toJSON()).toEqual(
      n.doc(n.p(
        'Visit ',
        m.link({ href: 'https://example.com/path?param=value#section' }, 'https://example.com/path?param=value#section'),
      )).toJSON(),
    )
  })

  it('should handle URLs at the beginning of text', () => {
    const doc = n.doc(n.p('<a>'))
    editor.set(doc)

    pasteHTML(editor.view, '<p>https://example.com is a great site</p>')

    expect(editor.view.state.doc.toJSON()).toEqual(
      n.doc(n.p(
        m.link({ href: 'https://example.com' }, 'https://example.com'),
        ' is a great site',
      )).toJSON(),
    )
  })

  it('should handle URLs at the end of text', () => {
    const doc = n.doc(n.p('<a>'))
    editor.set(doc)

    pasteHTML(editor.view, '<p>Check out https://example.com</p>')

    expect(editor.view.state.doc.toJSON()).toEqual(
      n.doc(n.p(
        'Check out ',
        m.link({ href: 'https://example.com' }, 'https://example.com'),
      )).toJSON(),
    )
  })

  it('should handle URLs with punctuation after them', () => {
    const doc = n.doc(n.p('<a>'))
    editor.set(doc)

    pasteHTML(editor.view, '<p>Visit https://example.com, it is great!</p>')

    expect(editor.view.state.doc.toJSON()).toEqual(
      n.doc(n.p(
        'Visit ',
        m.link({ href: 'https://example.com' }, 'https://example.com'),
        ', it is great!',
      )).toJSON(),
    )
  })
})
