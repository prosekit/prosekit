import { describe, expect, it, vi } from 'vitest'

import { createEditor } from '../../editor/editor'
import { defineTestExtension } from '../../testing'

import { defineDOMEventHandler } from './dom-event'

describe('defineDOMEventHandler', () => {
  it('should register and unregister event handlers dynamically', () => {
    const div = document.body.appendChild(document.createElement('div'))
    const handleFocus = vi.fn()
    const handleBlur = vi.fn()

    const extension = defineTestExtension()
    const editor = createEditor({ extension })
    editor.mount(div)

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
