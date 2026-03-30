import type { Simplify } from 'type-fest'
import { test } from 'vitest'

import { assertTypeEqual } from './assert-type-equal.ts'
import type { SimplifyDeeper } from './simplify-deeper.ts'

test('SimplifyDeeper', () => {
  type T1 = {
    nodeA: {
      attr1: string
    } & {
      attr2: string
    }
  } & {
    nodeB: {
      attr3: string
    } & {
      attr4: string
    }
  }
  interface T2 {
    nodeA: {
      attr1: string
      attr2: string
    }
    nodeB: {
      attr3: string
      attr4: string
    }
  }

  assertTypeEqual<T1, T1>(true)
  assertTypeEqual<T1, T2>(false)

  assertTypeEqual<T1, SimplifyDeeper<T1>>(false)
  assertTypeEqual<T2, SimplifyDeeper<T1>>(true)

  assertTypeEqual<T1, Simplify<T1>>(false)
  assertTypeEqual<T2, Simplify<T1>>(false)
})
