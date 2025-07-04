import type { Command } from '@prosekit/pm/state'
import { CellSelection } from 'prosemirror-tables'
import {
  describe,
  expect,
  it,
} from 'vitest'

import { setupTest } from '../../testing'
import type { CellAttrs } from '../table-spec.js'

import { moveTableRow } from './move-table-row'

function setup() {
  const { editor, n } = setupTest()
  const defaultCellAttrs: CellAttrs = { colspan: 1, rowspan: 1, colwidth: null }

  const c = (text?: string, attrs?: Partial<CellAttrs>) => {
    return n.tableCell({ ...defaultCellAttrs, ...attrs }, text ? n.p(text) : n.p())
  }
  const h = (text?: string, attrs?: Partial<CellAttrs>) => {
    return n.tableHeaderCell({ ...defaultCellAttrs, ...attrs }, text ? n.p(text) : n.p())
  }
  const r = n.tableRow

  const setCellSelection = (from: number, to: number) => {
    const command: Command = (state, dispatch) => {
      const selection = CellSelection.create(state.doc, from, to)
      dispatch?.(state.tr.setSelection(selection))
      return true
    }
    editor.exec(command)
  }

  return { editor, n, c, h, r, setCellSelection }
}

describe('moveTableRow', () => {
  describe('on a simple table', () => {
    it('should move row bottom-to-top', () => {
      const { editor, n, c, r } = setup()
      const doc = n.doc(
        n.table(
          r(c('1'), c(), c()),
          r(c('2'), c(), c()),
          r(c('3'), c(), c()),
        ),
      )

      editor.set(doc)
      editor.exec(moveTableRow({ origin: 2, target: 0 }))

      const expected = n.doc(
        n.table(
          r(c('3'), c(), c()),
          r(c('1'), c(), c()),
          r(c('2'), c(), c()),
        ),
      )
      expect(editor.state.doc.toJSON()).toEqual(expected.toJSON())
    })

    it('should move row top-to-bottom', () => {
      const { editor, n, c, r } = setup()
      const doc = n.doc(
        n.table(
          r(c('1'), c(), c()),
          r(c('2'), c('x'), c()),
          r(c('3'), c(), c()),
        ),
      )

      editor.set(doc)
      editor.exec(moveTableRow({ origin: 1, target: 2 }))

      const expected = n.doc(
        n.table(
          r(c('1'), c(), c()),
          r(c('3'), c(), c()),
          r(c('2'), c('x'), c()),
        ),
      )
      expect(editor.state.doc.toJSON()).toEqual(expected.toJSON())
    })

    it('should select row after moving with select option', () => {
      const { editor, n, c, r } = setup()
      const doc = n.doc(
        n.table(
          r(c('1'), c(), c()),
          r(c('2'), c(), c()),
          r(c('3'), c(), c()),
        ),
      )

      editor.set(doc)
      editor.exec(moveTableRow({ origin: 2, target: 0, select: true }))

      // Check that a cell selection was created
      expect(editor.state.selection).toBeInstanceOf(CellSelection)
      const selection = editor.state.selection as CellSelection
      expect(selection.$anchorCell.pos).toBeDefined()
      expect(selection.$headCell.pos).toBeDefined()
    })
  })

  describe('on a table with merged cells', () => {
    it('should move columns merged at first line', () => {
      const { editor, n, c, r } = setup()
      const doc = n.doc(
        n.table(
          r(c('1'), c('merged cell', { colspan: 2 })),
          r(c('2'), c(), c()),
          r(c('3'), c(), c()),
        ),
      )

      editor.set(doc)
      editor.exec(moveTableRow({ origin: 1, target: 0 }))

      const expected = n.doc(
        n.table(
          r(c('2'), c(), c()),
          r(c('1'), c('merged cell', { colspan: 2 })),
          r(c('3'), c(), c()),
        ),
      )
      expect(editor.state.doc.toJSON()).toEqual(expected.toJSON())
    })

    it('should move lines with columns merged at last line', () => {
      const { editor, n, c, r } = setup()
      const doc = n.doc(
        n.table(
          r(c('1'), c(), c()),
          r(c('2'), c(), c()),
          r(c('3'), c('merged cell', { colspan: 2 })),
        ),
      )

      editor.set(doc)
      editor.exec(moveTableRow({ origin: 1, target: 0 }))

      const expected = n.doc(
        n.table(
          r(c('2'), c(), c()),
          r(c('1'), c(), c()),
          r(c('3'), c('merged cell', { colspan: 2 })),
        ),
      )
      expect(editor.state.doc.toJSON()).toEqual(expected.toJSON())
    })

    it('should move and keep table headers', () => {
      const { editor, n, c, r, h } = setup()
      const doc = n.doc(
        n.table(
          r(h('merged cell', { colspan: 2 }), h()),
          r(c(), c(), c()),
          r(c(), c(), c()),
        ),
      )

      editor.set(doc)
      editor.exec(moveTableRow({ origin: 0, target: 2 }))

      const expected = n.doc(
        n.table(
          r(h(), h(), h()),
          r(c(), c(), c()),
          r(c('merged cell', { colspan: 2 }), c()),
        ),
      )
      expect(editor.state.doc.toJSON()).toEqual(expected.toJSON())
    })
  })

  describe('on a table with merged rows', () => {
    it('should move rows', () => {
      const { editor, n, c, r } = setup()
      const doc = n.doc(
        n.table(
          r(c('merged-row', { rowspan: 2 }), c('0'), c('1')),
          r(c('2'), c('3')),
          r(c('4'), c('5'), c('6')),
        ),
      )

      editor.set(doc)
      editor.exec(moveTableRow({ origin: 1, target: 2 }))

      const expected = n.doc(
        n.table(
          r(c('4'), c('5'), c('6')),
          r(c('merged-row', { rowspan: 2 }), c('0'), c('1')),
          r(c('2'), c('3')),
        ),
      )
      expect(editor.state.doc.toJSON()).toEqual(expected.toJSON())
    })
  })

  describe('on a simple table with header', () => {
    it('should move row header top-to-bottom', () => {
      const { editor, n, c, r, h } = setup()
      const doc = n.doc(
        n.table(
          r(h('1'), h(), h()),
          r(c('2'), c(), c()),
          r(c('3'), c(), c()),
        ),
      )

      editor.set(doc)
      editor.exec(moveTableRow({ origin: 0, target: 2 }))

      const expected = n.doc(
        n.table(
          r(h('2'), h(), h()),
          r(c('3'), c(), c()),
          r(c('1'), c(), c()),
        ),
      )
      expect(editor.state.doc.toJSON()).toEqual(expected.toJSON())
    })

    it('should move row header bottom-to-top', () => {
      const { editor, n, c, r, h } = setup()
      const doc = n.doc(
        n.table(
          r(h('1'), h(), h()),
          r(c('2'), c(), c()),
          r(c('3'), c(), c()),
        ),
      )

      editor.set(doc)
      editor.exec(moveTableRow({ origin: 2, target: 0 }))

      const expected = n.doc(
        n.table(
          r(h('3'), h(), h()),
          r(c('1'), c(), c()),
          r(c('2'), c(), c()),
        ),
      )
      expect(editor.state.doc.toJSON()).toEqual(expected.toJSON())
    })

    it('should move col header top-to-bottom', () => {
      const { editor, n, c, r, h } = setup()
      const doc = n.doc(
        n.table(
          r(h('1'), c(), c()),
          r(h('2'), c(), c()),
          r(h('3'), c(), c()),
        ),
      )

      editor.set(doc)
      editor.exec(moveTableRow({ origin: 0, target: 2 }))

      const expected = n.doc(
        n.table(
          r(h('2'), c(), c()),
          r(h('3'), c(), c()),
          r(h('1'), c(), c()),
        ),
      )
      expect(editor.state.doc.toJSON()).toEqual(expected.toJSON())
    })

    it('should move col header bottom-to-top', () => {
      const { editor, n, c, r, h } = setup()
      const doc = n.doc(
        n.table(
          r(h('1'), c(), c()),
          r(h('2'), c(), c()),
          r(h('3'), c(), c()),
        ),
      )

      editor.set(doc)
      editor.exec(moveTableRow({ origin: 2, target: 0 }))

      const expected = n.doc(
        n.table(
          r(h('3'), c(), c()),
          r(h('1'), c(), c()),
          r(h('2'), c(), c()),
        ),
      )
      expect(editor.state.doc.toJSON()).toEqual(expected.toJSON())
    })

    it('should move row header correctly within a single column table', () => {
      const { editor, n, c, r, h } = setup()
      const doc = n.doc(
        n.table(
          r(h('1')),
          r(c('2')),
          r(c('3')),
        ),
      )

      editor.set(doc)
      editor.exec(moveTableRow({ origin: 0, target: 2 }))

      const expected = n.doc(
        n.table(
          r(h('2')),
          r(c('3')),
          r(c('1')),
        ),
      )
      expect(editor.state.doc.toJSON()).toEqual(expected.toJSON())
    })

    it('should move col header correctly within a single column table', () => {
      const { editor, n, r, h } = setup()
      const doc = n.doc(
        n.table(
          r(h('1')),
          r(h('2')),
          r(h('3')),
        ),
      )

      editor.set(doc)
      editor.exec(moveTableRow({ origin: 0, target: 2 }))

      const expected = n.doc(
        n.table(
          r(h('2')),
          r(h('3')),
          r(h('1')),
        ),
      )
      expect(editor.state.doc.toJSON()).toEqual(expected.toJSON())
    })
  })

  describe('table with varying row node sizes', () => {
    it('should move row from top-to-bottom', () => {
      const { editor, n, c, r, h } = setup()
      const doc = n.doc(
        n.table(
          r(h('1'), h(), h()),
          r(c('2'.repeat(10)), c('2'.repeat(10)), c('2'.repeat(10))),
          r(c('3'.repeat(100)), c('3'.repeat(100)), c('3'.repeat(100))),
        ),
      )

      editor.set(doc)
      editor.exec(moveTableRow({ origin: 0, target: 2 }))

      const expected = n.doc(
        n.table(
          r(h('2'.repeat(10)), h('2'.repeat(10)), h('2'.repeat(10))),
          r(c('3'.repeat(100)), c('3'.repeat(100)), c('3'.repeat(100))),
          r(c('1'), c(), c()),
        ),
      )
      expect(editor.state.doc.toJSON()).toEqual(expected.toJSON())
    })

    it('should move row from bottom-to-top', () => {
      const { editor, n, c, r, h } = setup()
      const doc = n.doc(
        n.table(
          r(h('1'), h(), h()),
          r(c('2'.repeat(10)), c('2'.repeat(10)), c('2'.repeat(10))),
          r(c('3'.repeat(100)), c('3'.repeat(100)), c('3'.repeat(100))),
        ),
      )

      editor.set(doc)
      editor.exec(moveTableRow({ origin: 2, target: 0 }))

      const expected = n.doc(
        n.table(
          r(h('3'.repeat(100)), h('3'.repeat(100)), h('3'.repeat(100))),
          r(c('1'), c(), c()),
          r(c('2'.repeat(10)), c('2'.repeat(10)), c('2'.repeat(10))),
        ),
      )
      expect(editor.state.doc.toJSON()).toEqual(expected.toJSON())
    })
  })
})
