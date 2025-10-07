import {
  expect,
  test,
} from '@playwright/test'

import {
  emptyEditor,
  testStory,
  waitForEditor,
} from './helper'

testStory('strike', () => {
  test('toggle via toolbar while typing', async ({ page }) => {
    const editor = await waitForEditor(page)
    const strikeBtn = page.getByRole('button', { name: 'Strikethrough' })

    await emptyEditor(page)

    // Turn on strike, type text -> should be wrapped in <s>/<del> or styled span
    await expect(strikeBtn).toBeVisible()
    await strikeBtn.click()
    await editor.pressSequentially('hello')
    const struckHello = editor.locator('s, del, span[style*="line-through"]', { hasText: /hello/ })
    await expect(struckHello).toBeVisible()

    // Turn off strike, type more -> should not be struck
    await expect(strikeBtn).toBeVisible()
    await strikeBtn.click()
    await editor.pressSequentially(' world')
    await expect(struckHello).toBeVisible()
    await expect(editor).toContainText('hello world')
    await expect(editor.locator('s, del, span[style*="line-through"]', { hasText: /world/ })).toHaveCount(0)
  })

  test('toggle on selection', async ({ page }) => {
    const editor = await waitForEditor(page)
    const strikeBtn = page.getByRole('button', { name: 'Strikethrough' })

    await emptyEditor(page)

    // Type text and select the last 5 characters "world"
    await editor.pressSequentially('hello world')
    await editor.focus()
    await page.keyboard.down('Shift')
    for (let i = 0; i < 5; i++) {
      await page.keyboard.press('ArrowLeft')
    }
    await page.keyboard.up('Shift')

    // Apply strike to selection
    await expect(strikeBtn).toBeVisible()
    await strikeBtn.click()
    const struckWorld = editor.locator('s, del, span[style*="line-through"]', { hasText: /world/ })
    await expect(struckWorld).toBeVisible()

    // Toggle strike off for the same selection
    await expect(strikeBtn).toBeVisible()
    await strikeBtn.click()
    await expect(editor.locator('s, del, span[style*="line-through"]', { hasText: /world/ })).toHaveCount(0)
  })
})
