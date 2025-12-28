import {
  describe,
  expect,
  it,
} from 'vitest'

import { setupTest } from '../testing'

describe('addBackgroundColor', () => {
  it('can add background color to text', () => {
    const { editor, n, m } = setupTest()

    const doc1 = n.doc(
      n.p('Hello <a>world<b>'),
    )
    const doc2 = n.doc(
      n.p('Hello ', m.backgroundColor({ color: 'red' }, 'world')),
    )

    editor.set(doc1)
    editor.commands.addBackgroundColor({ color: 'red' })
    expect(editor.getDocJSON()).toEqual(doc2.toJSON())
  })

  it('can override existing background color', () => {
    const { editor, n, m } = setupTest()

    const doc1 = n.doc(
      n.p(
        'A',
        m.backgroundColor({ color: 'red' }, 'B<a>C'),
        m.backgroundColor({ color: 'red' }, 'DE'),
        'F<b>G',
      ),
    )
    const doc2 = n.doc(
      n.p(
        'A',
        m.backgroundColor({ color: 'red' }, 'B'),
        m.backgroundColor({ color: 'blue' }, 'CDEF'),
        'G',
      ),
    )

    editor.set(doc1)
    editor.commands.addBackgroundColor({ color: 'blue' })
    expect(editor.getDocJSON()).toEqual(doc2.toJSON())
  })
})

describe('removeBackgroundColor', () => {
  it('can remove background color from text', () => {
    const { editor, n, m } = setupTest()

    const doc1 = n.doc(
      n.p(
        'A',
        m.backgroundColor({ color: 'red' }, 'B<a>C'),
        m.backgroundColor({ color: 'blue' }, 'DE'),
        'F<b>G',
      ),
    )
    const doc2 = n.doc(
      n.p(
        'A',
        m.backgroundColor({ color: 'red' }, 'B'),
        'CDEFG',
      ),
    )

    editor.set(doc1)
    editor.commands.removeBackgroundColor()
    expect(editor.getDocJSON()).toEqual(doc2.toJSON())
  })
})
