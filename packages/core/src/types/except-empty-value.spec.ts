import { test } from 'vitest'

import { assertTypeEqual } from './assert-type-equal'
import { type ExceptEmptyValue } from './except-empty-value'

test('ExceptEmptyValue', () => {
  type T1 = {
    a: 'A'
    b: undefined
    c: null
    d: never
    f: Omit<{ x: string }, 'x'>
  }

  type T2 = ExceptEmptyValue<T1>

  assertTypeEqual<T2, { a: 'A' }>(true)
})
