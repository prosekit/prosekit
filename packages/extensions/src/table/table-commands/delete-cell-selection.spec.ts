import {
  describe,
  expect,
  it,
} from 'vitest'

import { setupTest } from '../../testing'
import { isCellSelection } from '../table-utils'
import { setCellSelection } from '../test-utils'

describe('deleteCellSelection', () => {
  it('can clear the content in the selected table cells', () => {
    const { editor, n: { doc, table, tr, td } } = setupTest()
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
    editor.exec(setCellSelection(2, 19))
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
