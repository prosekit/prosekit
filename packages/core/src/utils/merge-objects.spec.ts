import { expect, test } from 'vitest'

import { mergeObjects } from './merge-objects.ts'

// basic merge
test('merge simple objects', () => {
  const a = { a: 1 }
  const b = { b: 2 }
  expect(
    mergeObjects<{ a: number; b: number }>(a, b),
  ).toEqual({ a: 1, b: 2 })
})

// undefined values should be removed and overwritten
test('skip undefined values and override', () => {
  const a = { a: 1, b: undefined as number | undefined }
  const b = { b: 2 }
  expect(
    mergeObjects<{ a: number; b: number | undefined }>(a, b),
  ).toEqual({ a: 1, b: 2 })
})

// null or undefined arguments should be ignored
test('ignore null and undefined inputs', () => {
  const a = { a: 1 }
  expect(mergeObjects(null, undefined, a)).toEqual({ a: 1 })
})
