// @vitest-environment node

import {
  createEditor,
  union,
} from '@prosekit/core'
import {
  describe,
  expect,
  it,
} from 'vitest'

import { defineBasicExtension } from './index'

describe('Node.js environment', () => {
  it('is not a browser environment', () => {
    expect(typeof window).toBe('undefined')
  })

  it('can work on Node.js', () => {
    // Create an extension
    const extension = union(defineBasicExtension())
    expect(extension).toBeDefined()

    // Create an editor
    const editor = createEditor({ extension })
    expect(editor).toBeDefined()
    expect(editor.mounted).toBe(false)

    // Set the document
    editor.setContent({
      type: 'doc',
      content: [
        { type: 'paragraph', content: [{ type: 'text', text: 'Hello, world!' }] },
      ],
    })
    expect(editor.state.doc.toJSON()).toMatchInlineSnapshot(`
      {
        "content": [
          {
            "content": [
              {
                "text": "Hello, world!",
                "type": "text",
              },
            ],
            "type": "paragraph",
          },
        ],
        "type": "doc",
      }
    `)

    // Execute a command
    editor.commands.insertImage({ src: 'https://example.com/image.png', width: 100, height: 100 })
    expect(editor.state.doc.toJSON()).toMatchInlineSnapshot(`
      {
        "content": [
          {
            "attrs": {
              "height": 100,
              "src": "https://example.com/image.png",
              "width": 100,
            },
            "type": "image",
          },
          {
            "content": [
              {
                "text": "Hello, world!",
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
