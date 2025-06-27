// @vitest-environment node

import { createEditor } from '@prosekit/core'
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
    const extension = defineBasicExtension()
    const editor = createEditor({ extension })

    expect(editor).toBeDefined()
    expect(editor.mounted).toBe(false)
  })

  it('can call editor.setContent() with a JSON object', () => {
    const extension = defineBasicExtension()
    const editor = createEditor({ extension })

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
    const extension = defineBasicExtension()
    const editor = createEditor({ extension })

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

  it('cannot call HTML APIs by default', () => {
    const extension = defineBasicExtension()
    const editor = createEditor({ extension })

    expect(() => editor.setContent('<p>Hello World</p>')).toThrow()
    expect(() => editor.getDocHTML()).toThrow()
  })

  it('can call HTML APIs using jsdom', async () => {
    const extension = defineBasicExtension()
    const editor = createEditor({ extension })

    const { JSDOM } = await import('jsdom')
    const dom = new JSDOM('')
    const document: Document = dom.window.document

    editor.setContent({
      type: 'doc',
      content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Foo' }] }],
    })
    editor.commands.insertText({ text: 'Bar' })
    expect(editor.getDocHTML({ document })).toMatchInlineSnapshot(`"<div><p>BarFoo</p></div>"`)
  })

  it('can call HTML APIs using happy-dom', async () => {
    const extension = defineBasicExtension()
    const editor = createEditor({ extension })

    const { Window } = await import('happy-dom')
    const window = new Window()
    // @ts-expect-error - happy-dom types are not compatible with DOM types
    const document: Document = window.document

    editor.setContent({
      type: 'doc',
      content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Foo' }] }],
    })
    editor.commands.insertText({ text: 'Bar' })
    expect(editor.getDocHTML({ document })).toMatchInlineSnapshot(`"<div><p>BarFoo</p></div>"`)
  })
})
