import {
  expect,
  test,
} from '@playwright/test'

import {
  emptyEditor,
  testStory,
  waitForEditor,
} from './helper'

testStory('toolbar', () => {
  test('bold and heading buttons work', async ({ page }) => {
    const editor = await waitForEditor(page)

    // Bold on selection
    await emptyEditor(page)
    await editor.focus()
    await editor.pressSequentially('Hello')
    await page.keyboard.down('Shift')
    for (let i = 0; i < 5; i++) await page.keyboard.press('ArrowLeft')
    await page.keyboard.up('Shift')
    const bold = page.getByRole('button', { name: 'Bold' })
    await expect(bold).toBeVisible()
    await bold.click()
    await expect(editor.locator('strong', { hasText: 'Hello' })).toBeVisible()

    // Heading 1 on current block
    await emptyEditor(page)
    await editor.focus()
    await editor.pressSequentially('Hello')
    const h1 = page.getByRole('button', { name: 'Heading 1' })
    await expect(h1).toBeVisible()
    await h1.click()
    await expect(editor.locator('h1', { hasText: 'Hello' })).toBeVisible()
  })
})
