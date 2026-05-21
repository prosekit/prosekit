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

    expect(nodes['table']).toMatchInlineSnapshot()
    expect(nodes['tableRow']).toMatchInlineSnapshot()
    expect(nodes['tableCell']).toMatchInlineSnapshot()
    expect(nodes['tableHeaderCell']).toMatchInlineSnapshot()
  })
})
