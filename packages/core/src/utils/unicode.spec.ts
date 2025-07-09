import {
  expect,
  test,
} from 'vitest'

import { OBJECT_REPLACEMENT_CHARACTER } from './unicode'

test('constant value', () => {
  expect(OBJECT_REPLACEMENT_CHARACTER).toBe('\uFFFC')
})
