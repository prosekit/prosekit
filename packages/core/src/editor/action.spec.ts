import { describe, expect, it } from 'vitest'

import { setupTest } from '../testing'

describe('MarkAction', () => {
  const { editor, m, n } = setupTest()

  it('can check mark activity', () => {
    editor.set(n.doc(n.p('<a>foo<b>')))
    expect(editor.marks.bold.isActive()).toBe(false)
    expect(editor.marks.italic.isActive()).toBe(false)

    editor.set(n.doc(n.p('<a>', m.bold('foo'), '<b>')))
    expect(editor.marks.bold.isActive()).toBe(true)
    expect(editor.marks.italic.isActive()).toBe(false)
  })

  it('can check mark activity for cross-paragraph selection', () => {
    editor.set(n.doc(n.p('<a>', m.bold('foo')), n.p(m.bold('foo'), '<b>')))

    expect(editor.marks.bold.isActive()).toBe(true)
    expect(editor.marks.italic.isActive()).toBe(false)
  })

  it('should not set isActive to true when only part of the text is marked', () => {
    editor.set(n.doc(n.p('<a>', 'foo', m.bold('bar'), 'baz', '<b>')))
    expect(editor.marks.bold.isActive()).toBe(false)

    editor.set(n.doc(n.p('<a>', m.bold('foo'), 'bar', '<b>')))
    expect(editor.marks.bold.isActive()).toBe(false)

    editor.set(n.doc(n.p('<a>', 'foo', m.bold('bar'), '<b>')))
    expect(editor.marks.bold.isActive()).toBe(false)

    editor.set(n.doc(n.p('<a>', m.bold('foo', 'bar'), '<b>')))
    expect(editor.marks.bold.isActive()).toBe(true)
  })

  it('should not set isActive to true when multiple empty paragraphs are selected', () => {
    editor.set(n.doc(n.p('<a>'), n.p(''), n.p('<b>')))
    expect(editor.marks.bold.isActive()).toBe(false)
  })
})
