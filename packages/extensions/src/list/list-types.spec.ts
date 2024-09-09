import type { ListAttributes } from 'prosemirror-flat-list'
import { test } from 'vitest'

import { assertTypeEqual } from '../types/assert-type-equal'

import type { ListAttrs } from './list-types'

test('ListAttrs', () => {
  assertTypeEqual<keyof ListAttrs, keyof ListAttributes>(true)
})
