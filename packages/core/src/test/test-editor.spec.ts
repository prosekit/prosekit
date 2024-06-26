import { describe, expect, it } from 'vitest'

import { createTestEditor } from './test-editor'
import { defineTestExtension } from './test-extension'

describe('TestEditor', () => {
  it('should create nodes and marks', () => {
    const editor = createTestEditor({ extension: defineTestExtension() })
    const n = editor.nodes
    const m = editor.marks

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
    const editor = createTestEditor({ extension: defineTestExtension() })
    const n = editor.nodes
    const m = editor.marks

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
    const editor = createTestEditor({ extension: defineTestExtension() })
    const n = editor.nodes

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
