import { expect, test } from 'vitest'

import { setupTest } from '../testing/index.ts'

import { getMarkRange } from './get-mark-range.ts'

const href = 'https://example.com'

test('getMarkRange finds the run touching the position', () => {
  const { editor, m, n } = setupTest()
  // 'AB' at 1..3, link 'CD' at 3..5, 'EF' at 5..7.
  editor.set(n.doc(n.p('AB', m.link({ href }, 'CD'), 'EF')))
  const range = (pos: number) => getMarkRange(editor.state.doc.resolve(pos), 'link')

  expect(range(4)).toMatchObject({ from: 3, to: 5 }) // inside
  expect(range(3)).toMatchObject({ from: 3, to: 5 }) // left edge
  expect(range(5)).toMatchObject({ from: 3, to: 5 }) // right edge
  expect(range(2)).toBeUndefined() // plain text before
  expect(range(6)).toBeUndefined() // plain text after
})

test('getMarkRange splits neighbouring marks that differ in attributes', () => {
  const { editor, m, n } = setupTest()
  // link 'CD' (href a) at 1..3, link 'EF' (href b) at 3..5.
  editor.set(n.doc(n.p(m.link({ href: 'a' }, 'CD'), m.link({ href: 'b' }, 'EF'))))

  // At the shared boundary the run to the right wins.
  expect(getMarkRange(editor.state.doc.resolve(3), 'link')).toMatchObject({ from: 3, to: 5 })
  // Inside the left run.
  expect(getMarkRange(editor.state.doc.resolve(2), 'link')).toMatchObject({ from: 1, to: 3 })
})

test('getMarkRange filters by attributes', () => {
  const { editor, m, n } = setupTest()
  editor.set(n.doc(n.p('AB', m.link({ href }, 'CD'), 'EF')))
  const $pos = editor.state.doc.resolve(4)

  expect(getMarkRange($pos, 'link', { href })).toMatchObject({ from: 3, to: 5 })
  expect(getMarkRange($pos, 'link', { href: 'other' })).toBeUndefined()
})

test('getMarkRange returns the matched mark', () => {
  const { editor, m, n } = setupTest()
  editor.set(n.doc(n.p('AB', m.link({ href }, 'CD'), 'EF')))

  const range = getMarkRange(editor.state.doc.resolve(4), 'link')
  expect(range?.mark.type.name).toBe('link')
  expect(range?.mark.attrs.href).toBe(href)
})
