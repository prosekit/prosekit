import { formatHTML } from 'diffable-html-snapshot'
import { describe, expect, it } from 'vitest'

import { setupTest } from '../testing/index.ts'

describe('defineSubSupSpec', () => {
  it('should render subscript and superscript marks', () => {
    const { editor, n, m } = setupTest()

    const doc = n.doc(
      n.p(
        'H',
        m.subscript('2'),
        'O and x',
        m.superscript('2'),
      ),
    )

    editor.set(doc)
    expect(formatHTML(editor.view.dom.innerHTML)).toMatchInlineSnapshot(`
      "
      <p>
        H
        <sub>
          2
        </sub>
        O and x
        <sup>
          2
        </sup>
      </p>
      "
    `)
  })

  it('should parse subscript and superscript tags', () => {
    const { editor } = setupTest()

    editor.setContent('<p>H<sub>2</sub>O and x<sup>2</sup></p>')
    expect(editor.getDocJSON()).toMatchInlineSnapshot(`
      {
        "content": [
          {
            "content": [
              {
                "text": "H",
                "type": "text",
              },
              {
                "marks": [
                  {
                    "type": "subscript",
                  },
                ],
                "text": "2",
                "type": "text",
              },
              {
                "text": "O and x",
                "type": "text",
              },
              {
                "marks": [
                  {
                    "type": "superscript",
                  },
                ],
                "text": "2",
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
