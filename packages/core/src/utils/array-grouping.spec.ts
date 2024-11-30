import {
  expect,
  test,
} from 'vitest'

import {
  groupBy,
  groupEntries,
} from './array-grouping'

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

test('groupBy', () => {
  expect(groupBy([1, 2, 3, 4, 5], (n) => n % 2)).toEqual({
    0: [2, 4],
    1: [1, 3, 5],
  })
})
