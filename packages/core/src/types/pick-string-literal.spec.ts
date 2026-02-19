import { test } from 'vitest'

import { assertTypeEqual } from './assert-type-equal.ts'
import type { PickStringLiteral } from './pick-string-literal.ts'

test('PickStringLiteral', () => {
  assertTypeEqual<PickStringLiteral<'foo'>, 'foo'>(true)
  assertTypeEqual<PickStringLiteral<'foo' | 'bar'>, 'foo' | 'bar'>(true)
  assertTypeEqual<PickStringLiteral<string>, never>(true)
})
