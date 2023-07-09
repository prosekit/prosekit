import { describe, it, expect } from 'vitest'

import { addDoc } from '../extensions/doc'
import { addParagraph } from '../extensions/paragraph'
import { addText } from '../extensions/text'

import { createEditor } from './editor'

describe('createEditor', () => {
  it('can mount the editor', () => {
    const div = document.body.appendChild(document.createElement('div'))
    const extension = [addDoc(), addText(), addParagraph()]
    const editor = createEditor({ extension: { extension } })
    editor.mount(div)
    expect(div.outerHTML).toMatchInlineSnapshot(
      '"<div contenteditable=\\"true\\" translate=\\"no\\" class=\\"ProseMirror\\"><p><br class=\\"ProseMirror-trailingBreak\\"></p></div>"',
    )
  })
})
