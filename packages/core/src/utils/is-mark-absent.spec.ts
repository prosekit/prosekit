import { expect, test } from 'vitest'

import { setupTest } from '../testing'

import { isMarkAbsent } from './is-mark-absent'

test('isMarkAbsent', () => {
  const { editor, m, n } = setupTest()

  const isBoldAbsent = () => {
    const markType = editor.schema.marks.bold
    const { doc, selection } = editor.state
    return isMarkAbsent(doc, selection.from, selection.to, markType)
  }

  editor.set(n.doc(n.p('<a>foo<b>')))
  expect(isBoldAbsent()).toBe(true)

  editor.set(n.doc(n.p('<a>', m.bold('foo'), '<b>')))
  expect(isBoldAbsent()).toBe(false)

  editor.set(n.doc(n.p('<a>', 'foo', m.bold('bar'), 'baz', '<b>')))
  expect(isBoldAbsent()).toBe(true)

  editor.set(n.doc(n.p('<a>', m.bold('foo'), 'bar', '<b>')))
  expect(isBoldAbsent()).toBe(true)

  editor.set(n.doc(n.p('<a>', 'foo', m.bold('bar'), '<b>')))
  expect(isBoldAbsent()).toBe(true)

  editor.set(n.doc(n.p('<a>'), n.p('foo'), n.p('<b>')))
  expect(isBoldAbsent()).toBe(true)

  editor.set(n.doc(n.p('<a>'), n.p('foo'), n.p(m.bold('bar')), n.p('<b>')))
  expect(isBoldAbsent()).toBe(true)

  editor.set(n.doc(n.p('<a>'), n.p(''), n.p(''), n.p('<b>')))
  expect(isBoldAbsent()).toBe(true)

  editor.set(
    n.doc(n.p('<a>'), n.p(m.bold('foo')), n.p(m.bold('bar')), n.p('<b>')),
  )
  expect(isBoldAbsent()).toBe(false)

  editor.set(n.doc(n.p('<a>'), n.p(m.bold('foo')), n.p(), n.p('<b>')))
  expect(isBoldAbsent()).toBe(false)

  editor.set(n.doc(n.codeBlock('<a>', 'foo', '<b>')))
  expect(isBoldAbsent()).toBe(true)
})
