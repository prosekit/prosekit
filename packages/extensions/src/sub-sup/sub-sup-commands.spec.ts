import { describe, expect, it } from 'vitest'

import { setupTest } from '../testing/index.ts'

describe('defineSubSupCommands', () => {
  it('should toggle subscript marks', () => {
    const { editor, n, m } = setupTest()

    const doc1 = n.doc(n.p('H<a>2<b>O'))
    const doc2 = n.doc(n.p('H', m.subscript('2'), 'O'))

    editor.set(doc1)
    editor.commands.toggleSubscript()
    expect(editor.getDocJSON()).toEqual(doc2.toJSON())

    editor.commands.toggleSubscript()
    expect(editor.getDocJSON()).toEqual(doc1.toJSON())
  })

  it('should toggle superscript marks', () => {
    const { editor, n, m } = setupTest()

    const doc1 = n.doc(n.p('x<a>2<b>'))
    const doc2 = n.doc(n.p('x', m.superscript('2')))

    editor.set(doc1)
    editor.commands.toggleSuperscript()
    expect(editor.getDocJSON()).toEqual(doc2.toJSON())

    editor.commands.toggleSuperscript()
    expect(editor.getDocJSON()).toEqual(doc1.toJSON())
  })
})
