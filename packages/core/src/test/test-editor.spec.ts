import { describe, expect, it } from 'vitest'

import { setupTest } from '../testing/index.ts'

describe('TestEditor', () => {
  it('should create nodes and marks', () => {
    const { editor, m, n } = setupTest()

    const doc = n.doc(n.paragraph('Hello ', m.bold('world!')))
    editor.set(doc)
    expect(editor.state.doc.toJSON()).toMatchInlineSnapshot(`
      {
        "content": [
          {
            "content": [
              {
                "text": "Hello ",
                "type": "text",
              },
              {
                "marks": [
                  {
                    "type": "bold",
                  },
                ],
                "text": "world!",
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

  it('should set text selection', () => {
    const { editor, m, n } = setupTest()

    editor.set(n.doc(n.paragraph('Hello ', m.bold('<a>world<b>!'))))
    expect(editor.state.selection.toJSON()).toMatchInlineSnapshot(`
      {
        "anchor": 7,
        "head": 12,
        "type": "text",
      }
    `)
    expect(
      editor.state.selection.content().content.toString(),
    ).toMatchInlineSnapshot(`"<paragraph(bold("world"))>"`)

    editor.set(n.doc(n.paragraph('Hello ', m.bold('<b>world<a>!'))))
    expect(editor.state.selection.toJSON()).toMatchInlineSnapshot(`
      {
        "anchor": 12,
        "head": 7,
        "type": "text",
      }
    `)
    expect(
      editor.state.selection.content().content.toString(),
    ).toMatchInlineSnapshot(`"<paragraph(bold("world"))>"`)

    editor.set(n.doc(n.paragraph('Hello ', m.bold('<a>world!'))))
    expect(editor.state.selection.toJSON()).toMatchInlineSnapshot(`
      {
        "anchor": 7,
        "head": 7,
        "type": "text",
      }
    `)
  })

  it('should set node selection', () => {
    const { editor, n } = setupTest()

    editor.set(n.doc('<a>', n.paragraph('foo')))
    expect(editor.state.selection.toJSON()).toMatchInlineSnapshot(`
      {
        "anchor": 0,
        "type": "node",
      }
    `)
    expect(
      editor.state.selection.content().content.toString(),
    ).toMatchInlineSnapshot(`"<paragraph("foo")>"`)

    editor.set(n.doc(n.paragraph('foo'), '<a>', n.paragraph('bar')))
    expect(editor.state.selection.toJSON()).toMatchInlineSnapshot(`
      {
        "anchor": 5,
        "type": "node",
      }
    `)
    expect(
      editor.state.selection.content().content.toString(),
    ).toMatchInlineSnapshot(`"<paragraph("bar")>"`)
  })
})
