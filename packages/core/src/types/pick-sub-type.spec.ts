import { test } from 'vitest'

import { assertTypeEqual } from './assert-type-equal.ts'
import type { PickSubType } from './pick-sub-type.ts'

test('PickSubType', () => {
  assertTypeEqual<PickSubType<'abc', string>, 'abc'>(true)
  assertTypeEqual<PickSubType<'abc' | 'def', string>, 'abc' | 'def'>(true)
  assertTypeEqual<PickSubType<123, string>, never>(true)
  assertTypeEqual<PickSubType<string, string>, never>(true)

  assertTypeEqual<PickSubType<{ foo: 1 }, Record<string, number>>, { foo: 1 }>(
    true,
  )
  assertTypeEqual<PickSubType<{ foo: 1 }, Record<string, string>>, never>(true)
  assertTypeEqual<
    PickSubType<Record<string, number>, Record<string, string>>,
    never
  >(true)
})
