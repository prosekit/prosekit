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

    // Turn on underline, type text -> should be wrapped in <u>
    await expect(underlineBtn).toBeVisible()
    await underlineBtn.click()
    await editor.pressSequentially('hello')
    const underHello = editor.locator('u', { hasText: /hello/ })
    await expect(underHello).toBeVisible()

    // Turn off underline, type more -> should not be underlined
    await expect(underlineBtn).toBeVisible()
    await underlineBtn.click()
    await editor.pressSequentially(' world')
    await expect(underHello).toBeVisible()
    await expect(editor).toContainText('hello world')
    await expect(editor.locator('u', { hasText: /world/ })).toHaveCount(0)
  })
})
