import type { Node } from '@prosekit/pm/model'
import {
  describe,
  expect,
  it,
} from 'vitest'

import { setupTest } from '../../testing'
import type { CellAttrs } from '../table-spec.js'

import {
  convertArrayOfRowsToTableNode,
  convertTableNodeToArrayOfRows,
  moveRowInArrayOfRows,
} from './convert-row-and-table'

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

describe('convertArrayOfRowsToTableNode', () => {
  const expectTableEquals = (a: Node, b: Node) => {
    // a and b are not the same node
    expect(a !== b).toBe(true)

    // a and b have the same data
    expect(a.eq(b)).toBe(true)
  }

  it('should convert array of rows back to table node (roundtrip)', () => {
    const { n, c, r } = setup()
    const originalTable = n.table(
      r(c('A1'), c('B1')),
      r(c('A2'), c('B2')),
    )

    const arrayOfRows = convertTableNodeToArrayOfRows(originalTable)
    const newTable = convertArrayOfRowsToTableNode(originalTable, arrayOfRows)

    expectTableEquals(originalTable, newTable)
  })

  it('should handle modified cell content', () => {
    const { n, c, r } = setup()
    const originalTable = n.table(
      r(c('A1'), c('B1')),
      r(c('A2'), c('B2')),
    )

    const arrayOfRows = convertTableNodeToArrayOfRows(originalTable)
    // Modify the content of one cell
    arrayOfRows[0][1] = n.tableCell(n.p('Modified'))

    const newTable = convertArrayOfRowsToTableNode(originalTable, arrayOfRows)

    const expectedTable = n.table(
      r(c('A1'), c('Modified')),
      r(c('A2'), c('B2')),
    )

    expectTableEquals(expectedTable, newTable)
  })

  it('should handle empty cells in array', () => {
    const { n, c, r } = setup()
    const originalTable = n.table(
      r(c('A1'), c('B1')),
      r(c('A2'), c('B2')),
    )

    const arrayOfRows = convertTableNodeToArrayOfRows(originalTable)
    // Replace one cell with an empty cell
    arrayOfRows[1][0] = n.tableCell(n.p())

    const newTable = convertArrayOfRowsToTableNode(originalTable, arrayOfRows)

    const expectedTable = n.table(
      r(c('A1'), c('B1')),
      r(c(''), c('B2')),
    )

    expectTableEquals(expectedTable, newTable)
  })

  it('should handle multiple cell modifications', () => {
    const { n, c, r } = setup()
    const originalTable = n.table(
      r(c('A1'), c('B1'), c('C1')),
      r(c('A2'), c('B2'), c('C2')),
      r(c('A3'), c('B3'), c('C3')),
    )

    const arrayOfRows = convertTableNodeToArrayOfRows(originalTable)
    // Modify multiple cells
    arrayOfRows[0][0] = n.tableCell(n.p('New A1'))
    arrayOfRows[1][1] = n.tableCell(n.p('New B2'))
    arrayOfRows[2][2] = n.tableCell(n.p('New C3'))

    const newTable = convertArrayOfRowsToTableNode(originalTable, arrayOfRows)

    const expectedTable = n.table(
      r(c('New A1'), c('B1'), c('C1')),
      r(c('A2'), c('New B2'), c('C2')),
      r(c('A3'), c('B3'), c('New C3')),
    )

    expectTableEquals(expectedTable, newTable)
  })

  it('should handle tables with merged cells', () => {
    const { n, c, r } = setup()
    const originalTable = n.table(
      r(c('A1'), c('B1'), c('C1', { colspan: 2 })),
      r(c('A2'), c('B2', { colspan: 2 }), c('D1', { rowspan: 2 })),
      r(c('A3'), c('B3'), c('C3')),
    )

    const arrayOfRows = convertTableNodeToArrayOfRows(originalTable)
    const newTable = convertArrayOfRowsToTableNode(originalTable, arrayOfRows)

    expectTableEquals(originalTable, newTable)
  })

  it('should handle modified cells in merged table', () => {
    const { n, c, r } = setup()
    const originalTable = n.table(
      r(c('A1'), c('B1'), c('C1', { colspan: 2 })),
      r(c('A2'), c('B2', { colspan: 2 }), c('D1', { rowspan: 2 })),
      r(c('A3'), c('B3'), c('C3')),
    )

    const arrayOfRows = convertTableNodeToArrayOfRows(originalTable)
    // Modify a cell in the merged table
    arrayOfRows[0][2] = n.tableCell({ colspan: 2, rowspan: 1, colwidth: null }, n.p('Modified C1'))

    const newTable = convertArrayOfRowsToTableNode(originalTable, arrayOfRows)

    const expectedTable = n.table(
      r(c('A1'), c('B1'), c('Modified C1', { colspan: 2 })),
      r(c('A2'), c('B2', { colspan: 2 }), c('D1', { rowspan: 2 })),
      r(c('A3'), c('B3'), c('C3')),
    )

    expectTableEquals(expectedTable, newTable)
  })

  it('should handle single row table conversion', () => {
    const { n, c, r } = setup()
    const originalTable = n.table(
      r(c('Single'), c('Row'), c('Table')),
    )

    const arrayOfRows = convertTableNodeToArrayOfRows(originalTable)
    // Modify middle cell
    arrayOfRows[0][1] = n.tableCell(n.p('Modified'))

    const newTable = convertArrayOfRowsToTableNode(originalTable, arrayOfRows)

    const expectedTable = n.table(
      r(c('Single'), c('Modified'), c('Table')),
    )

    expectTableEquals(expectedTable, newTable)
  })

  it('should handle single column table conversion', () => {
    const { n, c, r } = setup()
    const originalTable = n.table(
      r(c('A1')),
      r(c('A2')),
      r(c('A3')),
    )

    const arrayOfRows = convertTableNodeToArrayOfRows(originalTable)
    // Modify middle cell
    arrayOfRows[1][0] = n.tableCell(n.p('Modified A2'))

    const newTable = convertArrayOfRowsToTableNode(originalTable, arrayOfRows)

    const expectedTable = n.table(
      r(c('A1')),
      r(c('Modified A2')),
      r(c('A3')),
    )

    expectTableEquals(expectedTable, newTable)
  })

  it('should preserve cell attributes when modifying content', () => {
    const { n, c, r } = setup()
    const originalTable = n.table(
      r(c('A1'), c('B1', { colspan: 2 })),
      r(c('A2', { rowspan: 2 }), c('B2'), c('C2')),
      r(c('B3'), c('C3')),
    )

    const arrayOfRows = convertTableNodeToArrayOfRows(originalTable)
    // Modify content while preserving attributes
    arrayOfRows[0][1] = n.tableCell({ colspan: 2, rowspan: 1, colwidth: null }, n.p('Modified B1'))
    arrayOfRows[1][0] = n.tableCell({ colspan: 1, rowspan: 2, colwidth: null }, n.p('Modified A2'))

    const newTable = convertArrayOfRowsToTableNode(originalTable, arrayOfRows)

    const expectedTable = n.table(
      r(c('A1'), c('Modified B1', { colspan: 2 })),
      r(c('Modified A2', { rowspan: 2 }), c('B2'), c('C2')),
      r(c('B3'), c('C3')),
    )

    expectTableEquals(expectedTable, newTable)
  })
})

