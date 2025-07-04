import type { Node } from '@prosekit/pm/model'
import {
  describe,
  expect,
  it,
} from 'vitest'

import { setupTest } from '../../testing'
import type { CellAttrs } from '../table-spec.js'

import { convertTableNodeToArrayOfRows } from './convert-row-and-table'

function setup() {
  const { n } = setupTest()
  const defaultCellAttrs: CellAttrs = { colspan: 1, rowspan: 1, colwidth: null }

  const c = (text?: string, attrs?: Partial<CellAttrs>) => {
    return n.tableCell({ ...defaultCellAttrs, ...attrs }, text ? n.p(text) : n.p())
  }
  const r = n.tableRow

  return { n, c, r }
}

describe('convertTableNodeToArrayOfRows', () => {
  const convert = (tableNode: Node): (string | null)[][] => {
    const rows = convertTableNodeToArrayOfRows(tableNode)
    return rows.map((row) => row.map((cell) => cell?.textContent ?? null))
  }

  it('should convert a simple table to array of rows', () => {
    const { n, c, r } = setup()
    const tableNode = n.table(
      r(c('A1'), c('B1')),
      r(c('A2'), c('B2')),
    )

    expect(convert(tableNode)).toEqual([
      ['A1', 'B1'],
      ['A2', 'B2'],
    ])
  })

  it('should handle empty cells', () => {
    const { n, c, r } = setup()
    const tableNode = n.table(
      r(c('A1'), c()),
      r(c(), c('B2')),
    )

    expect(convert(tableNode)).toEqual([
      ['A1', ''],
      ['', 'B2'],
    ])
  })

  it('should handle tables with equal row lengths', () => {
    const { n, c, r } = setup()
    const tableNode = n.table(
      r(c('A1'), c('B1'), c('C1')),
      r(c('A2'), c('B2'), c('C2')),
    )

    expect(convert(tableNode)).toEqual([
      ['A1', 'B1', 'C1'],
      ['A2', 'B2', 'C2'],
    ])
  })

  it('should handle single row table', () => {
    const { n, c, r } = setup()
    const tableNode = n.table(
      r(c('Single'), c('Row')),
    )

    expect(convert(tableNode)).toEqual([
      ['Single', 'Row'],
    ])
  })

  it('should handle single column table', () => {
    const { n, c, r } = setup()
    const tableNode = n.table(
      r(c('A1')),
      r(c('A2')),
      r(c('A3')),
    )

    expect(convert(tableNode)).toEqual([
      ['A1'],
      ['A2'],
      ['A3'],
    ])
  })

  it('should handle table with merged cells', () => {
    const { n, r, c } = setup()

    // ┌──────┬──────┬─────────────┐
    // │  A1  │  B1  │     C1      │
    // ├──────┼──────┴──────┬──────┤
    // │  A2  │     B2      │      │
    // ├──────┼─────────────┤  D1  │
    // │  A3  │  B3  │  C3  │      │
    // └──────┴──────┴──────┴──────┘
    const tableNode = n.table(
      r(c('A1'), c('B1'), c('C1', { colspan: 2 })),
      r(c('A2'), c('B2', { colspan: 2 }), c('D1', { rowspan: 2 })),
      r(c('A3'), c('B3'), c('C3')),
    )

    expect(convert(tableNode)).toEqual([
      ['A1', 'B1', 'C1', null],
      ['A2', 'B2', null, 'D1'],
      ['A3', 'B3', 'C3', null],
    ])
  })
})
