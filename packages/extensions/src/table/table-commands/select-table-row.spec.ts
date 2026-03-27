import { describe, expect, it } from 'vitest'

import { setupTest } from '../../testing'
import { inspectSelectedCells } from '../test-utils'

describe('selectTableRow', () => {
  it('can select the whole table row', () => {
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
