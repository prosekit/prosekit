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
      const { editor, n: { doc, table, tr, td } } = setup()
      const docNode = doc(
        table(
          tr(td('1'), td(), td()),
          tr(td('2'), td(), td()),
          tr(td('3'), td(), td()),
        ),
      )

      editor.set(docNode)
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
      const { editor, n: { doc, table, tr, td } } = setup()
      const docNode = doc(
        table(
          tr(td('1'), td('merged cell', { colspan: 2 })),
          tr(td('2'), td(), td()),
          tr(td('3'), td(), td()),
        ),
      )

      editor.set(docNode)
      editor.exec(moveTableColumn({ origin: 1, target: 0 }))

      const expected = doc(
        table(
          tr(td('merged cell', { colspan: 2 }), td('1')),
          tr(td(), td(), td('2')),
          tr(td(), td(), td('3')),
        ),
      )
      expect(editor.state.doc.toJSON()).toEqual(expected.toJSON())
    })

    it('should move columns merged at middle line', () => {
      const { editor, n: { doc, table, tr, td } } = setup()
      const docNode = doc(
        table(
          tr(td('1'), td(), td()),
          tr(td('2'), td('merged cell', { colspan: 2 })),
          tr(td('3'), td(), td()),
        ),
      )

      editor.set(docNode)
      editor.exec(moveTableColumn({ origin: 1, target: 0 }))

      const expected = doc(
        table(
          tr(td(), td(), td('1')),
          tr(td('merged cell', { colspan: 2 }), td('2')),
          tr(td(), td(), td('3')),
        ),
      )
      expect(editor.state.doc.toJSON()).toEqual(expected.toJSON())
    })

    it('should move columns merged at last line', () => {
      const { editor, n: { doc, table, tr, td } } = setup()
      const docNode = doc(
        table(
          tr(td('1'), td(), td()),
          tr(td('2'), td(), td()),
          tr(td('3'), td('merged cell', { colspan: 2 })),
        ),
      )

      editor.set(docNode)
      editor.exec(moveTableColumn({ origin: 1, target: 0 }))

      const expected = doc(
        table(
          tr(td(), td(), td('1')),
          tr(td(), td(), td('2')),
          tr(td('merged cell', { colspan: 2 }), td('3')),
        ),
      )
      expect(editor.state.doc.toJSON()).toEqual(expected.toJSON())
    })

    it('should move and keep table headers', () => {
      const { editor, n: { doc, table, tr, td, th } } = setup()
      const docNode = doc(
        table(
          tr(th('merged cell', { colspan: 2 }), th()),
          tr(td(), td(), td()),
          tr(td(), td(), td()),
        ),
      )

      editor.set(docNode)
      editor.exec(moveTableColumn({ origin: 0, target: 2 }))

      const expected = doc(
        table(
          tr(th(), th('merged cell', { colspan: 2 })),
          tr(td(), td(), td()),
          tr(td(), td(), td()),
        ),
      )
      expect(editor.state.doc.toJSON()).toEqual(expected.toJSON())
    })

    it('should move and keep columns headers', () => {
      const { editor, n: { doc, table, tr, td, th } } = setup()
      const docNode = doc(
        table(
          tr(th(), th(), th()),
          tr(th('b1'), td(), td('b2')),
          tr(th(), td(), td()),
        ),
      )

      editor.set(docNode)
      editor.exec(moveTableColumn({ origin: 2, target: 0 }))

      const expected = doc(
        table(
          tr(th(), th(), th()),
          tr(th('b2'), td('b1'), td()),
          tr(th(), td(), td()),
        ),
      )
      expect(editor.state.doc.toJSON()).toEqual(expected.toJSON())
    })
  })

  describe('on a table with merged rows', () => {
    it('should move columns', () => {
      const { editor, n: { doc, table, tr, td } } = setup()
      const docNode = doc(
        table(
          tr(td('merged-row', { rowspan: 2 }), td('a0'), td('a1')),
          tr(td('b1'), td('b2')),
          tr(td('c1'), td('c2'), td('c3')),
        ),
      )

      editor.set(docNode)
      editor.exec(moveTableColumn({ origin: 1, target: 2 }))

      const expected = doc(
        table(
          tr(td('merged-row', { rowspan: 2 }), td('a1'), td('a0')),
          tr(td('b2'), td('b1')),
          tr(td('c1'), td('c3'), td('c2')),
        ),
      )
      expect(editor.state.doc.toJSON()).toEqual(expected.toJSON())
    })

    it('should move columns for multi rows merged', () => {
      const { editor, n: { doc, table, tr, td } } = setup()
      const docNode = doc(
        table(
          tr(td('a1', { rowspan: 2 }), td('a2'), td('a3')),
          tr(td('b1'), td('b2', { rowspan: 2 })),
          tr(td('c1'), td('c2')),
        ),
      )

      editor.set(docNode)
      editor.exec(moveTableColumn({ origin: 1, target: 2 }))

      const expected = doc(
        table(
          tr(td('a1', { rowspan: 2 }), td('a3'), td('a2')),
          tr(td('b2', { rowspan: 2 }), td('b1')),
          tr(td('c1'), td('c2')),
        ),
      )
      expect(editor.state.doc.toJSON()).toEqual(expected.toJSON())
    })

    it('should move columns between two merged rows', () => {
      const { editor, n: { doc, table, tr, td } } = setup()
      const docNode = doc(
        table(
          tr(td('a1', { rowspan: 2 }), td('a2'), td('a3')),
          tr(td('b1'), td('b2', { rowspan: 2 })),
          tr(td('c1'), td('c2')),
        ),
      )

      editor.set(docNode)
      editor.exec(moveTableColumn({ origin: 0, target: 2 }))

      const expected = doc(
        table(
          tr(td('a2'), td('a3'), td('a1', { rowspan: 2 })),
          tr(td('b1'), td('b2', { rowspan: 2 })),
          tr(td('c2'), td('c1')),
        ),
      )
      expect(editor.state.doc.toJSON()).toEqual(expected.toJSON())
    })

    it('should move column between column with merged row and regular columns', () => {
      const { editor, n: { doc, table, tr, td } } = setup()
      const docNode = doc(
        table(
          tr(td('a1'), td('a2'), td('a3')),
          tr(td('b1'), td('b2', { rowspan: 2 }), td('b3')),
          tr(td('c1'), td('c2')),
        ),
      )

      editor.set(docNode)
      editor.exec(moveTableColumn({ origin: 2, target: 1 }))

      const expected = doc(
        table(
          tr(td('a1'), td('a3'), td('a2')),
          tr(td('b1'), td('b3'), td('b2', { rowspan: 2 })),
          tr(td('c1'), td('c2')),
        ),
      )
      expect(editor.state.doc.toJSON()).toEqual(expected.toJSON())
    })
  })

  describe('on a complex table with merged cells and rows', () => {
    it('keep the merged content columns order', () => {
      const { editor, n: { doc, table, tr, td } } = setup()
      const docNode = doc(
        table(
          tr(td(), td('a1'), td('a2')),
          tr(td(), td('b1', { colspan: 2 })),
          tr(td(), td('c1'), td('c2')),
        ),
      )

      editor.set(docNode)
      editor.exec(moveTableColumn({ origin: 1, target: 0 }))

      const expected = doc(
        table(
          tr(td('a1'), td('a2'), td()),
          tr(td('b1', { colspan: 2 }), td()),
          tr(td('c1'), td('c2'), td()),
        ),
      )
      expect(editor.state.doc.toJSON()).toEqual(expected.toJSON())
    })

    describe('when the first line all columns are merged', () => {
      it('should not move columns', () => {
        const { editor, n: { doc, table, tr, td } } = setup()
        const docNode = doc(
          table(
            tr(td('a1', { colspan: 3 })),
            tr(td('b1'), td(), td()),
            tr(td('c1'), td(), td()),
          ),
        )

        editor.set(docNode)
        editor.exec(moveTableColumn({ origin: 1, target: 0 }))

        const expected = doc(
          table(
            tr(td('a1', { colspan: 3 })),
            tr(td('b1'), td(), td()),
            tr(td('c1'), td(), td()),
          ),
        )
        expect(editor.state.doc.toJSON()).toEqual(expected.toJSON())
      })
    })
  })

  describe('on a simple table with col header', () => {
    it('should move column 0 -> 2', () => {
      const { editor, n: { doc, table, tr, td, th } } = setup()
      const docNode = doc(
        table(
          tr(th('1'), td(), td()),
          tr(th('2'), td(), td()),
          tr(th('3'), td(), td()),
        ),
      )

      editor.set(docNode)
      editor.exec(moveTableColumn({ origin: 0, target: 2 }))

      const expected = doc(
        table(
          tr(th(), td(), td('1')),
          tr(th(), td(), td('2')),
          tr(th(), td(), td('3')),
        ),
      )
      expect(editor.state.doc.toJSON()).toEqual(expected.toJSON())
    })

    it('should move column 2 -> 0', () => {
      const { editor, n: { doc, table, tr, td, th } } = setup()
      const docNode = doc(
        table(
          tr(th('1'), td(), td()),
          tr(th('2'), td(), td()),
          tr(th('3'), td(), td()),
        ),
      )

      editor.set(docNode)
      editor.exec(moveTableColumn({ origin: 2, target: 0 }))

      const expected = doc(
        table(
          tr(th(), td('1'), td()),
          tr(th(), td('2'), td()),
          tr(th(), td('3'), td()),
        ),
      )
      expect(editor.state.doc.toJSON()).toEqual(expected.toJSON())
    })

    it('should move column 1 -> 2', () => {
      const { editor, n: { doc, table, tr, td, th } } = setup()
      const docNode = doc(
        table(
          tr(th('1'), td(), td()),
          tr(th('2'), td('x'), td()),
          tr(th('3'), td(), td()),
        ),
      )

      editor.set(docNode)
      editor.exec(moveTableColumn({ origin: 1, target: 2 }))

      const expected = doc(
        table(
          tr(th('1'), td(), td()),
          tr(th('2'), td(), td('x')),
          tr(th('3'), td(), td()),
        ),
      )
      expect(editor.state.doc.toJSON()).toEqual(expected.toJSON())
    })
  })

  describe('on a simple table with row header', () => {
    it('should move column 0 -> 2', () => {
      const { editor, n: { doc, table, tr, td, th } } = setup()
      const docNode = doc(
        table(
          tr(th('1'), th(), th()),
          tr(td('2'), td(), td()),
          tr(td('3'), td(), td()),
        ),
      )

      editor.set(docNode)
      editor.exec(moveTableColumn({ origin: 0, target: 2 }))

      const expected = doc(
        table(
          tr(th(), th(), th('1')),
          tr(td(), td(), td('2')),
          tr(td(), td(), td('3')),
        ),
      )
      expect(editor.state.doc.toJSON()).toEqual(expected.toJSON())
    })

    it('should move column 2 -> 0', () => {
      const { editor, n: { doc, table, tr, td, th } } = setup()
      const docNode = doc(
        table(
          tr(th('1'), th(), th()),
          tr(td('2'), td(), td()),
          tr(td('3'), td(), td()),
        ),
      )

      editor.set(docNode)
      editor.exec(moveTableColumn({ origin: 2, target: 0 }))

      const expected = doc(
        table(
          tr(th(), th('1'), th()),
          tr(td(), td('2'), td()),
          tr(td(), td('3'), td()),
        ),
      )
      expect(editor.state.doc.toJSON()).toEqual(expected.toJSON())
    })

    it('should move column 1 -> 2', () => {
      const { editor, n: { doc, table, tr, td, th } } = setup()
      const docNode = doc(
        table(
          tr(th('1'), th(), th()),
          tr(td('2'), td('x'), td()),
          tr(td('3'), td(), td()),
        ),
      )

      editor.set(docNode)
      editor.exec(moveTableColumn({ origin: 1, target: 2 }))

      const expected = doc(
        table(
          tr(th('1'), th(), th()),
          tr(td('2'), td(), td('x')),
          tr(td('3'), td(), td()),
        ),
      )
      expect(editor.state.doc.toJSON()).toEqual(expected.toJSON())
    })
  })

  describe('on a simple table with col & row header', () => {
    it('should move column 0 -> 2', () => {
      const { editor, n: { doc, table, tr, td, th } } = setup()
      const docNode = doc(
        table(
          tr(th('1'), th(), th()),
          tr(th('2'), td(), td()),
          tr(th('3'), td(), td()),
        ),
      )

      editor.set(docNode)
      editor.exec(moveTableColumn({ origin: 0, target: 2 }))

      const expected = doc(
        table(
          tr(th(), th(), th('1')),
          tr(th(), td(), td('2')),
          tr(th(), td(), td('3')),
        ),
      )
      expect(editor.state.doc.toJSON()).toEqual(expected.toJSON())
    })

    it('should move column 2 -> 0', () => {
      const { editor, n: { doc, table, tr, td, th } } = setup()
      const docNode = doc(
        table(
          tr(th('1'), th(), th()),
          tr(th('2'), td(), td()),
          tr(th('3'), td(), td()),
        ),
      )

      editor.set(docNode)
      editor.exec(moveTableColumn({ origin: 2, target: 0 }))

      const expected = doc(
        table(
          tr(th(), th('1'), th()),
          tr(th(), td('2'), td()),
          tr(th(), td('3'), td()),
        ),
      )
      expect(editor.state.doc.toJSON()).toEqual(expected.toJSON())
    })

    it('should move column 1 -> 2', () => {
      const { editor, n: { doc, table, tr, td, th } } = setup()
      const docNode = doc(
        table(
          tr(th('1'), th(), th()),
          tr(th('2'), td('x'), td()),
          tr(th('3'), td(), td()),
        ),
      )

      editor.set(docNode)
      editor.exec(moveTableColumn({ origin: 1, target: 2 }))

      const expected = doc(
        table(
          tr(th('1'), th(), th()),
          tr(th('2'), td(), td('x')),
          tr(th('3'), td(), td()),
        ),
      )
      expect(editor.state.doc.toJSON()).toEqual(expected.toJSON())
    })
  })

  describe('table with headers and varying cell types', () => {
    it('should move column 2 to 0', () => {
      const { editor, n: { doc, table, tr, td, th } } = setup()
      const docNode = doc(
        table(
          tr(th('a1'), th('a2'), th('a3'), th('a4'), th('a5')),
          tr(td('b1', { colspan: 2 }), td('b2'), td('b3'), td('b4')),
          tr(td('c1'), td('c2'), td('c3'), td('c4', { colspan: 2 })),
        ),
      )

      editor.set(docNode)
      editor.exec(moveTableColumn({ origin: 2, target: 0 }))

      const expected = doc(
        table(
          tr(th('a3'), th('a1'), th('a2'), th('a4'), th('a5')),
          tr(td('b2'), td('b1', { colspan: 2 }), td('b3'), td('b4')),
          tr(td('c3'), td('c1'), td('c2'), td('c4', { colspan: 2 })),
        ),
      )
      expect(editor.state.doc.toJSON()).toEqual(expected.toJSON())
    })

    it('should move column 0 to 2', () => {
      const { editor, n: { doc, table, tr, td, th } } = setup()
      const docNode = doc(
        table(
          tr(th('a1'), th('a2'), th('a3'), th('a4'), th('a5')),
          tr(td('b1', { colspan: 2 }), td('b2'), td('b3'), td('b4')),
          tr(td('c1'), td('c2'), td('c3'), td('c4', { colspan: 2 })),
        ),
      )

      editor.set(docNode)
      editor.exec(moveTableColumn({ origin: 0, target: 2 }))

      const expected = doc(
        table(
          tr(th('a3'), th('a1'), th('a2'), th('a4'), th('a5')),
          tr(td('b2'), td('b1', { colspan: 2 }), td('b3'), td('b4')),
          tr(td('c3'), td('c1'), td('c2'), td('c4', { colspan: 2 })),
        ),
      )
      expect(editor.state.doc.toJSON()).toEqual(expected.toJSON())
    })
  })
})