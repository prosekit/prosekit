import type { Command } from '@prosekit/pm/state'
import { CellSelection } from 'prosemirror-tables'
import { describe, expect, it } from 'vitest'

import { setupTest } from '../../testing'

import { moveTableRow } from './move-table-row'

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

describe('moveTableRow', () => {
  describe('on a simple table', () => {
    it('should move row bottom-to-top', () => {
      const { editor, n: { doc, table, tr, td } } = setup()
      const docNode = doc(
        table(
          tr(td('1'), td(), td()),
          tr(td('2'), td(), td()),
          tr(td('3'), td(), td()),
        ),
      )

      editor.set(docNode)
      editor.exec(moveTableRow({ from: 2, to: 0 }))

      const expected = doc(
        table(
          tr(td('3'), td(), td()),
          tr(td('1'), td(), td()),
          tr(td('2'), td(), td()),
        ),
      )
      expect(editor.state.doc.toJSON()).toEqual(expected.toJSON())
    })

    it('should move row top-to-bottom', () => {
      const { editor, n: { doc, table, tr, td } } = setup()
      const docNode = doc(
        table(
          tr(td('1'), td(), td()),
          tr(td('2'), td('x'), td()),
          tr(td('3'), td(), td()),
        ),
      )

      editor.set(docNode)
      editor.exec(moveTableRow({ from: 1, to: 2 }))

      const expected = doc(
        table(
          tr(td('1'), td(), td()),
          tr(td('3'), td(), td()),
          tr(td('2'), td('x'), td()),
        ),
      )
      expect(editor.state.doc.toJSON()).toEqual(expected.toJSON())
    })

    it('should select row after moving with select option', () => {
      const { editor, n: { doc, table, tr, td } } = setup()
      const docNode = doc(
        table(
          tr(td('1'), td(), td()),
          tr(td('2'), td(), td()),
          tr(td('3'), td(), td()),
        ),
      )

      editor.set(docNode)
      editor.exec(moveTableRow({ from: 2, to: 0, select: true }))

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
      editor.exec(moveTableRow({ from: 1, to: 0 }))

      const expected = doc(
        table(
          tr(td('2'), td(), td()),
          tr(td('1'), td('merged cell', { colspan: 2 })),
          tr(td('3'), td(), td()),
        ),
      )
      expect(editor.state.doc.toJSON()).toEqual(expected.toJSON())
    })

    it('should move lines with columns merged at last line', () => {
      const { editor, n: { doc, table, tr, td } } = setup()
      const docNode = doc(
        table(
          tr(td('1'), td(), td()),
          tr(td('2'), td(), td()),
          tr(td('3'), td('merged cell', { colspan: 2 })),
        ),
      )

      editor.set(docNode)
      editor.exec(moveTableRow({ from: 1, to: 0 }))

      const expected = doc(
        table(
          tr(td('2'), td(), td()),
          tr(td('1'), td(), td()),
          tr(td('3'), td('merged cell', { colspan: 2 })),
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
      editor.exec(moveTableRow({ from: 0, to: 2 }))

      const expected = doc(
        table(
          tr(th(), th(), th()),
          tr(td(), td(), td()),
          tr(td('merged cell', { colspan: 2 }), td()),
        ),
      )
      expect(editor.state.doc.toJSON()).toEqual(expected.toJSON())
    })
  })

  describe('on a table with merged rows', () => {
    it('should move rows', () => {
      const { editor, n: { doc, table, tr, td } } = setup()
      const docNode = doc(
        table(
          tr(td('merged-row', { rowspan: 2 }), td('0'), td('1')),
          tr(td('2'), td('3')),
          tr(td('4'), td('5'), td('6')),
        ),
      )

      editor.set(docNode)
      editor.exec(moveTableRow({ from: 1, to: 2 }))

      const expected = doc(
        table(
          tr(td('4'), td('5'), td('6')),
          tr(td('merged-row', { rowspan: 2 }), td('0'), td('1')),
          tr(td('2'), td('3')),
        ),
      )
      expect(editor.state.doc.toJSON()).toEqual(expected.toJSON())
    })
  })

  describe('on a simple table with header', () => {
    it('should move row header top-to-bottom', () => {
      const { editor, n: { doc, table, tr, td, th } } = setup()
      const docNode = doc(
        table(
          tr(th('1'), th(), th()),
          tr(td('2'), td(), td()),
          tr(td('3'), td(), td()),
        ),
      )

      editor.set(docNode)
      editor.exec(moveTableRow({ from: 0, to: 2 }))

      const expected = doc(
        table(
          tr(th('2'), th(), th()),
          tr(td('3'), td(), td()),
          tr(td('1'), td(), td()),
        ),
      )
      expect(editor.state.doc.toJSON()).toEqual(expected.toJSON())
    })

    it('should move row header bottom-to-top', () => {
      const { editor, n: { doc, table, tr, td, th } } = setup()
      const docNode = doc(
        table(
          tr(th('1'), th(), th()),
          tr(td('2'), td(), td()),
          tr(td('3'), td(), td()),
        ),
      )

      editor.set(docNode)
      editor.exec(moveTableRow({ from: 2, to: 0 }))

      const expected = doc(
        table(
          tr(th('3'), th(), th()),
          tr(td('1'), td(), td()),
          tr(td('2'), td(), td()),
        ),
      )
      expect(editor.state.doc.toJSON()).toEqual(expected.toJSON())
    })

    it('should move col header top-to-bottom', () => {
      const { editor, n: { doc, table, tr, td, th } } = setup()
      const docNode = doc(
        table(
          tr(th('1'), td(), td()),
          tr(th('2'), td(), td()),
          tr(th('3'), td(), td()),
        ),
      )

      editor.set(docNode)
      editor.exec(moveTableRow({ from: 0, to: 2 }))

      const expected = doc(
        table(
          tr(th('2'), td(), td()),
          tr(th('3'), td(), td()),
          tr(th('1'), td(), td()),
        ),
      )
      expect(editor.state.doc.toJSON()).toEqual(expected.toJSON())
    })

    it('should move col header bottom-to-top', () => {
      const { editor, n: { doc, table, tr, td, th } } = setup()
      const docNode = doc(
        table(
          tr(th('1'), td(), td()),
          tr(th('2'), td(), td()),
          tr(th('3'), td(), td()),
        ),
      )

      editor.set(docNode)
      editor.exec(moveTableRow({ from: 2, to: 0 }))

      const expected = doc(
        table(
          tr(th('3'), td(), td()),
          tr(th('1'), td(), td()),
          tr(th('2'), td(), td()),
        ),
      )
      expect(editor.state.doc.toJSON()).toEqual(expected.toJSON())
    })

    it('should move row header correctly within a single column table', () => {
      const { editor, n: { doc, table, tr, td, th } } = setup()
      const docNode = doc(
        table(
          tr(th('1')),
          tr(td('2')),
          tr(td('3')),
        ),
      )

      editor.set(docNode)
      editor.exec(moveTableRow({ from: 0, to: 2 }))

      const expected = doc(
        table(
          tr(th('2')),
          tr(td('3')),
          tr(td('1')),
        ),
      )
      expect(editor.state.doc.toJSON()).toEqual(expected.toJSON())
    })

    it('should move col header correctly within a single column table', () => {
      const { editor, n: { doc, table, tr, th } } = setup()
      const docNode = doc(
        table(
          tr(th('1')),
          tr(th('2')),
          tr(th('3')),
        ),
      )

      editor.set(docNode)
      editor.exec(moveTableRow({ from: 0, to: 2 }))

      const expected = doc(
        table(
          tr(th('2')),
          tr(th('3')),
          tr(th('1')),
        ),
      )
      expect(editor.state.doc.toJSON()).toEqual(expected.toJSON())
    })
  })

  describe('table with varying row node sizes', () => {
    it('should move row from top-to-bottom', () => {
      const { editor, n: { doc, table, tr, td, th } } = setup()
      const docNode = doc(
        table(
          tr(th('1'), th(), th()),
          tr(td('2'.repeat(10)), td('2'.repeat(10)), td('2'.repeat(10))),
          tr(td('3'.repeat(100)), td('3'.repeat(100)), td('3'.repeat(100))),
        ),
      )

      editor.set(docNode)
      editor.exec(moveTableRow({ from: 0, to: 2 }))

      const expected = doc(
        table(
          tr(th('2'.repeat(10)), th('2'.repeat(10)), th('2'.repeat(10))),
          tr(td('3'.repeat(100)), td('3'.repeat(100)), td('3'.repeat(100))),
          tr(td('1'), td(), td()),
        ),
      )
      expect(editor.state.doc.toJSON()).toEqual(expected.toJSON())
    })

    it('should move row from bottom-to-top', () => {
      const { editor, n: { doc, table, tr, td, th } } = setup()
      const docNode = doc(
        table(
          tr(th('1'), th(), th()),
          tr(td('2'.repeat(10)), td('2'.repeat(10)), td('2'.repeat(10))),
          tr(td('3'.repeat(100)), td('3'.repeat(100)), td('3'.repeat(100))),
        ),
      )

      editor.set(docNode)
      editor.exec(moveTableRow({ from: 2, to: 0 }))

      const expected = doc(
        table(
          tr(th('3'.repeat(100)), th('3'.repeat(100)), th('3'.repeat(100))),
          tr(td('1'), td(), td()),
          tr(td('2'.repeat(10)), td('2'.repeat(10)), td('2'.repeat(10))),
        ),
      )
      expect(editor.state.doc.toJSON()).toEqual(expected.toJSON())
    })
  })
})
