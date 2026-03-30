import { describe, expect, it } from 'vitest'

import { setupTest } from '../testing/index.ts'

describe('insertHorizontalRule', () => {
  const { editor, n } = setupTest()

  it('should insert a horizontal rule in an empty paragraph', () => {
    const doc = n.doc(n.p('<a>'))
    editor.set(doc)

    editor.commands.insertHorizontalRule()
    expect(editor.view.state.doc.toJSON()).toEqual(
      n.doc(n.horizontalRule()).toJSON(),
    )
  })

  it('should insert a horizontal rule after some text', () => {
    const doc = n.doc(n.p('123<a>'))
    editor.set(doc)

    editor.commands.insertHorizontalRule()
    expect(editor.view.state.doc.toJSON()).toEqual(
      n.doc(n.p('123'), n.horizontalRule()).toJSON(),
    )
  })

  it('should insert a horizontal rule before some text', () => {
    const doc = n.doc(n.p('<a>123'))
    editor.set(doc)

    editor.commands.insertHorizontalRule()
    expect(editor.view.state.doc.toJSON()).toEqual(
      n.doc(n.horizontalRule(), n.p('123')).toJSON(),
    )
  })

  it('should insert a horizontal rule between some text', () => {
    const doc = n.doc(n.p('123<a>456'))
    editor.set(doc)

    editor.commands.insertHorizontalRule()
    expect(editor.view.state.doc.toJSON()).toEqual(
      n.doc(n.p('123'), n.horizontalRule(), n.p('456')).toJSON(),
    )
  })

  it('should keep the selected text', () => {
    const doc = n.doc(n.p('123<a>4<b>56'))
    editor.set(doc)

    editor.commands.insertHorizontalRule()
    expect(editor.view.state.doc.toJSON()).toEqual(
      n.doc(n.p('123'), n.horizontalRule(), n.p('456')).toJSON(),
    )
  })
})
