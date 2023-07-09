import { test } from 'vitest'

import { assertTypeEqual } from './assert-type-equal'
import { ExtractKey } from './extract-key'

test('ExtractKey', () => {
  type T1 =
    | {
        x: 'A'
      }
    | {
        x: 'B'
        y: 'C'
      }
    | {
        y: 'D'
      }

  type T2 = ExtractKey<T1, 'x'>
  type T3 = ExtractKey<T1, 'y'>
  type T4 = ExtractKey<T1, 'z'>

  assertTypeEqual<T2, 'A' | 'B'>(true)
  assertTypeEqual<T3, 'C' | 'D'>(true)
  assertTypeEqual<T4, never>(true)
})
