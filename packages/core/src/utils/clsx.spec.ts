import { expect, test } from 'vitest'

import { clsx } from './clsx'

test('joins class names', () => {
  expect(clsx('foo', 'bar')).toBe('foo bar')
})

test('filters falsy values', () => {
  expect(clsx('foo', false, null, undefined, 'baz')).toBe('foo baz')
})
