import { formatHTML } from 'diffable-html-snapshot'
import { describe, expect, it } from 'vitest'

import { setupTest } from '../testing/index.ts'

describe('defineFontFamilySpec', () => {
  it('should render font-family as inline span with style attribute', () => {
    const { editor, n, m } = setupTest()

    const doc = n.doc(
      n.p(
        'Default',
        m.fontFamily({ family: 'Arial' }, 'arial'),
        m.fontFamily({ family: 'Times New Roman' }, 'times'),
        m.fontFamily({ family: 'Courier New, monospace' }, 'monospace'),
      ),
    )
    editor.set(doc)
    expect(formatHTML(editor.view.dom.innerHTML)).toMatchInlineSnapshot(
      `
      "
      <p>
        Default
        <span
          data-font-family="Arial"
          style="font-family: Arial;"
        >
          arial
        </span>
        <span
          data-font-family="Times New Roman"
          style="font-family: &quot;Times New Roman&quot;;"
        >
          times
        </span>
        <span
          data-font-family="Courier New, monospace"
          style="font-family: &quot;Courier New&quot;, monospace;"
        >
          monospace
        </span>
      </p>
      "
    `,
    )
  })

  it('should parse font-family from style attribute', () => {
    const { editor } = setupTest()

    const html = `<p><span style="font-family: Arial;">text</span></p>`
    editor.setContent(html)
    expect(editor.state.doc.firstChild?.firstChild?.toJSON()).toMatchInlineSnapshot(`
      {
        "marks": [
          {
            "attrs": {
              "family": "Arial",
            },
            "type": "fontFamily",
          },
        ],
        "text": "text",
        "type": "text",
      }
    `)
  })

  it('should parse font-family from data-font-family attribute', () => {
    const { editor } = setupTest()

    const html = `<p><span data-font-family="Times New Roman">text</span></p>`
    editor.setContent(html)
    expect(editor.state.doc.firstChild?.firstChild?.toJSON()).toMatchInlineSnapshot(`
      {
        "marks": [
          {
            "attrs": {
              "family": "Times New Roman",
            },
            "type": "fontFamily",
          },
        ],
        "text": "text",
        "type": "text",
      }
    `)
  })

  it('should prioritize data-font-family attribute over style attribute', () => {
    const { editor } = setupTest()

    const html = `<p><span style="font-family: Times New Roman;" data-font-family="Arial">This should be Arial</span></p>`
    editor.setContent(html)
    expect(editor.state.doc.firstChild?.firstChild?.toJSON()).toMatchInlineSnapshot(`
      {
        "marks": [
          {
            "attrs": {
              "family": "Arial",
            },
            "type": "fontFamily",
          },
        ],
        "text": "This should be Arial",
        "type": "text",
      }
    `)
  })

  it('can handle non-span inline elements', () => {
    const { editor } = setupTest()

    const html = `<p>`
      + `<i><span style="font-family: Arial;">This should be Arial and italic</span></i>`
      + `<span style="font-family: Georgia;"><i>This should be Georgia and italic</i></span>`
      + `<b style="font-family: Courier New;">This should be Courier New and bold</b>`
      + `</p>`
    editor.setContent(html)
    expect(editor.state.doc.firstChild?.toJSON()).toMatchInlineSnapshot(`
      {
        "content": [
          {
            "marks": [
              {
                "attrs": {
                  "family": "Arial",
                },
                "type": "fontFamily",
              },
              {
                "type": "italic",
              },
            ],
            "text": "This should be Arial and italic",
            "type": "text",
          },
          {
            "marks": [
              {
                "attrs": {
                  "family": "Georgia",
                },
                "type": "fontFamily",
              },
              {
                "type": "italic",
              },
            ],
            "text": "This should be Georgia and italic",
            "type": "text",
          },
          {
            "marks": [
              {
                "attrs": {
                  "family": "\"Courier New\"",
                },
                "type": "fontFamily",
              },
              {
                "type": "bold",
              },
            ],
            "text": "This should be Courier New and bold",
            "type": "text",
          },
        ],
        "type": "paragraph",
      }
    `)
  })

  it('should ignore empty attributes', () => {
    const { editor } = setupTest()

    const html = `<p><span data-font-family="" style="font-family: ;">This should be plain text</span></p>`
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

    const html = `<p><span data-font-family="inherit" style="font-family: inherit;">This should be plain text</span></p>`
    editor.setContent(html)
    expect(editor.state.doc.firstChild?.firstChild?.toJSON()).toMatchInlineSnapshot(`
      {
        "text": "This should be plain text",
        "type": "text",
      }
    `)
  })
})
