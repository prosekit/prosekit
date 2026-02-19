import { formatHTML } from 'diffable-html-snapshot'
import { describe, expect, it } from 'vitest'

import { setupTest } from './testing.ts'

describe('mathBlockSpec', () => {
  it('can serialize to HTML', () => {
    const { editor, n } = setupTest()
    editor.set(n.doc(n.mathBlock('E = mc^2')))
    const html = editor.getDocHTML()
    expect(formatHTML(html)).toMatchInlineSnapshot(
      `
      "
      <div>
        <div class="prosemirror-math-block">
          <pre>
            <code>
              E = mc^2
            </code>
          </pre>
        </div>
      </div>
      "
    `,
    )
  })

  it('can serialize to JSON', () => {
    const { editor, n } = setupTest()
    editor.set(n.doc(n.mathBlock('x^2 + y^2 = z^2')))
    const json = editor.getDocJSON()
    expect(json).toMatchInlineSnapshot(`
      {
        "content": [
          {
            "content": [
              {
                "text": "x^2 + y^2 = z^2",
                "type": "text",
              },
            ],
            "type": "mathBlock",
          },
        ],
        "type": "doc",
      }
    `)
  })

  it('can handle empty math block', () => {
    const { editor, n } = setupTest()
    editor.set(n.doc(n.mathBlock()))
    const json = editor.getDocJSON()
    expect(json).toMatchInlineSnapshot(`
      {
        "content": [
          {
            "type": "mathBlock",
          },
        ],
        "type": "doc",
      }
    `)
  })
})
