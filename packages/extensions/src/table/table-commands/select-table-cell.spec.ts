import { describe, expect, it } from 'vitest'

import { setupTest } from '../../testing'
import { isCellSelection } from '../table-utils'
import { inspectSelectedCells } from '../test-utils'

describe('selectTableCell', () => {
  it('can select a table cell', () => {
    const { editor, n: { doc, table, tr, td } } = setupTest()
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
