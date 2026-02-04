import { describe, expect, it } from 'vitest'

import { setupTest } from '../testing'

describe('unsetBlockType', () => {
  it('can unset a single block', () => {
    const { editor, n } = setupTest()

    const doc1 = n.doc(n.heading('<a>1'), n.heading('2'))
    const doc2 = n.doc(n.paragraph('<a>1'), n.heading('2'))

    editor.set(doc1)
    expect(editor.state.doc.toJSON()).toEqual(doc1.toJSON())

    editor.commands.unsetBlockType()
    expect(editor.state.doc.toJSON()).toEqual(doc2.toJSON())
  })

  it('can unset multiple blocks', () => {
    const { editor, n } = setupTest()

    const doc1 = n.doc(
      n.heading('0'),
      n.heading('<a>1'),
      n.heading('2'),
      n.heading('<b>3'),
      n.heading('4'),
      n.heading('5'),
    )
    const doc2 = n.doc(
      n.heading('0'),
      n.paragraph('<a>1'),
      n.paragraph('2'),
      n.paragraph('<b>3'),
      n.heading('4'),
      n.heading('5'),
    )

    editor.set(doc1)
    expect(editor.state.doc.toJSON()).toEqual(doc1.toJSON())

    editor.commands.unsetBlockType()
    expect(editor.state.doc.toJSON()).toEqual(doc2.toJSON())
  })
})
