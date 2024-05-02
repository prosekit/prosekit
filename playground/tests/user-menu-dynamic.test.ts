import { expect, test } from '@playwright/test'

import { testStory, waitForEditor } from './helper'

testStory('user-menu-dynamic', ({ example }) => {
  test('readonly', async ({ page }) => {
    await page.goto(example)
    const editor = await waitForEditor(page)

    const itemAlice = page.getByText('Alice')
    const itemBob = page.getByText('Bob')

    await editor.pressSequentially('@')

    await expect(itemAlice).toBeVisible()
    await expect(itemBob).toBeVisible()

    await editor.pressSequentially('ali')

    await expect(itemAlice).toBeVisible()
    await expect(itemBob).toBeHidden()
  })
})
