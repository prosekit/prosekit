import {
  expect,
  test,
} from '@playwright/test'

import {
  testStory,
  waitForEditor,
} from './helper'

testStory('table', () => {
  test('table', async ({ page }) => {
    const editor = await waitForEditor(page)

    await expect(editor.locator('table')).toBeVisible()
    await expect(editor.locator('td', { hasText: '1' })).toBeVisible()
  })
})
