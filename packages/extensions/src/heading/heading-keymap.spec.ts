import { describe, expect, it } from 'vitest'

import { pressKey, setupTest } from '../testing'

describe('defineHeadingKeymap', () => {
  it('should toggle heading', async () => {
    const { editor, n } = setupTest()

    const doc = n.doc(n.p('<a>Foo'), n.p('Bar'))
    const docH1 = n.doc(n.h1('Foo'), n.p('Bar'))
    const docH3 = n.doc(n.h3('Foo'), n.p('Bar'))

    editor.set(doc)
    expect(editor.state.doc.toJSON()).toEqual(doc.toJSON())
    await pressKey('mod-1')
    expect(editor.state.doc.toJSON()).toEqual(docH1.toJSON())
    await pressKey('mod-1')
    expect(editor.state.doc.toJSON()).toEqual(doc.toJSON())
    await pressKey('mod-3')
    expect(editor.state.doc.toJSON()).toEqual(docH3.toJSON())
    await pressKey('mod-1')
    expect(editor.state.doc.toJSON()).toEqual(docH1.toJSON())
  })

  it('should unset heading by pressing Backspace', async () => {
    const { editor, n } = setupTest()

    const doc1 = n.doc(n.h1('<a>'))
    const doc2 = n.doc(n.p('<a>'))

    editor.set(doc1)
    expect(editor.state.doc.toJSON()).toEqual(doc1.toJSON())
    await pressKey('Backspace')
    expect(editor.state.doc.toJSON()).toEqual(doc2.toJSON())
  })

  it('should unset heading by pressing Backspace around text', async () => {
    const { editor, n } = setupTest()

    const doc1 = n.doc(n.h1('Foo'), n.h1('<a>Bar'))
    const doc2 = n.doc(n.h1('Foo'), n.p('<a>Bar'))

    editor.set(doc1)
    expect(editor.state.doc.toJSON()).toEqual(doc1.toJSON())
    await pressKey('Backspace')
    expect(editor.state.doc.toJSON()).toEqual(doc2.toJSON())
  })
})
