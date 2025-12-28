import formatHTML from 'diffable-html'
import {
  describe,
  expect,
  it,
} from 'vitest'

import { setupTest } from '../testing'

describe('defineTextColorSpec', () => {
  it('should render color as inline span with style attribute', () => {
    const { editor, n, m } = setupTest()

    const doc = n.doc(
      n.p(
        'Default',
        m.textColor({ color: '#0000ff' }, 'hex'),
        m.textColor({ color: 'blue' }, 'named'),
        m.textColor({ color: 'rgb(0, 0, 255)' }, 'rgb'),
        m.textColor({ color: 'rgba(0 0 255 / 0.5)' }, 'rgba'),
        m.textColor({ color: 'hsl(240 100% 50% / 0.5)' }, 'hsl'),
        m.textColor({ color: 'var(--color-variable)' }, 'variable'),
      ),
    )
    editor.set(doc)
    expect(formatHTML(editor.view.dom.innerHTML)).toMatchInlineSnapshot(
      `
      "
      <p>
        Default
        <span
          data-text-color="#0000ff"
          style="color: rgb(0, 0, 255);"
        >
          hex
        </span>
        <span
          data-text-color="blue"
          style="color: blue;"
        >
          named
        </span>
        <span
          data-text-color="rgb(0, 0, 255)"
          style="color: rgb(0, 0, 255);"
        >
          rgb
        </span>
        <span
          data-text-color="rgba(0 0 255 / 0.5)"
          style="color: rgba(0, 0, 255, 0.5);"
        >
          rgba
        </span>
        <span
          data-text-color="hsl(240 100% 50% / 0.5)"
          style="color: rgba(0, 0, 255, 0.5);"
        >
          hsl
        </span>
        <span
          data-text-color="var(--color-variable)"
          style="color: var(--color-variable);"
        >
          variable
        </span>
      </p>
      "
    `,
    )
  })

  it('should parse color from inline span with style attribute', () => {
    const { editor, n, m } = setupTest()

    const html = `
      <p>
        Default
        <span style="color: #0000ff;">hex</span>
        <span style="color: blue">named</span>
        <span style="color: rgb(0, 0, 255)">rgb</span>
        <span style="color: rgba(0 0 255 / 0.5)">rgba</span>
        <i style="color: hsl(240 100% 50% / 0.5)">hsl</i>
        <strong style="color: var(--color-variable)">variable</strong>
      </p>    
    `
    editor.setContent(html)
    expect(editor.getDocJSON()).toMatchInlineSnapshot(`
      {
        "content": [
          {
            "content": [
              {
                "text": "Default ",
                "type": "text",
              },
              {
                "marks": [
                  {
                    "attrs": {
                      "color": "rgb(0, 0, 255)",
                    },
                    "type": "textColor",
                  },
                ],
                "text": "hex",
                "type": "text",
              },
              {
                "text": " ",
                "type": "text",
              },
              {
                "marks": [
                  {
                    "attrs": {
                      "color": "blue",
                    },
                    "type": "textColor",
                  },
                ],
                "text": "named",
                "type": "text",
              },
              {
                "text": " ",
                "type": "text",
              },
              {
                "marks": [
                  {
                    "attrs": {
                      "color": "rgb(0, 0, 255)",
                    },
                    "type": "textColor",
                  },
                ],
                "text": "rgb",
                "type": "text",
              },
              {
                "text": " ",
                "type": "text",
              },
              {
                "marks": [
                  {
                    "attrs": {
                      "color": "rgba(0, 0, 255, 0.5)",
                    },
                    "type": "textColor",
                  },
                ],
                "text": "rgba",
                "type": "text",
              },
              {
                "text": " ",
                "type": "text",
              },
              {
                "marks": [
                  {
                    "attrs": {
                      "color": "rgba(0, 0, 255, 0.5)",
                    },
                    "type": "textColor",
                  },
                  {
                    "type": "italic",
                  },
                ],
                "text": "hsl",
                "type": "text",
              },
              {
                "text": " ",
                "type": "text",
              },
              {
                "marks": [
                  {
                    "attrs": {
                      "color": "var(--color-variable)",
                    },
                    "type": "textColor",
                  },
                  {
                    "type": "bold",
                  },
                ],
                "text": "variable",
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
