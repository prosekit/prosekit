import { expect, test } from '@playwright/test'

import { testStory, waitForEditor } from './helper'

testStory('slash-menu', ({ example }) => {
  // TODO: svelte-slash-menu is not working
  if (example === 'svelte-slash-menu') {
    return
  }

  test('slash-menu', async ({ page }) => {
    const editor = await waitForEditor(page)

    const item = page.locator('prosekit-autocomplete-item')
    const itemH1 = item.filter({ hasText: 'Heading 1' }).first()
    const menu = page
      .locator('prosekit-autocomplete-popover')
      .filter({ has: itemH1 })

    await editor.focus()
    await expect(menu).toBeHidden()
    await editor.press('/')
    await expect(menu).toBeVisible()

    await expect(editor.locator('h1')).toHaveCount(0)
    await expect(itemH1).toBeVisible()
    await itemH1.click()
    await expect(editor.locator('h1')).toHaveCount(1)
  })
})
