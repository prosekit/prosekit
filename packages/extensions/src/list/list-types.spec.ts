import type { ListAttributes } from 'prosemirror-flat-list'
import { test } from 'vitest'

import { assertTypeEqual } from '../types/assert-type-equal.ts'

import type { ListAttrs } from './list-types.ts'

test('ListAttrs', () => {
  assertTypeEqual<keyof ListAttrs, keyof ListAttributes>(true)
})
