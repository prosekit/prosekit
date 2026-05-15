import { defineBaseCommands, union } from '@prosekit/core'
import { describe, expect, it } from 'vitest'

import { defineDoc } from '../doc/index.ts'
import { defineParagraph } from '../paragraph/index.ts'
import { setupTestFromExtension } from '../testing/index.ts'
import { defineText } from '../text/index.ts'

import { defineItalic } from './index.ts'

describe('command', () => {
  const { editor } = setupTestFromExtension(union(
    defineDoc(),
    defineParagraph(),
    defineText(),
    defineItalic(),
    defineBaseCommands(),
  ))

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
