import { describe, expect, it } from 'vitest'

import { createCompositionEndTracker, defaultQueryBuilder, shouldIgnoreKeydownNearComposition } from './helpers.ts'

describe('defaultQueryBuilder', () => {
  it('can remove extra spaces', () => {
    const str = '   a   '
    const match = /.*/.exec(str)!
    expect(defaultQueryBuilder(match)).toMatchInlineSnapshot('"a"')
  })

  it('can remove punctuations', () => {
    const str = '   a   ~!@#$%^&*()_+`-={}|[]\\:;"\'<>?,./     b  '
    const match = /.*/.exec(str)!
    expect(defaultQueryBuilder(match)).toMatchInlineSnapshot('"a b"')
  })
})

describe('shouldIgnoreKeydownNearComposition', () => {
  function keydown(options: KeyboardEventInit & { keyCode: number }): KeyboardEvent {
    const { keyCode, ...init } = options
    const event = new KeyboardEvent('keydown', { cancelable: true, ...init })
    Object.defineProperty(event, 'keyCode', { value: keyCode })
    return event
  }

  it('ignores keydown while the view is composing', () => {
    const event = keydown({ key: 'Enter', keyCode: 13 })
    expect(shouldIgnoreKeydownNearComposition(event, true, createCompositionEndTracker(), false)).toBe(true)
  })

  it('ignores keydown with isComposing', () => {
    const event = keydown({ key: 'Enter', keyCode: 13, isComposing: true })
    expect(shouldIgnoreKeydownNearComposition(event, false, createCompositionEndTracker(), false)).toBe(true)
  })

  it('ignores keydown with keyCode 229', () => {
    const event = keydown({ key: 'Enter', keyCode: 229 })
    expect(shouldIgnoreKeydownNearComposition(event, false, createCompositionEndTracker(), false)).toBe(true)
  })

  it('on safari, ignores keydown within 500ms of compositionend and consumes the window', () => {
    const event = keydown({ key: 'Enter', keyCode: 13 })
    const tracker = createCompositionEndTracker()
    tracker.endedAt = event.timeStamp - 100
    expect(shouldIgnoreKeydownNearComposition(event, false, tracker, true)).toBe(true)
    expect(tracker.endedAt).toBe(-Infinity)
  })

  it('on safari, only ignores once', () => {
    const first = keydown({ key: 'Enter', keyCode: 13 })
    const tracker = createCompositionEndTracker()
    tracker.endedAt = first.timeStamp - 100
    expect(shouldIgnoreKeydownNearComposition(first, false, tracker, true)).toBe(true)
    const second = keydown({ key: 'Enter', keyCode: 13 })
    expect(shouldIgnoreKeydownNearComposition(second, false, tracker, true)).toBe(false)
  })

  it('on safari, does not ignore keydown 500ms after compositionend', () => {
    const event = keydown({ key: 'Enter', keyCode: 13 })
    const tracker = createCompositionEndTracker()
    tracker.endedAt = event.timeStamp - 600
    expect(shouldIgnoreKeydownNearComposition(event, false, tracker, true)).toBe(false)
  })

  it('off safari, does not ignore keydown right after compositionend', () => {
    const event = keydown({ key: 'Enter', keyCode: 13 })
    const tracker = createCompositionEndTracker()
    tracker.endedAt = event.timeStamp - 100
    expect(shouldIgnoreKeydownNearComposition(event, false, tracker, false)).toBe(false)
  })

  it('does not ignore keydown when no composition ever happened', () => {
    const event = keydown({ key: 'Enter', keyCode: 13 })
    expect(shouldIgnoreKeydownNearComposition(event, false, createCompositionEndTracker(), true)).toBe(false)
  })

  it('on safari, any keydown near compositionend consumes the window', () => {
    const arrow = keydown({ key: 'ArrowDown', keyCode: 40 })
    const tracker = createCompositionEndTracker()
    tracker.endedAt = arrow.timeStamp - 100
    expect(shouldIgnoreKeydownNearComposition(arrow, false, tracker, true)).toBe(true)
    const enter = keydown({ key: 'Enter', keyCode: 13 })
    expect(shouldIgnoreKeydownNearComposition(enter, false, tracker, true)).toBe(false)
  })
})
