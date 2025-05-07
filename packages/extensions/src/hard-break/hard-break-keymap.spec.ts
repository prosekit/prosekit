import {
  describe,
  expect,
  it,
} from 'vitest'

import { setupTest } from '../testing'
import { pressKey } from '../testing/keyboard'

describe('defineHardBreakKeymap', () => {
  it('should insert hard break', async () => {
    const { editor, n } = setupTest()

    const doc1 = n.doc(n.p('foo<a>bar'))
    const doc2 = n.doc(n.p('foo'), n.hardBreak(), n.p('bar'))

    editor.set(doc1)
    expect(editor.state.doc.toJSON()).toEqual(doc1.toJSON())
    await pressKey('mod-Enter')
    expect(editor.state.doc.toJSON()).toEqual(doc2.toJSON())
  })
})
