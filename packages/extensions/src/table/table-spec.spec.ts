import { defineDoc, defineParagraph, defineText, union } from '@prosekit/core'
import pick from 'just-pick'
import { describe, expect, it } from 'vitest'

import {
  defineTableSpec,
  defineTableRowSpec,
  defineTableCellSpec,
  defineTableHeaderCellSpec,
} from './table-spec'

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
    const pickedNodes = pick(nodes, [
      'table',
      'tableCell',
      'tableHeaderCell',
      'tableRow',
    ])

    expect(pickedNodes).toMatchInlineSnapshot(`
      {
        "table": {
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
        },
        "tableCell": {
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
        },
        "tableHeaderCell": {
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
        },
        "tableRow": {
          "content": "(tableCell | tableHeaderCell)*",
          "parseDOM": [
            {
              "tag": "tr",
            },
          ],
          "tableRole": "row",
          "toDOM": [Function],
        },
      }
    `)
  })
})
