import { createEditor, defineBaseCommands, union } from '@prosekit/core'
import { describe, expect, it } from 'vitest'

import { defineDoc } from '../doc/index.ts'
import { defineParagraph } from '../paragraph/index.ts'
import { defineText } from '../text/index.ts'

import { defineHighlight } from './index.ts'

describe('command', () => {
  const extension = union(
    defineDoc(),
    defineParagraph(),
    defineText(),
    defineHighlight(),
    defineBaseCommands(),
  )
  const editor = createEditor({ extension })
  const div = document.body.appendChild(document.createElement('div'))
  editor.mount(div)

  describe('toggleHighlight', () => {
    it('can add and remove highlight', () => {
      editor.commands.insertText({ text: 'Hello world' })
      editor.commands.selectAll()
      editor.commands.toggleHighlight()
      expect(editor.view.state.doc.toJSON()).toMatchInlineSnapshot(`
        {
          "content": [
            {
              "content": [
                {
                  "marks": [
                    {
                      "type": "highlight",
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
      editor.commands.toggleHighlight()
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
