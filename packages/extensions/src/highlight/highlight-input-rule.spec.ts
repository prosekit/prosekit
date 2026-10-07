import { describe, expect, it } from 'vitest'

import { setupTest } from '../testing/index.ts'
import { inputText } from '../testing/keyboard.ts'

describe('defineHighlightInputRule', () => {
  const { editor, n, m } = setupTest()
  it('should add highlight marks when typing "=="', async () => {
    const doc = n.doc(n.p('<a>'))
    editor.set(doc)

    await inputText('==word')
    expect(editor.view.state.doc.toJSON()).toEqual(
      n.doc(n.p('==word')).toJSON(),
    )

    await inputText('=')
    expect(editor.view.state.doc.toJSON()).toEqual(
      n.doc(n.p('==word=')).toJSON(),
    )

    await inputText('=')
    expect(editor.view.state.doc.toJSON()).toEqual(
      n.doc(n.p(m.highlight('word'))).toJSON(),
    )
  })

  it('should not add highlight marks when typing "==" inside a code block', async () => {
    const doc = n.doc(n.codeBlock('<a>'))
    editor.set(doc)

    await inputText('==word== ')
    expect(editor.view.state.doc.toJSON()).toEqual(
      n.doc(n.codeBlock('==word== ')).toJSON(),
    )
  })

  it('should not add highlight marks when typing "==" inside a code mark', async () => {
    const doc = n.doc(n.p(m.code('code <a>')))
    editor.set(doc)

    await inputText('==word== ')
    expect(editor.view.state.doc.toJSON()).toEqual(
      n.doc(n.p(m.code('code ==word== '))).toJSON(),
    )
  })
})
