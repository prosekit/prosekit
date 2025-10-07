import {
  expect,
  test,
} from '@playwright/test'

import {
  emptyEditor,
  testStory,
  waitForEditor,
} from './helper'

testStory('placeholder', () => {
  test('shows when empty, hides on input, and reappears after clearing', async ({ page }) => {
    const editor = await waitForEditor(page)

    const placeholder = editor.locator(
      "p.prosekit-placeholder[data-placeholder='Type something...']",
    )

    // Visible on load (empty)
    await expect(placeholder).toBeVisible()

    // Type some text => hides
    await editor.pressSequentially('Hello')
    await expect(placeholder).toHaveCount(0)

    // Clear all => visible again
    await emptyEditor(page)
    await expect(placeholder).toBeVisible()
  })
})
