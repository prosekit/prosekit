import {
  expect,
  test,
} from '@playwright/test'

import {
  testStory,
  waitForEditor,
} from './helper'

testStory('hard-break', () => {
  test('insert hard break via toolbar and keyboard', async ({ page }) => {
    const editor = await waitForEditor(page)

    // Count existing line breaks in default content
    const brsBefore = await editor.locator('br').count()

    // Insert via toolbar
    const button = page.getByRole('button', { name: 'Insert Hard Break' })
    await expect(button).toBeVisible()
    await button.click()
    await expect(editor.locator('br')).toHaveCount(brsBefore + 1)

    // Insert via keyboard: Shift+Enter
    await editor.focus()
    await editor.pressSequentially('A')
    await editor.press('Shift+Enter')
    await editor.pressSequentially('B')
    await expect(editor.locator('br')).toHaveCount(brsBefore + 2)
    await expect(editor.getByText('A')).toBeVisible()
    await expect(editor.getByText('B')).toBeVisible()
  })
})
