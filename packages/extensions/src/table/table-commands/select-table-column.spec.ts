import type { Selection } from '@prosekit/pm/state'
import {
  describe,
  expect,
  it,
} from 'vitest'

import { setupTest } from '../../testing'
import { isCellSelection } from '../table-utils'

describe('selectTableColumn', () => {
  it('can select the whole table column', () => {
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
