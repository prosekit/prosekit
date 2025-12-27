import {
  describe,
  expect,
  it,
} from 'vitest'

import { setupTest } from '../testing'

describe('addColor', () => {
  it('can add color to text', () => {
    const { editor, n, m } = setupTest()

    const doc1 = n.doc(
      n.p('Hello <a>world<b>'),
    )
    const doc2 = n.doc(
      n.p('Hello ', m.color({ color: 'red' }, 'world')),
    )

    editor.set(doc1)
    editor.commands.addColor({ color: 'red' })
    expect(editor.getDocJSON()).toEqual(doc2.toJSON())
  })
})

describe('removeColor', () => {
  it('can remove color from text', () => {
    const { editor, n, m } = setupTest()

    const doc1 = n.doc(
      n.p(
        'A',
        m.color({ color: 'red' }, 'B<a>C'),
        m.color({ color: 'blue' }, 'DE'),
        'F<b>G',
      ),
    )
    const doc2 = n.doc(
      n.p(
        'A',
        m.color({ color: 'red' }, 'B'),
        'CDEFG',
      ),
    )

    editor.set(doc1)
    editor.commands.removeColor()
    expect(editor.getDocJSON()).toEqual(doc2.toJSON())
  })
})
