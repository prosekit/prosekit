import {
  expect,
  it,
} from 'vitest'
import { userEvent } from 'vitest/browser'

import {
  emptyEditor,
  expectLocatorToNotExist,
  locateEditor,
  testStory,
} from './editor'

testStory('placeholder', () => {
  it('shows when empty, hides on input, and reappears after clearing', async () => {
    const editor = locateEditor()

    const placeholder = editor.locate(
      "p.prosekit-placeholder[data-placeholder='Type something...']",
    )

    // Visible on load (empty)
    await expect.element(placeholder).toBeVisible()

    // Type some text => hides
    await userEvent.type(editor, 'Hello')
    await expectLocatorToNotExist(placeholder)

    // Clear all => visible again
    await emptyEditor()
    await expect.element(placeholder).toBeVisible()
  })
})
