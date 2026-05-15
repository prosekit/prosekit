import { describe, expect, it, vi } from 'vitest'

import { setupTest } from '../../testing/index.ts'

import { defineDOMEventHandler } from './dom-event.ts'

describe('defineDOMEventHandler', () => {
  it('should register and unregister event handlers dynamically', () => {
    const { editor } = setupTest()
    editor.blur()

    const handleFocus = vi.fn()
    const handleBlur = vi.fn()

    expect(handleFocus).toHaveBeenCalledTimes(0)
    expect(handleBlur).toHaveBeenCalledTimes(0)

    const disposeFocus = editor.use(defineFocusEventHandler(handleFocus))
    const disposeBlur = editor.use(defineBlurEventHandler(handleBlur))
    expect(handleFocus).toHaveBeenCalledTimes(0)
    expect(handleBlur).toHaveBeenCalledTimes(0)

    editor.focus()
    expect(handleFocus).toHaveBeenCalledTimes(1)
    expect(handleBlur).toHaveBeenCalledTimes(0)

    editor.blur()
    expect(handleFocus).toHaveBeenCalledTimes(1)
    expect(handleBlur).toHaveBeenCalledTimes(1)

    disposeFocus()
    expect(handleFocus).toHaveBeenCalledTimes(1)
    expect(handleBlur).toHaveBeenCalledTimes(1)

    editor.focus()
    expect(handleFocus).toHaveBeenCalledTimes(1)
    expect(handleBlur).toHaveBeenCalledTimes(1)

    editor.blur()
    expect(handleFocus).toHaveBeenCalledTimes(1)
    expect(handleBlur).toHaveBeenCalledTimes(2)

    disposeBlur()
    expect(handleFocus).toHaveBeenCalledTimes(1)
    expect(handleBlur).toHaveBeenCalledTimes(2)

    editor.focus()
    editor.blur()
    editor.focus()
    editor.blur()
    expect(handleFocus).toHaveBeenCalledTimes(1)
    expect(handleBlur).toHaveBeenCalledTimes(2)
  })
})

function defineFocusEventHandler(handler: VoidFunction) {
  return defineDOMEventHandler('focus', handler)
}

function defineBlurEventHandler(handler: VoidFunction) {
  return defineDOMEventHandler('blur', handler)
}
