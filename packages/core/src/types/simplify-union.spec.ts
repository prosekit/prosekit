import { test } from 'vitest'

import { assertTypeEqual } from './assert-type-equal'
import { SimplifyUnion } from './simplify-union'

test('SimplifyUnion', () => {
  type T1 =
    | {
        a: string
      }
    | {
        b: string
      }

  type T2 = {
    a: string
    b: string
  }

  type T3 = SimplifyUnion<T1>

  assertTypeEqual<T1, T1>(true)
  assertTypeEqual<T1, T2>(false)

  assertTypeEqual<T1, T3>(false)
  assertTypeEqual<T2, T3>(true)
})
