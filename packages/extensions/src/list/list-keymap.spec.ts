import { describe, expect, it } from 'vitest'
import { keyboard } from 'vitest-browser-commands/playwright'

import { setupTest } from '../testing'

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

    await keyboard.press('ControlOrMeta+]')
    expect(editor.state.doc.toJSON()).toEqual(doc2.toJSON())
    await keyboard.press('ControlOrMeta+[')
    expect(editor.state.doc.toJSON()).toEqual(doc1.toJSON())

    await keyboard.press('Tab')
    expect(editor.state.doc.toJSON()).toEqual(doc2.toJSON())
    await keyboard.press('Shift+Tab')
    expect(editor.state.doc.toJSON()).toEqual(doc1.toJSON())
  })
})