describe('moveRowInArrayOfRows', () => {
  describe('single element moves', () => {
    it('should move element down (forward)', () => {
      const rows = [0, 1, 2, 3, 4]
      const result = moveRowInArrayOfRows(rows, [1], [3], 0)
      expect(result).toEqual([0, 2, 3, 1, 4])
    })

    it('should move element up (backward)', () => {
      const rows = [0, 1, 2, 3, 4]
      const result = moveRowInArrayOfRows(rows, [3], [1], 0)
      expect(result).toEqual([0, 3, 1, 2, 4])
    })

    it('should move first element to end', () => {
      const rows = [0, 1, 2, 3]
      const result = moveRowInArrayOfRows(rows, [0], [3], 0)
      expect(result).toEqual([1, 2, 3, 0])
    })

    it('should move last element to beginning', () => {
      const rows = [0, 1, 2, 3]
      const result = moveRowInArrayOfRows(rows, [3], [0], 0)
      expect(result).toEqual([3, 0, 1, 2])
    })
  })

  describe('multiple element moves', () => {
    it('should move two consecutive elements down', () => {
      const rows = [0, 1, 2, 3, 4, 5]
      const result = moveRowInArrayOfRows(rows, [1, 2], [4, 5], 0)
      expect(result).toEqual([0, 3, 4, 5, 1, 2])
    })

    it('should move two consecutive elements up', () => {
      const rows = [0, 1, 2, 3, 4, 5]
      const result = moveRowInArrayOfRows(rows, [4, 5], [1, 2], 0)
      expect(result).toEqual([0, 4, 5, 1, 2, 3])
    })

    it('should move three elements', () => {
      const rows = [0, 1, 2, 3, 4, 5, 6]
      const result = moveRowInArrayOfRows(rows, [1, 2, 3], [5, 6], 0)
      expect(result).toEqual([0, 4, 5, 6, 1, 2, 3])
    })
  })

  describe('direction overrides', () => {
    it('should handle override -1 (force before target)', () => {
      const rows = [0, 1, 2, 3, 4, 5]
      const result = moveRowInArrayOfRows(rows, [1], [4], -1)
      expect(result).toEqual([0, 2, 3, 1, 4, 5])
    })

    it('should handle override 0 (natural direction)', () => {
      const rows = [0, 1, 2, 3, 4, 5]
      const result = moveRowInArrayOfRows(rows, [1], [4], 0)
      expect(result).toEqual([0, 2, 3, 4, 1, 5])
    })

    it('should handle override +1 (force after target)', () => {
      const rows = [0, 1, 2, 3, 4]
      const result = moveRowInArrayOfRows(rows, [3], [1], 1)
      expect(result).toEqual([0, 1, 3, 2, 4])
    })
  })

  describe('edge cases', () => {
    it('should handle single element array', () => {
      const rows = [0]
      const result = moveRowInArrayOfRows(rows, [0], [0], 0)
      expect(result).toEqual([0])
    })

    it('should handle two element array', () => {
      const rows = [0, 1]
      const result = moveRowInArrayOfRows(rows, [0], [1], 0)
      expect(result).toEqual([1, 0])
    })

    it('should handle moving to same position', () => {
      const rows = [0, 1, 2, 3]
      const result = moveRowInArrayOfRows(rows, [2], [2], 0)
      expect(result).toEqual([0, 1, 2, 3])
    })

    it('should handle adjacent elements', () => {
      const rows = [0, 1, 2, 3]
      const result = moveRowInArrayOfRows(rows, [1], [2], 0)
      expect(result).toEqual([0, 2, 1, 3])
    })
  })

  describe('data types', () => {
    it('should work with strings', () => {
      const rows = ['a', 'b', 'c', 'd']
      const result = moveRowInArrayOfRows(rows, [0], [2], 0)
      expect(result).toEqual(['b', 'c', 'a', 'd'])
    })

    it('should work with mixed types', () => {
      const rows = [1, 'a', true, null, 4]
      const result = moveRowInArrayOfRows(rows, [1], [3], 0)
      expect(result).toEqual([1, true, null, 'a', 4])
    })

    it('should work with table cell nodes', () => {
      const { c } = setup()
      const rows = [
        [c('0'), c('A')],
        [c('1'), c('B')],
        [c('2'), c('C')],
      ]

      const result = moveRowInArrayOfRows(rows, [2], [0], 0)
      expect(result[0][0]?.textContent).toBe('2')
      expect(result[1][0]?.textContent).toBe('0')
      expect(result[2][0]?.textContent).toBe('1')
    })
  })

  describe('complex scenarios', () => {
    it('should handle large arrays', () => {
      const rows = Array.from({ length: 10 }, (_, i) => i) // [0,1,2,3,4,5,6,7,8,9]
      const result = moveRowInArrayOfRows(rows, [2, 3, 4], [7, 8, 9], 0)
      expect(result).toEqual([0, 1, 5, 6, 7, 8, 9, 2, 3, 4])
    })

    it('should handle moving entire beginning to end', () => {
      const rows = [0, 1, 2, 3, 4]
      const result = moveRowInArrayOfRows(rows, [0, 1, 2], [4], 0)
      expect(result).toEqual([3, 4, 0, 1, 2])
    })

    it('should handle moving entire end to beginning', () => {
      const rows = [0, 1, 2, 3, 4]
      const result = moveRowInArrayOfRows(rows, [3, 4], [0, 1], 0)
      expect(result).toEqual([3, 4, 0, 1, 2])
    })
  })
})
