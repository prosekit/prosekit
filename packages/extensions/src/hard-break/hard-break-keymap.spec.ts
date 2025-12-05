import {
  describe,
  expect,
  it,
} from 'vitest'
import { keyboard } from 'vitest-browser-commands/playwright'

import { setupTest } from '../testing'
import { inputText } from '../testing/keyboard'

describe('defineHardBreakKeymap', () => {
  it('should insert hard break', async () => {
    const { editor, n } = setupTest()

    const doc1 = n.doc(n.p('foo<a>bar'))
    const doc2 = n.doc(n.p('foo', n.hardBreak(), 'bar'))

    editor.set(doc1)
    expect(editor.state.doc.toJSON()).toEqual(doc1.toJSON())
    await keyboard.press('Shift+Enter')
    expect(editor.state.doc.toJSON()).toEqual(doc2.toJSON())

    editor.set(doc1)
    expect(editor.state.doc.toJSON()).toEqual(doc1.toJSON())
    await keyboard.press('ControlOrMeta+Enter')
    expect(editor.state.doc.toJSON()).toEqual(doc2.toJSON())
  })

  it('can continue to type after a hard break', async () => {
    const { editor, n } = setupTest()

    const doc1 = n.doc(n.p('foo<a>bar'))
    const doc2 = n.doc(n.p('foo', n.hardBreak(), 'bar'))
    const doc3 = n.doc(n.p('foo', n.hardBreak(), 'bazbar'))

    editor.set(doc1)
    expect(editor.state.doc.toJSON()).toEqual(doc1.toJSON())
    await keyboard.press('Shift+Enter')
    expect(editor.state.doc.toJSON()).toEqual(doc2.toJSON())
    await inputText('baz')
    expect(editor.state.doc.toJSON()).toEqual(doc3.toJSON())
  })
})
