import { union } from '@prosekit/core'
import { describe, expect, it } from 'vitest'

import { defineDoc } from '../doc/index.ts'
import { defineParagraph } from '../paragraph/index.ts'
import { defineText } from '../text/index.ts'

import { defineTableCellSpec, defineTableHeaderCellSpec, defineTableRowSpec, defineTableSpec } from './table-spec.ts'

describe('table spec', () => {
  it('should be defined', () => {
    const extension = union(
      defineDoc(),
      defineParagraph(),
      defineText(),
      defineTableSpec(),
      defineTableRowSpec(),
      defineTableCellSpec(),
      defineTableHeaderCellSpec(),
    )

    const nodes = extension.schema?.spec.nodes.toObject() || {}

    expect(nodes['table']).toMatchInlineSnapshot(`
      {
        "content": "tableRow+",
        "group": "block",
        "isolating": true,
        "parseDOM": [
          {
            "tag": "table",
          },
        ],
        "tableRole": "table",
        "toDOM": [Function],
      }
    `)
    expect(nodes['tableRow']).toMatchInlineSnapshot(`
      {
        "content": "(tableCell | tableHeaderCell)*",
        "parseDOM": [
          {
            "tag": "tr",
          },
        ],
        "tableRole": "row",
        "toDOM": [Function],
      }
    `)
    expect(nodes['tableCell']).toMatchInlineSnapshot(`
      {
        "attrs": {
          "colspan": {
            "default": 1,
          },
          "colwidth": {
            "default": null,
          },
          "rowspan": {
            "default": 1,
          },
        },
        "content": "block+",
        "isolating": true,
        "parseDOM": [
          {
            "getAttrs": [Function],
            "tag": "td",
          },
        ],
        "tableRole": "cell",
        "toDOM": [Function],
      }
    `)
    expect(nodes['tableHeaderCell']).toMatchInlineSnapshot(`
      {
        "attrs": {
          "colspan": {
            "default": 1,
          },
          "colwidth": {
            "default": null,
          },
          "rowspan": {
            "default": 1,
          },
        },
        "content": "block+",
        "isolating": true,
        "parseDOM": [
          {
            "getAttrs": [Function],
            "tag": "th",
          },
        ],
        "tableRole": "header_cell",
        "toDOM": [Function],
      }
    `)
  })
})
