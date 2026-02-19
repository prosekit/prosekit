import { expect, test } from 'vitest'

import { groupEntries } from './array-grouping.ts'

test('groupEntries', () => {
  expect(
    groupEntries([
      ['a', 1],
      ['b', 2],
      ['a', 3],
    ]),
  ).toEqual({
    a: [1, 3],
    b: [2],
  })
})
