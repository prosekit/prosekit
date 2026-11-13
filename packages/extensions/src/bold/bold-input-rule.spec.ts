import { describe, expect, it } from 'vitest'

import { setupTest } from '../testing/index.ts'
import { inputText } from '../testing/keyboard.ts'

describe('defineBoldInputRule', () => {
  const { editor, n, m } = setupTest()
  it('should add bold marks when typing "**"', async () => {
    const doc = n.doc(n.p('<a>'))
    editor.set(doc)

    await inputText('**word')
    expect(editor.view.state.doc.toJSON()).toEqual(
      n.doc(n.p('**word')).toJSON(),
    )

    await inputText('*')
    expect(editor.view.state.doc.toJSON()).toEqual(
      n.doc(n.p('**word*')).toJSON(),
    )

    await inputText('*')
    expect(editor.view.state.doc.toJSON()).toEqual(
      n.doc(n.p(m.bold('word'))).toJSON(),
    )
  })

  it('should not add bold marks when typing "**" inside a code block', async () => {
    const doc = n.doc(n.codeBlock('<a>'))
    editor.set(doc)

    await inputText('**word** ')
    expect(editor.view.state.doc.toJSON()).toEqual(
      n.doc(n.codeBlock('**word** ')).toJSON(),
    )
  })

  it('should not add bold marks when typing "**" inside a code mark', async () => {
    const doc = n.doc(n.p(m.code('code <a>')))
    editor.set(doc)

    await inputText('**word** ')
    expect(editor.view.state.doc.toJSON()).toEqual(
      n.doc(n.p(m.code('code **word** '))).toJSON(),
    )
  })

  it('should not add bold marks when the opening "**" is 500 characters before the caret', async () => {
    // Input rules only see the last 500 characters before the caret, so the
    // lookbehind before the opening "**" tests the start of that window.
    const text = 'a**' + 'b'.repeat(497)
    editor.set(n.doc(n.p(`${text}<a>`)))

    await inputText('**')
    expect(editor.view.state.doc.toJSON()).toEqual(
      n.doc(n.p(`${text}**`)).toJSON(),
    )
  })
})
