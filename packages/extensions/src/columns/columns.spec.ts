import { union } from '@prosekit/core'
import pick from 'just-pick'
import { describe, expect, it } from 'vitest'

import { defineDoc } from '../doc/index.ts'
import { defineParagraph } from '../paragraph/index.ts'
import { setupTestFromExtension } from '../testing/index.ts'
import { defineText } from '../text/index.ts'

import { defineColumns } from './columns.ts'

function setup() {
  const extension = union(
    defineDoc(),
    defineText(),
    defineParagraph(),
    defineColumns(),
  )
  return setupTestFromExtension(extension)
}

describe('columns spec', () => {
  it('should be defined', () => {
    const extension = union(
      defineDoc(),
      defineText(),
      defineParagraph(),
      defineColumns(),
    )

    const nodes = extension.schema?.spec.nodes.toObject() || {}
    const pickedNodes = pick(nodes, ['columns', 'column'])

    expect(pickedNodes).toMatchInlineSnapshot(`
      {
        "column": {
          "attrs": {
            "width": {
              "default": null,
            },
          },
          "content": "block+",
          "parseDOM": [
            {
              "getAttrs": [Function],
              "tag": "div.prosekit-column",
            },
          ],
          "toDOM": [Function],
        },
        "columns": {
          "attrs": {
            "gap": {
              "default": null,
            },
          },
          "content": "column+",
          "group": "block",
          "parseDOM": [
            {
              "getAttrs": [Function],
              "tag": "div.prosekit-columns",
            },
          ],
          "toDOM": [Function],
        },
      }
    `)
  })
})

describe('columns commands', () => {
  it('should insert two columns', () => {
    const { editor, n } = setup()
    editor.set(n.doc(n.paragraph('<a>')))
    editor.commands.insertColumns({ count: 2 })
    expect(editor.view.state.doc.toJSON()).toEqual(
      n.doc(
        n.columns(
          n.column(n.paragraph()),
          n.column(n.paragraph()),
        ),
      ).toJSON(),
    )
  })

  it('should add a column after the current one', () => {
    const { editor, n } = setup()
    editor.set(n.doc(
      n.columns(
        n.column(n.paragraph('one<a>')),
        n.column(n.paragraph('two')),
      ),
    ))
    editor.commands.addColumnAfter()
    expect(editor.view.state.doc.toJSON()).toEqual(
      n.doc(
        n.columns(
          n.column(n.paragraph('one')),
          n.column(n.paragraph()),
          n.column(n.paragraph('two')),
        ),
      ).toJSON(),
    )
  })

  it('should unwrap when removing down to one column', () => {
    const { editor, n } = setup()
    editor.set(n.doc(
      n.columns(
        n.column(n.paragraph('left<a>')),
        n.column(n.paragraph('right')),
      ),
    ))
    editor.commands.removeColumn()
    expect(editor.view.state.doc.toJSON()).toEqual(
      n.doc(n.paragraph('right')).toJSON(),
    )
  })

  it('should update column width and container gap', () => {
    const { editor, n } = setup()
    editor.set(n.doc(
      n.columns(
        n.column(n.paragraph('left<a>')),
        n.column(n.paragraph('right')),
      ),
    ))
    editor.commands.setColumnWidth(280)
    editor.commands.setColumnsGap(24)
    expect(editor.view.state.doc.toJSON()).toEqual(
      n.doc(
        n.columns(
          { gap: 24 },
          n.column({ width: 280 }, n.paragraph('left')),
          n.column(n.paragraph('right')),
        ),
      ).toJSON(),
    )
  })
})
