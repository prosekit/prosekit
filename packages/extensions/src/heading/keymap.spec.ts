import { describe, expect, it } from 'vitest'

import { pressKey, setupTest } from '../testing'

describe('defineHeadingKeymap', () => {
  it('should toggle heading', async () => {
    const { editor, n } = setupTest()

    const doc = n.doc(n.paragraph('<a>Foo'), n.paragraph('Bar'))
    const docH1 = n.doc(n.heading({ level: 1 }, 'Foo'), n.paragraph('Bar'))
    const docH3 = n.doc(n.heading({ level: 3 }, 'Foo'), n.paragraph('Bar'))

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

    const doc1 = n.doc(n.heading('<a>'))
    const doc2 = n.doc(n.paragraph('<a>'))

    editor.set(doc1)
    expect(editor.state.doc.toJSON()).toEqual(doc1.toJSON())
    await pressKey('Backspace')
    expect(editor.state.doc.toJSON()).toEqual(doc2.toJSON())
  })

  it('should unset heading by pressing Backspace around text', async () => {
    const { editor, n } = setupTest()

    const doc1 = n.doc(n.heading('Foo'), n.heading('<a>Bar'))
    const doc2 = n.doc(n.heading('Foo'), n.paragraph('<a>Bar'))

    editor.set(doc1)
    expect(editor.state.doc.toJSON()).toEqual(doc1.toJSON())
    await pressKey('Backspace')
    expect(editor.state.doc.toJSON()).toEqual(doc2.toJSON())
  })
})
