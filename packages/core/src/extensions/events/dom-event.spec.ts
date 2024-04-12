import { describe, expect, it, vi } from 'vitest'

import { createEditor } from '../../editor/editor'
import { union } from '../../editor/union'
import { defineDoc } from '../doc'
import { defineParagraph } from '../paragraph'
import { defineText } from '../text'

import { defineDOMEventHandler } from './dom-event'

describe('defineDOMEventHandler', () => {
  it('should register and unregister event handlers dynamically', () => {
    const div = document.body.appendChild(document.createElement('div'))
    const handleFocus = vi.fn()
    const handleBlur = vi.fn()

    const extension = union([defineDoc(), defineText(), defineParagraph()])
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
    disposeBlur()
    expect(handleFocus).toHaveBeenCalledTimes(1)
    expect(handleBlur).toHaveBeenCalledTimes(1)

    editor.focus()
    editor.blur()
    expect(handleFocus).toHaveBeenCalledTimes(1)
    expect(handleBlur).toHaveBeenCalledTimes(1)
  })
})

function defineFocusEventHandler(handler: VoidFunction) {
  return defineDOMEventHandler('focus', handler)
}

function defineBlurEventHandler(handler: VoidFunction) {
  return defineDOMEventHandler('blur', handler)
}
