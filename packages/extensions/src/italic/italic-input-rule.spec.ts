import { describe, expect, it } from 'vitest'

import { setupTest } from '../testing/index.ts'
import { inputText } from '../testing/keyboard.ts'

describe('defineItalicInputRule', () => {
  const { editor, n, m } = setupTest()
  it('should add italic marks when typing "*"', async () => {
    const doc = n.doc(n.p('<a>'))
    editor.set(doc)

    await inputText('*word')
    expect(editor.view.state.doc.toJSON()).toEqual(
      n.doc(n.p('*word')).toJSON(),
    )
    await inputText('*')
    expect(editor.view.state.doc.toJSON()).toEqual(
      n.doc(n.p(m.italic('word'))).toJSON(),
    )
  })
})
