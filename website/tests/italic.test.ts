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
})
