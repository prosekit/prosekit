import { describe, expect, it, vi } from 'vitest'

import { setupTest } from '../../testing/index.ts'

import { defineFocusChangeHandler } from './focus.ts'

describe('defineFocusChangeHandler', () => {
  it('should call the handler when the editor is focused or blurred', () => {
    const { editor } = setupTest()
    editor.blur()

    const handleFocusChange = vi.fn()
    editor.use(defineFocusChangeHandler(handleFocusChange))

    expect(handleFocusChange).toHaveBeenCalledTimes(0)

    editor.focus()
    expect(handleFocusChange).toHaveBeenCalledTimes(1)
    expect(handleFocusChange).toHaveBeenLastCalledWith(true)

    editor.blur()
    expect(handleFocusChange).toHaveBeenCalledTimes(2)
    expect(handleFocusChange).toHaveBeenLastCalledWith(false)

    editor.focus()
    editor.focus()
    editor.focus()
    editor.focus()
    expect(handleFocusChange).toHaveBeenCalledTimes(3)
    expect(handleFocusChange).toHaveBeenLastCalledWith(true)

    editor.blur()
    editor.blur()
    editor.blur()
    editor.blur()
    expect(handleFocusChange).toHaveBeenCalledTimes(4)
    expect(handleFocusChange).toHaveBeenLastCalledWith(false)
  })
})
