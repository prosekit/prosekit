import {
  describe,
  expect,
  it,
} from 'vitest'

import { setupTest } from '../testing'
import { pressKey } from '../testing/keyboard'

describe('blockquote keymap', () => {
  it('should wrap paragraph into blockquote with shortcut', async () => {
    const { editor, n } = setupTest()

    const doc1 = n.doc(n.p('hel<a>lo'))
    editor.set(doc1)

    await pressKey('mod-shift-b')

    const doc2 = n.doc(n.blockquote(n.p('hello')))
    expect(editor.state.doc.toJSON()).toEqual(doc2.toJSON())
  })

  it('should lift blockquote up with shortcut', async () => {
    const { editor, n } = setupTest()
    const doc1 = n.doc(n.blockquote(n.p('hello')))
    editor.set(doc1)

    await pressKey('mod-shift-b')

    const doc2 = n.doc(n.p('hello'))
    expect(editor.state.doc.toJSON()).toEqual(doc2.toJSON())
  })

  it('should unset blockquote when press backspace at the beginning of blockquote', async () => {
    const { editor, n } = setupTest()
    const doc1 = n.doc(n.blockquote(n.p('<a>hello')))

    editor.set(doc1)

    await pressKey('Backspace')

    const doc2 = n.doc(n.p('hello'))
    expect(editor.state.doc.toJSON()).toEqual(doc2.toJSON())
  })
})
