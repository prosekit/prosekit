// @vitest-environment node

import {
  createEditor,
  jsonFromHTML,
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

  it('cannot call HTML APIs by default', () => {
    const editor = setup()
    expect(() => editor.setContent('<p>Hello World</p>')).toThrow()
    expect(() => editor.getDocHTML()).toThrow()
  })

  it('can call HTML APIs using jsdom', async () => {
    const { JSDOM } = await import('jsdom')
    const dom = new JSDOM('')
    const document = dom.window.document

    const editor = setup()
    const json = jsonFromHTML('<p>Hello World</p>', { document, schema: editor.schema })
    editor.setContent(json)
    editor.commands.insertHeading({ level: 2 })
    expect(editor.getDocHTML({ document })).toMatchInlineSnapshot(`"<div><h2></h2><p>Hello World</p></div>"`)
  })

  it('can call HTML APIs using happy-dom', async () => {
    const { Window } = await import('happy-dom')
    const window = new Window()
    // @ts-expect-error - happy-dom types are not compatible with DOM types
    const document: Document = window.document

    const editor = setup()
    const json = jsonFromHTML('<p>Hello World</p>', { document, schema: editor.schema })
    editor.setContent(json)
    editor.commands.insertHeading({ level: 2 })
    expect(editor.getDocHTML({ document })).toMatchInlineSnapshot(`"<div><h2></h2><p>Hello World</p></div>"`)
  })
})

function setup() {
  const extension = union(defineBasicExtension())
  const editor = createEditor({ extension })
  return editor
}
