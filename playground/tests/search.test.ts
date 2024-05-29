import { expect, test } from '@playwright/test'

import { testStory, waitForEditor } from './helper'

testStory('search', () => {
  test('search', async ({ page }) => {
    const editor = await waitForEditor(page)

    const searchMatch = editor.locator('.ProseMirror-search-match')
    const activeSearchMatch = editor.locator('.ProseMirror-active-search-match')
    const searchInput = page.getByPlaceholder('Search')
    const replaceInput = page.getByPlaceholder('Replace')
    const toggleReplaceButton = page
      .getByRole('button')
      .filter({ hasText: 'Toggle Replace' })

    await expect(searchMatch).toHaveCount(0)
    await expect(activeSearchMatch).toHaveCount(0)

    await searchInput.fill('One')

    await expect(searchMatch).toHaveCount(3)
    await expect(activeSearchMatch).toHaveCount(0)

    await searchInput.press('Enter')

    await expect(searchMatch).toHaveCount(2)
    await expect(activeSearchMatch).toHaveCount(1)

    await expect(replaceInput).toBeHidden()
    await toggleReplaceButton.click()
    await expect(replaceInput).toBeVisible()

    await replaceInput.fill('Zero')
    await replaceInput.press('Enter')

    await expect(searchMatch).toHaveCount(1)
    await expect(activeSearchMatch).toHaveCount(1)
  })
})
