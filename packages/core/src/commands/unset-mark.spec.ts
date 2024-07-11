import { describe, expect, it } from 'vitest'

import { setupTest } from '../testing'

describe('unsetMark', () => {
  it('should unset mark', () => {
    const { editor, m, n } = setupTest()

    const doc1 = n.doc(
      n.paragraph(
        '<a>',
        '1',
        m.bold('2'),
        m.italic('3'),
        '<b>',
        m.italic('4'),
        m.italic('5'),
        '<b>',
      ),
    )

    const doc2 = n.doc(
      n.paragraph(
        '<a>',
        '123',
        '<b>',
        m.italic('4'),
        m.italic('5'),
        '<b>',
      ),
    )

    editor.set(doc1)
    expect(editor.state.doc.toJSON()).toEqual(doc1.toJSON())

    editor.commands.unsetMark()
    expect(editor.state.doc.toJSON()).toEqual(doc2.toJSON())

  })
})
