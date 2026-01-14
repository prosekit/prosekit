import { test } from 'vitest'

import { assertTypeEqual } from '../types/assert-type-equal'

import type { CellAttrs } from './table-spec'
import type { TableCellAttrs } from './table-types'

test('TableCellAttrs', () => {
  assertTypeEqual<keyof TableCellAttrs, keyof CellAttrs>(true)
})
