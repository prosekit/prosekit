import {
  expect,
  test,
} from '@playwright/test'

import {
  emptyEditor,
  testStory,
  waitForEditor,
} from './helper'

testStory('code', () => {
  test('toggle code mark via toolbar', async ({ page }) => {
    const editor = await waitForEditor(page)

    await emptyEditor(page)
    await editor.focus()
    await editor.pressSequentially('hello')
    await page.keyboard.down('Shift')
    for (let i = 0; i < 5; i++) await page.keyboard.press('ArrowLeft')
    await page.keyboard.up('Shift')

    const codeBtn = page.getByRole('button', { name: 'Code' })
    await expect(codeBtn).toBeVisible()
    await codeBtn.click()
    await expect(editor.locator('code', { hasText: 'hello' })).toBeVisible()

    // Toggle off
    await codeBtn.click()
    await expect(editor.locator('code', { hasText: 'hello' })).toHaveCount(0)
  })
})
