import { describe, expect, it } from 'vitest'

import { setupTest } from '../testing/index.ts'
import { inputText } from '../testing/keyboard.ts'

describe('defineCodeBlockInputRule', () => {
  const { editor, n } = setupTest()

  it('should create a code block when typing "```js "', async () => {
    editor.set(n.doc(n.p('<a>')))

    await inputText('```js ')
    expect(editor.view.state.doc.toJSON()).toEqual(
      n.doc(n.codeBlock({ language: 'js' })).toJSON(),
    )
  })

  it('should not create a code block when "```" is 500 characters before the caret', async () => {
    // Input rules only see the last 500 characters before the caret, so `^`
    // matches at the start of that window, not at the start of the paragraph.
    const text = 'a```' + 'b'.repeat(497)
    editor.set(n.doc(n.p(`${text}<a>`)))

    await inputText(' ')
    expect(editor.view.state.doc.toJSON()).toEqual(
      n.doc(n.p(`${text} `)).toJSON(),
    )
  })
})
