import OrderedMap from 'orderedmap'
import {
  expect,
  test,
} from 'vitest'

import { deepEquals } from './deep-equals'

test('arrays with equal values are equal', () => {
  expect(deepEquals([1, 2], [1, 2])).toBe(true)
  expect(deepEquals([1, 2], [2, 1])).toBe(false)
})

test('nested objects', () => {
  const a = { a: 1, b: { c: 3 } }
  const b = { a: 1, b: { c: 3 } }
  const c = { a: 1, b: { c: 4 } }
  expect(deepEquals(a, b)).toBe(true)
  expect(deepEquals(a, c)).toBe(false)
})

test('ordered maps', () => {
  const map1 = OrderedMap.from({ a: 1, b: 2 })
  const map2 = OrderedMap.from({ a: 1, b: 2 })
  expect(deepEquals(map1, map2)).toBe(true)
})
