import { expect, test, vi } from 'vitest'

import { combineEventHandlers } from './combine-event-handlers.ts'

test('runs handlers in reverse order and stops on true', () => {
  const handler1 = vi.fn(() => false)
  const handler2 = vi.fn(() => true)
  const handler3 = vi.fn(() => false)
  const [setHandlers, run] = combineEventHandlers<() => boolean>()
  setHandlers([handler1, handler2, handler3])
  expect(run()).toBe(true)
  expect(handler3).toHaveBeenCalled()
  expect(handler2).toHaveBeenCalled()
  expect(handler1).not.toHaveBeenCalled()
})

test('returns false when all handlers return false', () => {
  const handler1 = vi.fn(() => false)
  const handler2 = vi.fn(() => false)
  const [setHandlers, run] = combineEventHandlers<() => boolean>()
  setHandlers([handler1, handler2])
  expect(run()).toBe(false)
})
