import { describe, expect, it } from 'vitest'

import { setupTest } from '../../testing'

describe('insertTable', () => {
  it('can insert a table', () => {
    const { editor, n: { doc, table, tr, td, p } } = setupTest()
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
    const { editor, n: { doc, table, tr, td, th, p } } = setupTest()
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
