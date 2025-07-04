import type { Command } from '@prosekit/pm/state'
import { CellSelection } from 'prosemirror-tables'
import {
  describe,
  expect,
  it,
} from 'vitest'

import { setupTest } from '../../testing'

import { moveTableColumn } from './move-table-column'

function setup() {
  const { editor, n } = setupTest()

  const setCellSelection = (from: number, to: number) => {
    const command: Command = (state, dispatch) => {
      const selection = CellSelection.create(state.doc, from, to)
      dispatch?.(state.tr.setSelection(selection))
      return true
    }
    editor.exec(command)
  }

  return { editor, n, setCellSelection }
}

describe('moveTableColumn', () => {
  describe('on a simple table', () => {
    it('should move column right-to-left', () => {
      const { editor, n: { doc, table, tr, td } } = setup()
      const docNode = doc(
        table(
          tr(td('1'), td(), td()),
          tr(td('2'), td(), td()),
          tr(td('3'), td(), td()),
        ),
      )

      editor.set(docNode)
      editor.exec(moveTableColumn({ origin: 2, target: 0 }))

      const expected = doc(
        table(
          tr(td(), td('1'), td()),
          tr(td(), td('2'), td()),
          tr(td(), td('3'), td()),
        ),
      )
      expect(editor.state.doc.toJSON()).toEqual(expected.toJSON())
    })

    it('should move column left-to-right', () => {
      const { editor, n: { doc, table, tr, td } } = setup()
      const docNode = doc(
        table(
          tr(td('1'), td(), td()),
          tr(td('2'), td('x'), td()),
          tr(td('3'), td(), td()),
        ),
      )

      editor.set(docNode)
      editor.exec(moveTableColumn({ origin: 1, target: 2 }))

      const expected = doc(
        table(
          tr(td('1'), td(), td()),
          tr(td('2'), td(), td('x')),
          tr(td('3'), td(), td()),
        ),
      )
      expect(editor.state.doc.toJSON()).toEqual(expected.toJSON())
    })

    it('should select column after moving with select option', () => {
      const { editor, n, c, r } = setup()
      const doc = n.doc(
        n.table(
          r(c('1'), c(), c()),
          r(c('2'), c(), c()),
          r(c('3'), c(), c()),
        ),
      )

      editor.set(doc)
      editor.exec(moveTableColumn({ origin: 2, target: 0, select: true }))

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
      editor.exec(moveTableColumn({ origin: 1, target: 0 }))

      const expected = n.doc(
        n.table(
          r(c('merged cell', { colspan: 2 }), c('1')),
          r(c(), c(), c('2')),
          r(c(), c(), c('3')),
        ),
      )
      expect(editor.state.doc.toJSON()).toEqual(expected.toJSON())
    })

    it('should move columns merged at middle line', () => {
      const { editor, n, c, r } = setup()
      const doc = n.doc(
        n.table(
          r(c('1'), c(), c()),
          r(c('2'), c('merged cell', { colspan: 2 })),
          r(c('3'), c(), c()),
        ),
      )

      editor.set(doc)
      editor.exec(moveTableColumn({ origin: 1, target: 0 }))

      const expected = n.doc(
        n.table(
          r(c(), c(), c('1')),
          r(c('merged cell', { colspan: 2 }), c('2')),
          r(c(), c(), c('3')),
        ),
      )
      expect(editor.state.doc.toJSON()).toEqual(expected.toJSON())
    })

    it('should move columns merged at last line', () => {
      const { editor, n, c, r } = setup()
      const doc = n.doc(
        n.table(
          r(c('1'), c(), c()),
          r(c('2'), c(), c()),
          r(c('3'), c('merged cell', { colspan: 2 })),
        ),
      )

      editor.set(doc)
      editor.exec(moveTableColumn({ origin: 1, target: 0 }))

      const expected = n.doc(
        n.table(
          r(c(), c(), c('1')),
          r(c(), c(), c('2')),
          r(c('merged cell', { colspan: 2 }), c('3')),
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
      editor.exec(moveTableColumn({ origin: 0, target: 2 }))

      const expected = n.doc(
        n.table(
          r(h(), h('merged cell', { colspan: 2 })),
          r(c(), c(), c()),
          r(c(), c(), c()),
        ),
      )
      expect(editor.state.doc.toJSON()).toEqual(expected.toJSON())
    })

    it('should move and keep columns headers', () => {
      const { editor, n, c, r, h } = setup()
      const doc = n.doc(
        n.table(
          r(h(), h(), h()),
          r(h('b1'), c(), c('b2')),
          r(h(), c(), c()),
        ),
      )

      editor.set(doc)
      editor.exec(moveTableColumn({ origin: 2, target: 0 }))

      const expected = n.doc(
        n.table(
          r(h(), h(), h()),
          r(h('b2'), c('b1'), c()),
          r(h(), c(), c()),
        ),
      )
      expect(editor.state.doc.toJSON()).toEqual(expected.toJSON())
    })
  })

  describe('on a table with merged rows', () => {
    it('should move columns', () => {
      const { editor, n, c, r } = setup()
      const doc = n.doc(
        n.table(
          r(c('merged-row', { rowspan: 2 }), c('a0'), c('a1')),
          r(c('b1'), c('b2')),
          r(c('c1'), c('c2'), c('c3')),
        ),
      )

      editor.set(doc)
      editor.exec(moveTableColumn({ origin: 1, target: 2 }))

      const expected = n.doc(
        n.table(
          r(c('merged-row', { rowspan: 2 }), c('a1'), c('a0')),
          r(c('b2'), c('b1')),
          r(c('c1'), c('c3'), c('c2')),
        ),
      )
      expect(editor.state.doc.toJSON()).toEqual(expected.toJSON())
    })

    it('should move columns for multi rows merged', () => {
      const { editor, n, c, r } = setup()
      const doc = n.doc(
        n.table(
          r(c('a1', { rowspan: 2 }), c('a2'), c('a3')),
          r(c('b1'), c('b2', { rowspan: 2 })),
          r(c('c1'), c('c2')),
        ),
      )

      editor.set(doc)
      editor.exec(moveTableColumn({ origin: 1, target: 2 }))

      const expected = n.doc(
        n.table(
          r(c('a1', { rowspan: 2 }), c('a3'), c('a2')),
          r(c('b2', { rowspan: 2 }), c('b1')),
          r(c('c1'), c('c2')),
        ),
      )
      expect(editor.state.doc.toJSON()).toEqual(expected.toJSON())
    })

    it('should move columns between two merged rows', () => {
      const { editor, n, c, r } = setup()
      const doc = n.doc(
        n.table(
          r(c('a1', { rowspan: 2 }), c('a2'), c('a3')),
          r(c('b1'), c('b2', { rowspan: 2 })),
          r(c('c1'), c('c2')),
        ),
      )

      editor.set(doc)
      editor.exec(moveTableColumn({ origin: 0, target: 2 }))

      const expected = n.doc(
        n.table(
          r(c('a2'), c('a3'), c('a1', { rowspan: 2 })),
          r(c('b1'), c('b2', { rowspan: 2 })),
          r(c('c2'), c('c1')),
        ),
      )
      expect(editor.state.doc.toJSON()).toEqual(expected.toJSON())
    })

    it('should move column between column with merged row and regular columns', () => {
      const { editor, n, c, r } = setup()
      const doc = n.doc(
        n.table(
          r(c('a1'), c('a2'), c('a3')),
          r(c('b1'), c('b2', { rowspan: 2 }), c('b3')),
          r(c('c1'), c('c2')),
        ),
      )

      editor.set(doc)
      editor.exec(moveTableColumn({ origin: 2, target: 1 }))

      const expected = n.doc(
        n.table(
          r(c('a1'), c('a3'), c('a2')),
          r(c('b1'), c('b3'), c('b2', { rowspan: 2 })),
          r(c('c1'), c('c2')),
        ),
      )
      expect(editor.state.doc.toJSON()).toEqual(expected.toJSON())
    })
  })

  describe('on a complex table with merged cells and rows', () => {
    it('keep the merged content columns order', () => {
      const { editor, n, c, r } = setup()
      const doc = n.doc(
        n.table(
          r(c(), c('a1'), c('a2')),
          r(c(), c('b1', { colspan: 2 })),
          r(c(), c('c1'), c('c2')),
        ),
      )

      editor.set(doc)
      editor.exec(moveTableColumn({ origin: 1, target: 0 }))

      const expected = n.doc(
        n.table(
          r(c('a1'), c('a2'), c()),
          r(c('b1', { colspan: 2 }), c()),
          r(c('c1'), c('c2'), c()),
        ),
      )
      expect(editor.state.doc.toJSON()).toEqual(expected.toJSON())
    })

    describe('when the first line all columns are merged', () => {
      it('should not move columns', () => {
        const { editor, n, c, r } = setup()
        const doc = n.doc(
          n.table(
            r(c('a1', { colspan: 3 })),
            r(c('b1'), c(), c()),
            r(c('c1'), c(), c()),
          ),
        )

        editor.set(doc)
        editor.exec(moveTableColumn({ origin: 1, target: 0 }))

        const expected = n.doc(
          n.table(
            r(c('a1', { colspan: 3 })),
            r(c('b1'), c(), c()),
            r(c('c1'), c(), c()),
          ),
        )
        expect(editor.state.doc.toJSON()).toEqual(expected.toJSON())
      })
    })
  })

  describe('on a simple table with col header', () => {
    it('should move column 0 -> 2', () => {
      const { editor, n, c, r, h } = setup()
      const doc = n.doc(
        n.table(
          r(h('1'), c(), c()),
          r(h('2'), c(), c()),
          r(h('3'), c(), c()),
        ),
      )

      editor.set(doc)
      editor.exec(moveTableColumn({ origin: 0, target: 2 }))

      const expected = n.doc(
        n.table(
          r(h(), c(), c('1')),
          r(h(), c(), c('2')),
          r(h(), c(), c('3')),
        ),
      )
      expect(editor.state.doc.toJSON()).toEqual(expected.toJSON())
    })

    it('should move column 2 -> 0', () => {
      const { editor, n, c, r, h } = setup()
      const doc = n.doc(
        n.table(
          r(h('1'), c(), c()),
          r(h('2'), c(), c()),
          r(h('3'), c(), c()),
        ),
      )

      editor.set(doc)
      editor.exec(moveTableColumn({ origin: 2, target: 0 }))

      const expected = n.doc(
        n.table(
          r(h(), c('1'), c()),
          r(h(), c('2'), c()),
          r(h(), c('3'), c()),
        ),
      )
      expect(editor.state.doc.toJSON()).toEqual(expected.toJSON())
    })

    it('should move column 1 -> 2', () => {
      const { editor, n, c, r, h } = setup()
      const doc = n.doc(
        n.table(
          r(h('1'), c(), c()),
          r(h('2'), c('x'), c()),
          r(h('3'), c(), c()),
        ),
      )

      editor.set(doc)
      editor.exec(moveTableColumn({ origin: 1, target: 2 }))

      const expected = n.doc(
        n.table(
          r(h('1'), c(), c()),
          r(h('2'), c(), c('x')),
          r(h('3'), c(), c()),
        ),
      )
      expect(editor.state.doc.toJSON()).toEqual(expected.toJSON())
    })
  })

  describe('on a simple table with row header', () => {
    it('should move column 0 -> 2', () => {
      const { editor, n, c, r, h } = setup()
      const doc = n.doc(
        n.table(
          r(h('1'), h(), h()),
          r(c('2'), c(), c()),
          r(c('3'), c(), c()),
        ),
      )

      editor.set(doc)
      editor.exec(moveTableColumn({ origin: 0, target: 2 }))

      const expected = n.doc(
        n.table(
          r(h(), h(), h('1')),
          r(c(), c(), c('2')),
          r(c(), c(), c('3')),
        ),
      )
      expect(editor.state.doc.toJSON()).toEqual(expected.toJSON())
    })

    it('should move column 2 -> 0', () => {
      const { editor, n, c, r, h } = setup()
      const doc = n.doc(
        n.table(
          r(h('1'), h(), h()),
          r(c('2'), c(), c()),
          r(c('3'), c(), c()),
        ),
      )

      editor.set(doc)
      editor.exec(moveTableColumn({ origin: 2, target: 0 }))

      const expected = n.doc(
        n.table(
          r(h(), h('1'), h()),
          r(c(), c('2'), c()),
          r(c(), c('3'), c()),
        ),
      )
      expect(editor.state.doc.toJSON()).toEqual(expected.toJSON())
    })

    it('should move column 1 -> 2', () => {
      const { editor, n, c, r, h } = setup()
      const doc = n.doc(
        n.table(
          r(h('1'), h(), h()),
          r(c('2'), c('x'), c()),
          r(c('3'), c(), c()),
        ),
      )

      editor.set(doc)
      editor.exec(moveTableColumn({ origin: 1, target: 2 }))

      const expected = n.doc(
        n.table(
          r(h('1'), h(), h()),
          r(c('2'), c(), c('x')),
          r(c('3'), c(), c()),
        ),
      )
      expect(editor.state.doc.toJSON()).toEqual(expected.toJSON())
    })
  })

  describe('on a simple table with col & row header', () => {
    it('should move column 0 -> 2', () => {
      const { editor, n, c, r, h } = setup()
      const doc = n.doc(
        n.table(
          r(h('1'), h(), h()),
          r(h('2'), c(), c()),
          r(h('3'), c(), c()),
        ),
      )

      editor.set(doc)
      editor.exec(moveTableColumn({ origin: 0, target: 2 }))

      const expected = n.doc(
        n.table(
          r(h(), h(), h('1')),
          r(h(), c(), c('2')),
          r(h(), c(), c('3')),
        ),
      )
      expect(editor.state.doc.toJSON()).toEqual(expected.toJSON())
    })

    it('should move column 2 -> 0', () => {
      const { editor, n, c, r, h } = setup()
      const doc = n.doc(
        n.table(
          r(h('1'), h(), h()),
          r(h('2'), c(), c()),
          r(h('3'), c(), c()),
        ),
      )

      editor.set(doc)
      editor.exec(moveTableColumn({ origin: 2, target: 0 }))

      const expected = n.doc(
        n.table(
          r(h(), h('1'), h()),
          r(h(), c('2'), c()),
          r(h(), c('3'), c()),
        ),
      )
      expect(editor.state.doc.toJSON()).toEqual(expected.toJSON())
    })

    it('should move column 1 -> 2', () => {
      const { editor, n, c, r, h } = setup()
      const doc = n.doc(
        n.table(
          r(h('1'), h(), h()),
          r(h('2'), c('x'), c()),
          r(h('3'), c(), c()),
        ),
      )

      editor.set(doc)
      editor.exec(moveTableColumn({ origin: 1, target: 2 }))

      const expected = n.doc(
        n.table(
          r(h('1'), h(), h()),
          r(h('2'), c(), c('x')),
          r(h('3'), c(), c()),
        ),
      )
      expect(editor.state.doc.toJSON()).toEqual(expected.toJSON())
    })
  })

  describe('table with headers and varying cell types', () => {
    it('should move column 2 to 0', () => {
      const { editor, n, c, r, h } = setup()
      const doc = n.doc(
        n.table(
          r(h('a1'), h('a2'), h('a3'), h('a4'), h('a5')),
          r(c('b1', { colspan: 2 }), c('b2'), c('b3'), c('b4')),
          r(c('c1'), c('c2'), c('c3'), c('c4', { colspan: 2 })),
        ),
      )

      editor.set(doc)
      editor.exec(moveTableColumn({ origin: 2, target: 0 }))

      const expected = n.doc(
        n.table(
          r(h('a3'), h('a1'), h('a2'), h('a4'), h('a5')),
          r(c('b2'), c('b1', { colspan: 2 }), c('b3'), c('b4')),
          r(c('c3'), c('c1'), c('c2'), c('c4', { colspan: 2 })),
        ),
      )
      expect(editor.state.doc.toJSON()).toEqual(expected.toJSON())
    })

    it('should move column 0 to 2', () => {
      const { editor, n, c, r, h } = setup()
      const doc = n.doc(
        n.table(
          r(h('a1'), h('a2'), h('a3'), h('a4'), h('a5')),
          r(c('b1', { colspan: 2 }), c('b2'), c('b3'), c('b4')),
          r(c('c1'), c('c2'), c('c3'), c('c4', { colspan: 2 })),
        ),
      )

      editor.set(doc)
      editor.exec(moveTableColumn({ origin: 0, target: 2 }))

      const expected = n.doc(
        n.table(
          r(h('a3'), h('a1'), h('a2'), h('a4'), h('a5')),
          r(c('b2'), c('b1', { colspan: 2 }), c('b3'), c('b4')),
          r(c('c3'), c('c1'), c('c2'), c('c4', { colspan: 2 })),
        ),
      )
      expect(editor.state.doc.toJSON()).toEqual(expected.toJSON())
    })
  })
})