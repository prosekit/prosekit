import { describe, expect, it, vi } from 'vitest'

import { createEditor } from '../../editor/editor.ts'
import { union } from '../../editor/union.ts'
import { defineTestExtension } from '../../testing/index.ts'

import { defineFocusChangeHandler } from './focus.ts'

describe('defineFocusChangeHandler', () => {
  it('should call the handler when the editor is focused or blurred', () => {
    const div = document.body.appendChild(document.createElement('div'))
    const handleFocusChange = vi.fn()

    const extension = union(
      defineTestExtension(),
      defineFocusChangeHandler(handleFocusChange),
    )
    const editor = createEditor({ extension })
    editor.mount(div)

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
