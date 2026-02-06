import { describe, expect, it } from 'vitest'

import { setupTest } from '../testing'

describe('addTextColor', () => {
  it('can add color to text', () => {
    const { editor, n, m } = setupTest()

    const doc1 = n.doc(
      n.p('Hello <a>world<b>'),
    )
    const doc2 = n.doc(
      n.p('Hello ', m.textColor({ color: 'red' }, 'world')),
    )

    editor.set(doc1)
    editor.commands.addTextColor({ color: 'red' })
    expect(editor.getDocJSON()).toEqual(doc2.toJSON())
  })

  it('can override existing color', () => {
    const { editor, n, m } = setupTest()

    const doc1 = n.doc(
      n.p(
        'A',
        m.textColor({ color: 'red' }, 'B<a>C'),
        m.textColor({ color: 'red' }, 'DE'),
        'F<b>G',
      ),
    )
    const doc2 = n.doc(
      n.p(
        'A',
        m.textColor({ color: 'red' }, 'B'),
        m.textColor({ color: 'blue' }, 'CDEF'),
        'G',
      ),
    )

    editor.set(doc1)
    editor.commands.addTextColor({ color: 'blue' })
    expect(editor.getDocJSON()).toEqual(doc2.toJSON())
  })
})

describe('removeColor', () => {
  it('can remove color from text', () => {
    const { editor, n, m } = setupTest()

    const doc1 = n.doc(
      n.p(
        'A',
        m.textColor({ color: 'red' }, 'B<a>C'),
        m.textColor({ color: 'blue' }, 'DE'),
        'F<b>G',
      ),
    )
    const doc2 = n.doc(
      n.p(
        'A',
        m.textColor({ color: 'red' }, 'B'),
        'CDEFG',
      ),
    )

    editor.set(doc1)
    editor.commands.removeTextColor()
    expect(editor.getDocJSON()).toEqual(doc2.toJSON())
  })
})
