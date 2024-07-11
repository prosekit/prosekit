import { describe, expect, it } from 'vitest'

import { pressKeys, setupTest } from '../testing'

describe('defineHeadingKeymap', () => {
  it('should toggle heading', async () => {
    const { editor, n } = setupTest()

    const doc = n.doc(n.paragraph('<a>Foo'), n.paragraph('Bar'))
    const docH1 = n.doc(n.heading({ level: 1 }, 'Foo'), n.paragraph('Bar'))
    const docH3 = n.doc(n.heading({ level: 3 }, 'Foo'), n.paragraph('Bar'))

    editor.set(doc)
    expect(editor.state.doc.toJSON()).toEqual(doc.toJSON())
    await pressKeys('mod-1')
    expect(editor.state.doc.toJSON()).toEqual(docH1.toJSON())
    await pressKeys('mod-1')
    expect(editor.state.doc.toJSON()).toEqual(doc.toJSON())
    await pressKeys('mod-3')
    expect(editor.state.doc.toJSON()).toEqual(docH3.toJSON())
    await pressKeys('mod-1')
    expect(editor.state.doc.toJSON()).toEqual(docH1.toJSON())
  })
})
