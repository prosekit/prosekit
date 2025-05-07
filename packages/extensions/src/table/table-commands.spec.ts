import type {
  Command,
  Selection,
} from '@prosekit/pm/state'
import { CellSelection } from 'prosemirror-tables'
import {
  describe,
  expect,
  it,
} from 'vitest'

import { setupTest } from '../testing'
import { inputText } from '../testing/keyboard'

import { isCellSelection } from './table-utils'

function setup() {
  const { editor, n } = setupTest()
  const c = (text?: string) => n.tableCell(text ? n.p(text) : n.p())
  const h = (text?: string) => n.tableHeaderCell(text ? n.p(text) : n.p())
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

describe('insertTable', () => {
  it('can insert a table', () => {
    const { editor, n, c, r } = setup()
    editor.commands.insertTable({ row: 3, col: 2, header: false })
    const expected = n.doc(
      n.table(
        //
        r(c(), c()),
        r(c(), c()),
        r(c(), c()),
      ),
      n.p(),
    )
    expect(editor.state.doc.toJSON()).toEqual(expected.toJSON())
  })

  it('can insert a table with header', () => {
    const { editor, n, c, r, h } = setup()
    editor.commands.insertTable({ row: 3, col: 2, header: true })
    const expected = n.doc(
      n.table(
        //
        r(h(), h()),
        r(c(), c()),
        r(c(), c()),
      ),
      n.p(),
    )
    expect(editor.state.doc.toJSON()).toEqual(expected.toJSON())
  })
})

describe('exitTable', () => {
  it('can exist a table', async () => {
    const { editor, n, c, r } = setup()
    const doc1 = n.doc(
      n.table(
        //
        r(c('<a>'), c()),
        r(c(), c()),
      ),
    )
    editor.set(doc1)

    await inputText('foo')
    const doc2 = n.doc(
      n.table(
        //
        r(c('foo'), c()),
        r(c(), c()),
      ),
    )
    expect(editor.state.doc.toJSON()).toEqual(doc2.toJSON())

    editor.commands.exitTable()
    await inputText('bar')

    const doc3 = n.doc(
      n.table(
        //
        r(c('foo'), c()),
        r(c(), c()),
      ),
      n.p('bar'),
    )
    expect(editor.state.doc.toJSON()).toEqual(doc3.toJSON())
  })
})

describe('deleteCellSelection', () => {
  it('can clear the content in the selected table cells', () => {
    const { editor, n, c, r, setCellSelection } = setup()
    const doc1 = n.doc(
      n.table(
        r(/*2*/ c('1'), /*7*/ c('2') /*12*/),
        /*13*/
        r(/*14*/ c('3'), /*19*/ c('4') /*24*/),
        /*25*/
        r(/*26*/ c('5'), /*31*/ c('6') /*36*/),
      ),
    )

    editor.set(doc1)
    setCellSelection(2, 19)
    expect(isCellSelection(editor.state.selection)).toBe(true)

    editor.commands.deleteCellSelection()
    expect(isCellSelection(editor.state.selection)).toBe(true)

    const doc2 = n.doc(
      n.table(
        //
        r(c(), c()),
        r(c(), c()),
        r(c('5'), c('6')),
      ),
    )
    expect(editor.state.doc.toJSON()).toEqual(doc2.toJSON())
  })
})

describe('selectTableColumn', () => {
  it('can select the whole table column', () => {
    const { editor, n, c, r } = setup()
    const doc1 = n.doc(
      n.table(
        //
        r(c('1'), c('2')),
        r(c('3'), c('4<a>')),
        r(c('5'), c('6')),
      ),
    )

    editor.set(doc1)
    editor.commands.selectTableColumn()
    const selection = editor.state.selection
    expect(inspectSelectedCells(selection)).toMatchInlineSnapshot(`
      [
        "2",
        "4",
        "6",
      ]
    `)
  })
})

describe('selectTableRow', () => {
  it('can select the whole table row', () => {
    const { editor, n, c, r } = setup()
    const doc1 = n.doc(
      n.table(
        //
        r(c('1'), c('2')),
        r(c('3'), c('4<a>')),
        r(c('5'), c('6')),
      ),
    )

    editor.set(doc1)
    editor.commands.selectTableRow()
    const selection = editor.state.selection
    expect(inspectSelectedCells(selection)).toMatchInlineSnapshot(`
      [
        "3",
        "4",
      ]
    `)
  })
})

describe('selectTableCell', () => {
  it('can select a table cell', () => {
    const { editor, n, c, r } = setup()
    const doc1 = n.doc(
      n.table(
        //
        r(c('1'), c('2')),
        r(c('3'), c('4<a>')),
        r(c('5'), c('6')),
      ),
    )

    editor.set(doc1)
    expect(isCellSelection(editor.state.selection)).toBe(false)
    editor.commands.selectTableCell()
    expect(isCellSelection(editor.state.selection)).toBe(true)
    const selection = editor.state.selection
    expect(inspectSelectedCells(selection)).toMatchInlineSnapshot(`
      [
        "4",
      ]
    `)
  })
})

describe('selectTable', () => {
  it('can select the whole table', () => {
    const { editor, n, c, r } = setup()
    const doc1 = n.doc(
      n.table(
        //
        r(c('1'), c('2')),
        r(c('3'), c('4<a>')),
        r(c('5'), c('6')),
      ),
    )

    editor.set(doc1)
    editor.commands.selectTable()
    const selection = editor.state.selection
    expect(inspectSelectedCells(selection)).toMatchInlineSnapshot(`
      [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
      ]
    `)
  })
})

function inspectSelectedCells(selection: Selection) {
  if (isCellSelection(selection)) {
    const cells: string[] = []
    selection.forEachCell((node) => {
      cells.push(node.textContent)
    })
    return cells
  }
  return []
}
