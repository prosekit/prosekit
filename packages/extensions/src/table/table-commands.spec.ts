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

describe('insertTable', () => {
  it('can insert a table', () => {
    const { editor, n: { doc, table, tr, td, p } } = setup()
    editor.commands.insertTable({ row: 3, col: 2, header: false })
    const expected = doc(
      table(
        //
        tr(td(), td()),
        tr(td(), td()),
        tr(td(), td()),
      ),
      p(),
    )
    expect(editor.state.doc.toJSON()).toEqual(expected.toJSON())
  })

  it('can insert a table with header', () => {
    const { editor, n: { doc, table, tr, td, th, p } } = setup()
    editor.commands.insertTable({ row: 3, col: 2, header: true })
    const expected = doc(
      table(
        //
        tr(th(), th()),
        tr(td(), td()),
        tr(td(), td()),
      ),
      p(),
    )
    expect(editor.state.doc.toJSON()).toEqual(expected.toJSON())
  })
})

describe('exitTable', () => {
  it('can exist a table', async () => {
    const { editor, n: { doc, table, tr, td, p } } = setup()
    const doc1 = doc(
      table(
        //
        tr(td('<a>'), td()),
        tr(td(), td()),
      ),
    )
    editor.set(doc1)

    await inputText('foo')
    const doc2 = doc(
      table(
        //
        tr(td('foo'), td()),
        tr(td(), td()),
      ),
    )
    expect(editor.state.doc.toJSON()).toEqual(doc2.toJSON())

    editor.commands.exitTable()
    await inputText('bar')

    const doc3 = doc(
      table(
        //
        tr(td('foo'), td()),
        tr(td(), td()),
      ),
      p('bar'),
    )
    expect(editor.state.doc.toJSON()).toEqual(doc3.toJSON())
  })
})

describe('deleteCellSelection', () => {
  it('can clear the content in the selected table cells', () => {
    const { editor, n: { doc, table, tr, td }, setCellSelection } = setup()
    const doc1 = doc(
      table(
        tr(/*2*/ td('1'), /*7*/ td('2') /*12*/),
        /*13*/
        tr(/*14*/ td('3'), /*19*/ td('4') /*24*/),
        /*25*/
        tr(/*26*/ td('5'), /*31*/ td('6') /*36*/),
      ),
    )

    editor.set(doc1)
    setCellSelection(2, 19)
    expect(isCellSelection(editor.state.selection)).toBe(true)

    editor.commands.deleteCellSelection()
    expect(isCellSelection(editor.state.selection)).toBe(true)

    const doc2 = doc(
      table(
        //
        tr(td(), td()),
        tr(td(), td()),
        tr(td('5'), td('6')),
      ),
    )
    expect(editor.state.doc.toJSON()).toEqual(doc2.toJSON())
  })
})

describe('selectTableColumn', () => {
  it('can select the whole table column', () => {
    const { editor, n: { doc, table, tr, td } } = setup()
    const doc1 = doc(
      table(
        //
        tr(td('1'), td('2')),
        tr(td('3'), td('4<a>')),
        tr(td('5'), td('6')),
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
    const { editor, n: { doc, table, tr, td } } = setup()
    const doc1 = doc(
      table(
        //
        tr(td('1'), td('2')),
        tr(td('3'), td('4<a>')),
        tr(td('5'), td('6')),
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
    const { editor, n: { doc, table, tr, td } } = setup()
    const doc1 = doc(
      table(
        //
        tr(td('1'), td('2')),
        tr(td('3'), td('4<a>')),
        tr(td('5'), td('6')),
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
    const { editor, n: { doc, table, tr, td } } = setup()
    const doc1 = doc(
      table(
        //
        tr(td('1'), td('2')),
        tr(td('3'), td('4<a>')),
        tr(td('5'), td('6')),
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
