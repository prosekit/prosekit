import { describe, expect, it } from 'vitest'

import { setupTest } from '../testing/index.ts'

describe('command', () => {
  const { editor } = setupTest()

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
