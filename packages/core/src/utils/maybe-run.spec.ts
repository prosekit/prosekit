import { expect, test, vi } from 'vitest'

import { maybeRun } from './maybe-run.ts'

test('executes function argument', () => {
  const fn = vi.fn((x: number) => x + 1)
  expect(maybeRun(fn, 2)).toBe(3)
  expect(fn).toHaveBeenCalledWith(2)
})

test('returns value when not a function', () => {
  expect(maybeRun(5)).toBe(5)
  expect(maybeRun(undefined)).toBeUndefined()
})

test('provides precise inference', () => {
  const fn: () => number = () => 1
  const num = 2
  const input: number | (() => number) = Math.random() > 0.5 ? fn : num
  const result: number = maybeRun(input)
  expect(result).toBeTypeOf('number')
})

test('can prevent unexpected arguments', () => {
  const fn: (num: number) => number = (num) => num + 1

  // @ts-expect-error: unexpected string argument
  maybeRun(fn, 'string')

  // @ts-expect-error: unexpected argument count
  maybeRun(fn)

  // @ts-expect-error: unexpected argument count
  maybeRun(fn, 1, 2)
})
