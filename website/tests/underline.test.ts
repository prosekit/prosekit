import {
  expect,
  test,
} from '@playwright/test'

import {
  emptyEditor,
  testStory,
  waitForEditor,
} from './helper'

testStory('underline', () => {
  test('toggle via toolbar while typing', async ({ page }) => {
    const editor = await waitForEditor(page)
    const underlineBtn = page.getByRole('button', { name: 'Underline' })

    await emptyEditor(page)

    // Turn on underline, type text -> should be wrapped in <u> or styled span
    await underlineBtn.click()
    await editor.pressSequentially('hello')
    const underHello = editor.locator('u, span[style*="text-decoration-line: underline"], span[style*="text-decoration: underline"]', { hasText: /hello/ })
    await expect(underHello).toBeVisible()

    // Turn off underline, type more -> should not be underlined
    await underlineBtn.click()
    await editor.pressSequentially(' world')
    await expect(underHello).toBeVisible()
    await expect(editor).toContainText('hello world')
    await expect(
      editor.locator('u, span[style*="text-decoration-line: underline"], span[style*="text-decoration: underline"]', { hasText: /world/ }),
    ).toHaveCount(0)
  })

  test('toggle on selection', async ({ page }) => {
    const editor = await waitForEditor(page)
    const underlineBtn = page.getByRole('button', { name: 'Underline' })

    await emptyEditor(page)

    // Type text and select the last 5 characters "world"
    await editor.pressSequentially('hello world')
    await editor.focus()
    await page.keyboard.down('Shift')
    for (let i = 0; i < 5; i++) {
      await page.keyboard.press('ArrowLeft')
    }
    await page.keyboard.up('Shift')

    // Apply underline to selection
    await underlineBtn.click()
    const underWorld = editor.locator('u, span[style*="text-decoration-line: underline"], span[style*="text-decoration: underline"]', { hasText: /world/ })
    await expect(underWorld).toBeVisible()

    // Toggle underline off for the same selection
    await underlineBtn.click()
    await expect(
      editor.locator('u, span[style*="text-decoration-line: underline"], span[style*="text-decoration: underline"]', { hasText: /world/ }),
    ).toHaveCount(0)
  })
})
