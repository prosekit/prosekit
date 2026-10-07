import { expect, test } from 'vitest'

import { setupTest } from '../testing/index.ts'

import { findMarkRange } from './find-mark-range.ts'

test('findMarkRange finds the run whose mark matches the predicate', () => {
  const { editor, m, n } = setupTest()
  // 'AB' at 1..3, link 'CD' at 3..5, 'EF' at 5..7.
  editor.set(n.doc(n.p('AB', m.link({ href: 'https://example.com' }, 'CD'), 'EF')))
  const $pos = editor.state.doc.resolve(4)

  const range = findMarkRange($pos, (mark) => mark.type.name === 'link')
  expect(range).toMatchObject({ from: 3, to: 5 })
  expect(range?.mark.attrs.href).toBe('https://example.com')

  expect(findMarkRange($pos, () => false)).toBeUndefined()
})
