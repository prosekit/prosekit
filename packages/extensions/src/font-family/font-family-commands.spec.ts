import { describe, expect, it } from 'vitest'

import { setupTest } from '../testing/index.ts'

describe('addFontFamily', () => {
  it('can add font-family to text', () => {
    const { editor, n, m } = setupTest()

    const doc1 = n.doc(
      n.p('Hello <a>world<b>'),
    )
    const doc2 = n.doc(
      n.p('Hello ', m.fontFamily({ family: 'Arial' }, 'world')),
    )

    editor.set(doc1)
    editor.commands.addFontFamily({ family: 'Arial' })
    expect(editor.getDocJSON()).toEqual(doc2.toJSON())
  })

  it('can override existing font-family', () => {
    const { editor, n, m } = setupTest()

    const doc1 = n.doc(
      n.p(
        'A',
        m.fontFamily({ family: 'Arial' }, 'B<a>C'),
        m.fontFamily({ family: 'Arial' }, 'DE'),
        'F<b>G',
      ),
    )
    const doc2 = n.doc(
      n.p(
        'A',
        m.fontFamily({ family: 'Arial' }, 'B'),
        m.fontFamily({ family: 'Times New Roman' }, 'CDEF'),
        'G',
      ),
    )

    editor.set(doc1)
    editor.commands.addFontFamily({ family: 'Times New Roman' })
    expect(editor.getDocJSON()).toEqual(doc2.toJSON())
  })
})

describe('removeFontFamily', () => {
  it('can remove font-family from text', () => {
    const { editor, n, m } = setupTest()

    const doc1 = n.doc(
      n.p(
        'A',
        m.fontFamily({ family: 'Arial' }, 'B<a>C'),
        m.fontFamily({ family: 'Georgia' }, 'DE'),
        'F<b>G',
      ),
    )
    const doc2 = n.doc(
      n.p(
        'A',
        m.fontFamily({ family: 'Arial' }, 'B'),
        'CDEFG',
      ),
    )

    editor.set(doc1)
    editor.commands.removeFontFamily()
    expect(editor.getDocJSON()).toEqual(doc2.toJSON())
  })
})
