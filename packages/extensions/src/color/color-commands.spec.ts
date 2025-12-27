import {
  describe,
  expect,
  it,
} from 'vitest'

import { setupTest } from '../testing'

describe('addColor', () => {
  it('can add color to text', () => {
    const { editor, n } = setupTest()
    editor.set(n.doc(
      n.p('Hello <a>world</b>'),
    ))

    expect(editor.getDocJSON()).toMatchInlineSnapshot(`
      {
        "content": [
          {
            "content": [
              {
                "text": "Hello world</b>",
                "type": "text",
              },
            ],
            "type": "paragraph",
          },
        ],
        "type": "doc",
      }
    `)
    editor.commands.addColor({ color: 'red' })
    expect(editor.getDocJSON()).toMatchInlineSnapshot(`
      {
        "content": [
          {
            "content": [
              {
                "text": "Hello world</b>",
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

describe('removeColor', () => {
  it('can remove color from text', () => {
    const { editor, n, m } = setupTest()
    editor.set(n.doc(
      n.p(
        'A',
        m.color({ color: 'red' }, 'B<a>C'),
        m.color({ color: 'blue' }, 'DE'),
        'F<b>G',
      ),
    ))

    expect(editor.getDocJSON()).toMatchInlineSnapshot(`
      {
        "content": [
          {
            "content": [
              {
                "text": "A",
                "type": "text",
              },
              {
                "marks": [
                  {
                    "attrs": {
                      "color": "red",
                    },
                    "type": "color",
                  },
                ],
                "text": "BC",
                "type": "text",
              },
              {
                "marks": [
                  {
                    "attrs": {
                      "color": "blue",
                    },
                    "type": "color",
                  },
                ],
                "text": "DE",
                "type": "text",
              },
              {
                "text": "FG",
                "type": "text",
              },
            ],
            "type": "paragraph",
          },
        ],
        "type": "doc",
      }
    `)
    editor.commands.removeColor()
    expect(editor.getDocJSON()).toMatchInlineSnapshot(`
      {
        "content": [
          {
            "content": [
              {
                "text": "A",
                "type": "text",
              },
              {
                "marks": [
                  {
                    "attrs": {
                      "color": "red",
                    },
                    "type": "color",
                  },
                ],
                "text": "B",
                "type": "text",
              },
              {
                "text": "CDEFG",
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
