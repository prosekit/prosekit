import { formatHTML } from 'diffable-html-snapshot'
import { describe, expect, it } from 'vitest'

import { setupTest } from './testing.ts'

describe('mathInlineSpec', () => {
  it('can serialize to HTML', () => {
    const { editor, n } = setupTest()
    editor.set(n.doc(n.paragraph(n.mathInline('x^2'))))
    const html = editor.getDocHTML()
    expect(formatHTML(html)).toMatchInlineSnapshot(
      `
      "
      <div>
        <p>
          <span class="prosemirror-math-inline">
            <code>
              x^2
            </code>
          </span>
        </p>
      </div>
      "
    `,
    )
  })

  it('can serialize to JSON', () => {
    const { editor, n } = setupTest()
    editor.set(n.doc(n.paragraph(n.mathInline(String.raw`\alpha + \beta`))))
    const json = editor.getDocJSON()
    expect(json).toMatchInlineSnapshot(String.raw`
      {
        "content": [
          {
            "content": [
              {
                "content": [
                  {
                    "text": "\alpha + \beta",
                    "type": "text",
                  },
                ],
                "type": "mathInline",
              },
            ],
            "type": "paragraph",
          },
        ],
        "type": "doc",
      }
    `)
  })

  it('can handle empty math inline', () => {
    const { editor, n } = setupTest()
    editor.set(n.doc(n.paragraph(n.mathInline())))
    const json = editor.getDocJSON()
    expect(json).toMatchInlineSnapshot(`
      {
        "content": [
          {
            "content": [
              {
                "type": "mathInline",
              },
            ],
            "type": "paragraph",
          },
        ],
        "type": "doc",
      }
    `)
  })

  it('can be mixed with regular text', () => {
    const { editor, n } = setupTest()
    editor.set(n.doc(n.paragraph('The formula ', n.mathInline('E=mc^2'), ' is famous.')))
    const json = editor.getDocJSON()
    expect(json).toMatchInlineSnapshot(`
      {
        "content": [
          {
            "content": [
              {
                "text": "The formula ",
                "type": "text",
              },
              {
                "content": [
                  {
                    "text": "E=mc^2",
                    "type": "text",
                  },
                ],
                "type": "mathInline",
              },
              {
                "text": " is famous.",
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
