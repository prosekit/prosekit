import {
  expect,
  test,
  vi,
} from 'vitest'

import { maybeRun } from './maybe-run'

test('executes function argument', () => {
  const fn = vi.fn((x: number) => x + 1)
  expect(maybeRun(fn, 2)).toBe(3)
  expect(fn).toHaveBeenCalledWith(2)
})

test('returns value when not a function', () => {
  // @ts-expect-error non-function values are unsupported by type signature
  expect(maybeRun(5)).toBe(5)
  // @ts-expect-error non-function values are unsupported by type signature
  expect(maybeRun(undefined)).toBeUndefined()
})
