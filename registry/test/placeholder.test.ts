import {
  expect,
  it,
} from 'vitest'

import {
  emptyEditor,
  expectLocatorToNotExist,
  focusEditor,
  inputText,
  testStory,
  testStoryConsistency,
  waitForEditor,
} from './helpers'

testStoryConsistency('placeholder')

testStory('placeholder', () => {
  it('shows when empty, hides on input, and reappears after clearing', async () => {
    const editor = await waitForEditor()
    await focusEditor()

    const placeholder = editor.locate(
      "p.prosekit-placeholder[data-placeholder='Type something...']",
    )

    // Visible on load (empty)
    await expect.element(placeholder).toBeVisible()

    // Type some text => hides
    await inputText('Hello')
    await expectLocatorToNotExist(placeholder)

    // Clear all => visible again
    await emptyEditor()
    await expect.element(placeholder).toBeVisible()
  })
})
