import {
  expect,
  test,
} from 'vitest'

import { cache } from './cache'

// ensures function executes only once

test('cache memoizes result', () => {
  let count = 0
  const fn = cache(() => ++count)
  expect(fn()).toBe(1)
  expect(fn()).toBe(1)
  expect(count).toBe(1)
})
