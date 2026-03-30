import { expect, test } from 'vitest'

import { isSubset } from './is-subset.ts'

test('isSubset', () => {
  expect(isSubset({ a: 1, b: 2 }, { a: 1, b: 2, c: 3 })).toBe(true)
  expect(isSubset({ a: 1, b: 2, c: 3 }, { a: 1, b: 2 })).toBe(false)
  expect(isSubset({ a: 1, b: 2, c: 3 }, { a: 1, b: 2, c: 4 })).toBe(false)
})
