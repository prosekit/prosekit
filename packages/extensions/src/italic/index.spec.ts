import {
  addBaseCommands,
  addDoc,
  addParagraph,
  addText,
  createEditor,
  defineExtension,
} from '@prosekit/core'
import { describe, expect, it } from 'vitest'

import { addItalic } from './index'

describe('command', () => {
  const extension = defineExtension([
    addDoc(),
    addParagraph(),
    addText(),
    addItalic(),
    addBaseCommands(),
  ])
  const editor = createEditor({ extension })
  const div = document.body.appendChild(document.createElement('div'))
  editor.mount(div)

  describe('toggleItalic', () => {
    it('can add and remove italic', () => {
      editor.commands.insertText({ text: 'Hello world' })
      editor.commands.selectAll()
      editor.commands.toggleItalic()
      expect(editor.view.state.doc.toJSON()).toMatchInlineSnapshot(`
        {
          "content": [
            {
              "content": [
                {
                  "marks": [
                    {
                      "type": "italic",
                    },
                  ],
                  "text": "Hello world",
                  "type": "text",
                },
              ],
              "type": "paragraph",
            },
          ],
          "type": "doc",
        }
      `)
      editor.commands.toggleItalic()
      expect(editor.view.state.doc.toJSON()).toMatchInlineSnapshot(`
        {
          "content": [
            {
              "content": [
                {
                  "text": "Hello world",
                  "type": "text",
                },
              ],
              "type": "paragraph",
            },
          ],
          "type": "doc",
        }
      `)
    })
  })
})
