import { expect, test } from 'vitest'

import { objectEqual } from './object-equal'

test('objects with same keys and values are equal', () => {
  expect(objectEqual({ a: 1, b: 2 }, { a: 1, b: 2 })).toBe(true)
})

test('different keys result in inequality', () => {
  expect(objectEqual({ a: 1, b: 2 }, { a: 1, c: 2 })).toBe(false)
})

test('nested objects are compared recursively', () => {
  const obj1 = { a: { c: 3 }, b: 2 }
  const obj2 = { a: { c: 3 }, b: 2 }
  expect(objectEqual(obj1, obj2)).toBe(true)
})

test('nested objects with different values are not equal', () => {
  const obj1 = { a: { c: 3 }, b: 2 }
  const obj2 = { a: { c: 4 }, b: 2 }
  expect(objectEqual(obj1, obj2)).toBe(false)
})
