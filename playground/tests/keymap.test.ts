import { expect, test } from '@playwright/test'

import { locateEditor, testStory } from './helper'

testStory('keymap', ({ example }) => {
  test('keymap', async ({ page }) => {
    await page.goto(example)
    const editor = locateEditor(page)
    const shiftEnterButton = page.getByRole('button', {
      name: 'Submit with Shift + Enter',
    })
    const enterButton = page.getByRole('button', {
      name: 'Submit with Enter',
    })

    await expect(page.getByRole('listitem')).toHaveCount(0)

    await shiftEnterButton.click()

    await editor.click()

    await editor.press('Shift+Enter')
    await expect(page.getByRole('listitem')).toHaveCount(1)

    await editor.press('Enter')
    await expect(page.getByRole('listitem')).toHaveCount(1)

    await enterButton.click()

    await editor.click()

    await editor.press('Shift+Enter')
    await expect(page.getByRole('listitem')).toHaveCount(1)

    await editor.press('Enter')
    await expect(page.getByRole('listitem')).toHaveCount(2)
  })
})
