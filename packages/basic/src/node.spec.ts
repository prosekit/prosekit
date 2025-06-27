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

  it('can create an editor', () => {
    const editor = setup()
    expect(editor).toBeDefined()
    expect(editor.mounted).toBe(false)
  })

  it('can call editor.setContent() with a JSON object', () => {
    const editor = setup()

    // Set the document
    editor.setContent({
      type: 'doc',
      content: [
        { type: 'paragraph', content: [{ type: 'text', text: 'Hello, world!' }] },
      ],
    })
    expect(editor.getDocJSON()).toMatchInlineSnapshot(`
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
  })

  it('can execute a command', () => {
    const editor = setup()

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
            "type": "paragraph",
          },
        ],
        "type": "doc",
      }
    `)
  })

  it('cannot call editor.getDocHTML()', () => {
    const editor = setup()

    // Call an API that needs a browser environment
    expect(() => editor.getDocHTML()).toThrow()
    expect(() => editor.getDocJSON()).not.toThrow()
  })
})

function setup() {
  const extension = union(defineBasicExtension())
  const editor = createEditor({ extension })
  return editor
}
