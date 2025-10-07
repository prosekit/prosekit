import {
  expect,
  test,
} from '@playwright/test'

import {
  emptyEditor,
  testStory,
  waitForEditor,
} from './helper'

testStory('italic', () => {
  test('toggle via toolbar while typing', async ({ page }) => {
    const editor = await waitForEditor(page)
    const italicBtn = page.getByRole('button', { name: 'Italic' })

    await emptyEditor(page)

    // Turn on italic, type text -> should be wrapped in <em>
    await expect(italicBtn).toBeVisible()
    await italicBtn.click()
    await editor.pressSequentially('hello')
    const emHello = editor.locator('em', { hasText: /hello/ })
    await expect(emHello).toBeVisible()

    // Turn off italic, type more -> should not be italic
    await expect(italicBtn).toBeVisible()
    await italicBtn.click()
    await editor.pressSequentially(' world')
    await expect(emHello).toBeVisible()
    await expect(editor).toContainText('hello world')
    await expect(editor.locator('em', { hasText: /world/ })).toHaveCount(0)
  })

  test('toggle on selection', async ({ page }) => {
    const editor = await waitForEditor(page)
    const italicBtn = page.getByRole('button', { name: 'Italic' })

    await emptyEditor(page)

    // Type text and select the last 5 characters "world"
    await editor.pressSequentially('hello world')
    await editor.focus()
    await page.keyboard.down('Shift')
    for (let i = 0; i < 5; i++) {
      await page.keyboard.press('ArrowLeft')
    }
    await page.keyboard.up('Shift')

    // Apply italic to selection
    await expect(italicBtn).toBeVisible()
    await italicBtn.click()
    const emWorld = editor.locator('em', { hasText: /world/ })
    await expect(emWorld).toBeVisible()

    // Toggle italic off for the same selection
    await expect(italicBtn).toBeVisible()
    await italicBtn.click()
    await expect(editor.locator('em', { hasText: /world/ })).toHaveCount(0)
  })
})
