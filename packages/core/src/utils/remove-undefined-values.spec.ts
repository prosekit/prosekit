import { expect, test } from 'vitest'

import { removeUndefinedValues } from './remove-undefined-values'

test('removeUndefinedValues', () => {
  const obj1 = { a: 1, b: undefined, c: null }
  const obj2 = { a: 1, c: null }

  expect(Object.keys(obj1).length).toEqual(3)
  expect(Object.keys(obj2).length).toEqual(2)
  expect(removeUndefinedValues(obj1)).toEqual(obj2)
})
