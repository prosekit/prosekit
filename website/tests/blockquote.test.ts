import {
  expect,
  test,
} from '@playwright/test'

import {
  emptyEditor,
  testStory,
  waitForEditor,
} from './helper'

testStory('blockquote', ({ example }) => {
  const supportsToggle = example.includes('vue')

  test('toggle blockquote on current paragraph', async ({ page }) => {
    const editor = await waitForEditor(page)
    const btn = page.getByRole('button', { name: 'Blockquote' })

    await emptyEditor(page)
    await editor.pressSequentially('Paragraph')

    // Initially no blockquote
    await expect(editor.locator('blockquote')).toHaveCount(0)

    // Wrap current paragraph in blockquote
    await btn.click()
    const bq = editor.locator('blockquote', { hasText: /Paragraph/ })
    await expect(bq).toBeVisible()

    // Unwrap blockquote (only Vue uses toggle command)
    if (supportsToggle) {
      await btn.click()
      await expect(editor.locator('blockquote')).toHaveCount(0)
    }
  })
})
