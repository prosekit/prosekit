import { describe, expect, it } from 'vitest'

import { setupTest } from '../../testing/index.ts'
import { inputText } from '../../testing/keyboard.ts'

describe('exitTable', () => {
  it('can exist a table', async () => {
    const { editor, n: { doc, table, tr, td, p } } = setupTest()
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
