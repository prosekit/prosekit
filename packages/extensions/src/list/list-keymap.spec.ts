import {
  describe,
  expect,
  it,
} from 'vitest'

import {
  pressKey,
  setupTest,
} from '../testing'

describe('keymap', () => {
  const { editor, n } = setupTest()

  it('can update indentation', async () => {
    const doc1 = n.doc(
      //
      n.bullet(n.p('foo')),
      n.bullet(n.p('bar<a>')),
    )
    const doc2 = n.doc(
      //
      n.bullet(
        //
        n.p('foo'),
        n.bullet(n.p('bar<a>')),
      ),
    )
    editor.set(doc1)

    await pressKey('mod-]')
    expect(editor.state.doc.toJSON()).toEqual(doc2.toJSON())
    await pressKey('mod-[')
    expect(editor.state.doc.toJSON()).toEqual(doc1.toJSON())

    await pressKey('Tab')
    expect(editor.state.doc.toJSON()).toEqual(doc2.toJSON())
    await pressKey('Shift-Tab')
    expect(editor.state.doc.toJSON()).toEqual(doc1.toJSON())
  })
})
