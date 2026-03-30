import { formatHTML } from 'diffable-html-snapshot'
import { describe, expect, it } from 'vitest'

import { setupTest } from '../testing/index.ts'

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

  it('should parse color from style attribute', () => {
    const { editor } = setupTest()

    const html = `<p><span style="color: #0000ff;">text</span></p>`
    editor.setContent(html)
    expect(editor.state.doc.firstChild?.firstChild?.toJSON()).toMatchInlineSnapshot(`
      {
        "marks": [
          {
            "attrs": {
              "color": "rgb(0, 0, 255)",
            },
            "type": "textColor",
          },
        ],
        "text": "text",
        "type": "text",
      }
    `)
  })

  it('should parse color from data-text-color attribute', () => {
    const { editor } = setupTest()

    const html = `<p><span data-text-color="rgb(0 0 255 / 0.5)">text</span></p>`
    editor.setContent(html)
    expect(editor.state.doc.firstChild?.firstChild?.toJSON()).toMatchInlineSnapshot(`
      {
        "marks": [
          {
            "attrs": {
              "color": "rgb(0 0 255 / 0.5)",
            },
            "type": "textColor",
          },
        ],
        "text": "text",
        "type": "text",
      }
    `)
  })

  it('should prioritize data-text-color attribute over style attribute', () => {
    const { editor } = setupTest()

    const html = `<p><span style="color: blue;" data-text-color="red">This should be red</span></p>`
    editor.setContent(html)
    expect(editor.state.doc.firstChild?.firstChild?.toJSON()).toMatchInlineSnapshot(`
      {
        "marks": [
          {
            "attrs": {
              "color": "red",
            },
            "type": "textColor",
          },
        ],
        "text": "This should be red",
        "type": "text",
      }
    `)
  })

  it('can handle non-span inline elements', () => {
    const { editor } = setupTest()

    const html = `<p>`
      + `<i><span style="color: red;">This should be red and italic</span></i>`
      + `<span style="color: green;"><i>This should be green and italic</i></span>`
      + `<b style="color: blue;">This should be blue and bold</b>`
      + `</p>`
    editor.setContent(html)
    expect(editor.state.doc.firstChild?.toJSON()).toMatchInlineSnapshot(`
      {
        "content": [
          {
            "marks": [
              {
                "attrs": {
                  "color": "red",
                },
                "type": "textColor",
              },
              {
                "type": "italic",
              },
            ],
            "text": "This should be red and italic",
            "type": "text",
          },
          {
            "marks": [
              {
                "attrs": {
                  "color": "green",
                },
                "type": "textColor",
              },
              {
                "type": "italic",
              },
            ],
            "text": "This should be green and italic",
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
              {
                "type": "bold",
              },
            ],
            "text": "This should be blue and bold",
            "type": "text",
          },
        ],
        "type": "paragraph",
      }
    `)
  })

  it('should ignore empty attributes', () => {
    const { editor } = setupTest()

    const html = `<p><span data-text-color="" style="color: ;">This should be plain text</span></p>`
    editor.setContent(html)
    expect(editor.state.doc.firstChild?.firstChild?.toJSON()).toMatchInlineSnapshot(`
      {
        "text": "This should be plain text",
        "type": "text",
      }
    `)
  })

  it('should ignore inherit attributes', () => {
    const { editor } = setupTest()

    const html = `<p><span data-text-color="inherit" style="color: inherit;">This should be plain text</span></p>`
    editor.setContent(html)
    expect(editor.state.doc.firstChild?.firstChild?.toJSON()).toMatchInlineSnapshot(`
      {
        "text": "This should be plain text",
        "type": "text",
      }
    `)
  })

  it('can handle block elements', () => {
    const { editor } = setupTest()

    const html = `<blockquote style="color: red;">`
      + `<p>This should be red</p>`
      + `<blockquote style="color: blue;">`
      + `<p>This should be blue</p>`
      + `</blockquote>`
      + `<p>This should be red again</p>`
      + `</blockquote>`

    editor.setContent(html)
    expect(editor.state.doc.firstChild?.toJSON()).toMatchInlineSnapshot(`
      {
        "content": [
          {
            "content": [
              {
                "marks": [
                  {
                    "attrs": {
                      "color": "red",
                    },
                    "type": "textColor",
                  },
                ],
                "text": "This should be red",
                "type": "text",
              },
            ],
            "type": "paragraph",
          },
          {
            "content": [
              {
                "content": [
                  {
                    "marks": [
                      {
                        "attrs": {
                          "color": "blue",
                        },
                        "type": "textColor",
                      },
                    ],
                    "text": "This should be blue",
                    "type": "text",
                  },
                ],
                "type": "paragraph",
              },
            ],
            "type": "blockquote",
          },
          {
            "content": [
              {
                "marks": [
                  {
                    "attrs": {
                      "color": "red",
                    },
                    "type": "textColor",
                  },
                ],
                "text": "This should be red again",
                "type": "text",
              },
            ],
            "type": "paragraph",
          },
        ],
        "type": "blockquote",
      }
    `)
  })
})
