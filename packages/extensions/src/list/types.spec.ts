import type { ListAttributes } from 'prosemirror-flat-list'
import { test } from 'vitest'

import { assertTypeEqual } from '../types/assert-type-equal'

import type { ListAttrs } from './types'

test('ListAttrs', () => {
  assertTypeEqual<ListAttrs, ListAttributes>(true)
})
