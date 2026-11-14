import { describe, expect, it } from 'vitest'
import { userEvent } from 'vitest/browser'

import { setupTest } from '../testing/index.ts'
import { inputText } from '../testing/keyboard.ts'

const { editor, n } = setupTest()

describe('defineCodeBlockInputRule', () => {
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

describe('defineCodeBlockEnterRule', () => {
  it('should create a code block when pressing Enter after "```js"', async () => {
    editor.set(n.doc(n.p('```js<a>')))

    await userEvent.keyboard('{Enter}')
    expect(editor.view.state.doc.toJSON()).toEqual(
      n.doc(n.codeBlock({ language: 'js' })).toJSON(),
    )
  })

  it('should not create a code block when "```" is 200 characters before the caret', async () => {
    // Enter rules only see the last 200 characters before the caret, so `^`
    // matches at the start of that window, not at the start of the paragraph.
    const text = 'a```' + 'b'.repeat(197)
    editor.set(n.doc(n.p(`${text}<a>`)))

    await userEvent.keyboard('{Enter}')
    expect(editor.view.state.doc.toJSON()).toEqual(
      n.doc(n.p(text), n.p()).toJSON(),
    )
  })
})
