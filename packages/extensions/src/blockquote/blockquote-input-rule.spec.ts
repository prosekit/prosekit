import { describe, expect, it } from 'vitest'

import { setupTest } from '../testing/index.ts'
import { inputText } from '../testing/keyboard.ts'

describe('defineBlockquoteInputRule', () => {
  const { editor, n } = setupTest()

  it('should wrap when typing "> " in an empty paragraph', async () => {
    editor.set(n.doc(n.p('<a>')))

    await inputText('> ')
    expect(editor.view.state.doc.toJSON()).toEqual(
      n.doc(n.blockquote(n.p())).toJSON(),
    )

    await inputText('x')
    expect(editor.view.state.doc.toJSON()).toEqual(
      n.doc(n.blockquote(n.p('x'))).toJSON(),
    )
  })

  it('should not wrap when typing "> " after some text', async () => {
    editor.set(n.doc(n.p('123<a>')))

    await inputText('> ')
    expect(editor.view.state.doc.toJSON()).toEqual(
      n.doc(n.p('123> ')).toJSON(),
    )
  })

  it('should not wrap a long paragraph when "> " is 500 characters before the caret', async () => {
    // Input rules only see the last 500 characters before the caret, so `^`
    // matches at the start of that window, not at the start of the paragraph.
    const text = 'a > ' + 'b'.repeat(498)
    editor.set(n.doc(n.p(`${text}<a>`)))

    await inputText('cd')
    expect(editor.view.state.doc.toJSON()).toEqual(
      n.doc(n.p(`${text}cd`)).toJSON(),
    )
  })
})
