import {
  expect,
  test,
} from '@playwright/test'

import {
  emptyEditor,
  testStory,
  waitForEditor,
} from './helper'

testStory('horizontal-rule', () => {
  test('insert divider and continue typing', async ({ page }) => {
    const editor = await waitForEditor(page)
    const dividerButton = page.getByRole('button', { name: 'Divider' })

    await emptyEditor(page)
    await editor.focus()
    await editor.pressSequentially('Hello')

    await expect(dividerButton).toBeVisible()
    await dividerButton.click()

    const hr = editor.locator('hr')
    await expect(hr).toBeVisible()
    await expect(editor.locator('hr')).toHaveCount(1)

    // Typing should continue after the divider in a new paragraph
    await editor.pressSequentially('World')
    await expect(editor.locator('p', { hasText: 'Hello' })).toBeVisible()
    await expect(editor.locator('p', { hasText: 'World' })).toBeVisible()
  })
})
