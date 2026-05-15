import { describe, expect, it } from 'vitest'

import { setupTest } from '../testing/index.ts'
import { inputText } from '../testing/keyboard.ts'

describe('defineSubSupInputRule', () => {
  const { editor, n, m } = setupTest()

  it('should add subscript marks when typing "~"', async () => {
    const doc = n.doc(n.p('<a>'))
    editor.set(doc)

    await inputText('~h20')
    expect(editor.view.state.doc.toJSON()).toEqual(
      n.doc(n.p('~h20')).toJSON(),
    )
    await inputText('~')
    expect(editor.view.state.doc.toJSON()).toEqual(
      n.doc(n.p(m.subscript('h20'))).toJSON(),
    )
  })

  it('should add superscript marks when typing "^"', async () => {
    const doc = n.doc(n.p('<a>'))
    editor.set(doc)

    await inputText('^h20')
    expect(editor.view.state.doc.toJSON()).toEqual(
      n.doc(n.p('^h20')).toJSON(),
    )
    await inputText('^')
    expect(editor.view.state.doc.toJSON()).toEqual(
      n.doc(n.p(m.superscript('h20'))).toJSON(),
    )
  })
})
