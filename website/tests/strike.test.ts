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

    // Turn on strike, type text -> should be wrapped in <s>
    await expect(strikeBtn).toBeVisible()
    await strikeBtn.click()
    await editor.pressSequentially('hello')
    const struckHello = editor.locator('s', { hasText: /hello/ })
    await expect(struckHello).toBeVisible()

    // Turn off strike, type more -> should not be struck
    await expect(strikeBtn).toBeVisible()
    await strikeBtn.click()
    await editor.pressSequentially(' world')
    await expect(struckHello).toBeVisible()
    await expect(editor).toContainText('hello world')
    await expect(editor.locator('s', { hasText: /world/ })).toHaveCount(0)
  })
})
