import { expect, test } from '@playwright/test'

import { testStory, waitForEditor } from './helper'

testStory('unmount', () => {
  test('unmount', async ({ page }) => {
    const button = page.locator('button')
    const buttonAdd = button.filter({ hasText: 'Add editor' })
    const buttonRemove = (no: number) =>
      button.filter({ hasText: `Unmount editor No.${no}` })
    const editor = page.locator('.ProseMirror')

    await waitForEditor(page)

    await expect(editor).toHaveCount(1)

    await buttonAdd.click()
    await expect(editor).toHaveCount(2)

    await buttonAdd.click()
    await expect(editor).toHaveCount(3)

    await buttonRemove(1).click()
    await expect(editor).toHaveCount(2)

    await buttonRemove(3).click()
    await expect(editor).toHaveCount(1)

    await expect(editor).toHaveText('Editor No.2 of 1')
  })
})
