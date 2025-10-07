import {
  expect,
  test,
} from '@playwright/test'

import {
  emptyEditor,
  testStory,
  waitForEditor,
} from './helper'

testStory('bold', () => {
  test('toggle via toolbar while typing', async ({ page }) => {
    const editor = await waitForEditor(page)
    const boldBtn = page.getByRole('button', { name: 'Bold' })

    await emptyEditor(page)

    // Turn on bold, type text -> should be wrapped in <strong>
    await expect(boldBtn).toBeVisible()
    await boldBtn.click()
    await editor.pressSequentially('hello')
    const strongHello = editor.locator('strong', { hasText: /hello/ })
    await expect(strongHello).toBeVisible()

    // Turn off bold, type more -> should not be bold
    await expect(boldBtn).toBeVisible()
    await boldBtn.click()
    await editor.pressSequentially(' world')
    await expect(strongHello).toBeVisible()
    await expect(editor).toContainText('hello world')
    await expect(editor.locator('strong', { hasText: /world/ })).toHaveCount(0)
  })

  test('toggle on selection', async ({ page }) => {
    const editor = await waitForEditor(page)
    const boldBtn = page.getByRole('button', { name: 'Bold' })

    await emptyEditor(page)

    // Type text and select the last 5 characters "world"
    await editor.pressSequentially('hello world')
    await editor.focus()
    await page.keyboard.down('Shift')
    for (let i = 0; i < 5; i++) {
      await page.keyboard.press('ArrowLeft')
    }
    await page.keyboard.up('Shift')

    // Apply bold to selection
    await expect(boldBtn).toBeVisible()
    await boldBtn.click()
    const strongWorld = editor.locator('strong', { hasText: /world/ })
    await expect(strongWorld).toBeVisible()

    // Toggle bold off for the same selection
    await expect(boldBtn).toBeVisible()
    await boldBtn.click()
    await expect(editor.locator('strong', { hasText: /world/ })).toHaveCount(0)
  })
})
