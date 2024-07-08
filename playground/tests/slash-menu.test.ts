import { expect, test, type Page } from '@playwright/test'

import { emptyEditor, testStory, waitForEditor } from './helper'

testStory(['slash-menu', 'full'], () => {
  test('item', async ({ page }) => {
    const { editor, menu, itemH1 } = await setup(page)

    await editor.focus()
    await expect(menu).toBeHidden()
    await editor.press('/')
    await expect(menu).toBeVisible()

    await expect(editor.locator('h1')).toHaveCount(0)
    await expect(itemH1).toBeVisible()
    await itemH1.click()
    await expect(editor.locator('h1')).toHaveCount(1)
  })

  test('filter', async ({ page }) => {
    const { editor, menu, itemH1, itemH2 } = await setup(page)

    await editor.focus()
    await expect(menu).toBeHidden()
    await editor.press('/')
    await expect(menu).toBeVisible()
    await expect(itemH1).toBeVisible()
    await expect(itemH2).toBeVisible()

    await editor.pressSequentially('heading2')
    await expect(itemH1).toBeHidden()
    await expect(itemH2).toBeVisible()
  })

  test('Escape', async ({ page }) => {
    const { editor, menu } = await setup(page)

    await editor.focus()
    await expect(menu).toBeHidden()
    await editor.press('/')
    await expect(menu).toBeVisible()
    await editor.press('Escape')
    await expect(menu).toBeHidden()
    await editor.pressSequentially('heading')
    await expect(menu).toBeHidden()
  })
})

async function setup(page: Page) {
  const editor = await waitForEditor(page)
  await emptyEditor(page)

  const item = page.locator('prosekit-autocomplete-item')
  const itemH1 = item.filter({ hasText: 'Heading 1' }).first()
  const itemH2 = item.filter({ hasText: 'Heading 2' }).first()
  const menu = page
    .locator('prosekit-autocomplete-popover')
    .filter({ has: itemH1 })

  return { editor, menu, itemH1, itemH2 }
}
