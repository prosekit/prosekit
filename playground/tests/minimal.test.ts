import {
  expect,
  test,
} from '@playwright/test'

import {
  testStory,
  waitForEditor,
} from './helper'

testStory('minimal', () => {
  test('typing', async ({ page }) => {
    const editor = await waitForEditor(page)
    expect(await editor.textContent()).not.toContain('Hello')
    await editor.pressSequentially('Hello ')
    expect(await editor.textContent()).toContain('Hello')
  })
})
