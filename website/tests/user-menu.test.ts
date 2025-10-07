import {
  expect,
  test,
} from '@playwright/test'

import {
  emptyEditor,
  testStory,
  waitForEditor,
} from './helper'

testStory('user-menu', () => {
  test('insert user and tag mentions via autocomplete', async ({ page }) => {
    const editor = await waitForEditor(page)

    await emptyEditor(page)
    await editor.focus()

    // Trigger user menu with @
    await editor.press('@')
    await editor.pressSequentially('ali')
    const userItem = page.locator('[role="option"]', { hasText: 'Alice' }).first()
    await expect(userItem).toBeVisible()
    await userItem.click()
    await expect(editor.locator('span[data-mention="user"]', { hasText: '@Alice' })).toBeVisible()

    // Trigger tag menu with #
    await editor.press('#')
    await editor.pressSequentially('tech')
    const tagItem = page.locator('[role="option"]', { hasText: 'technology' }).first()
    await expect(tagItem).toBeVisible()
    await tagItem.click()
    await expect(editor.locator('span[data-mention="tag"]', { hasText: '#technology' })).toBeVisible()
  })
})
