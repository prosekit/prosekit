import { expect, test, type Page } from '@playwright/test'

import { emptyEditor, testStory, waitForEditor } from './helper'

testStory(['slash-menu', 'full'], () => {
  test('execute command', async ({ page }) => {
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

  test('filter items by typing', async ({ page }) => {
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

  test('press Escape to hide the menu', async ({ page }) => {
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

  test('insert list', async ({ page }) => {
    const { editor } = await setup(page)

    const taskList = editor.locator('div[data-list-kind="task"]')
    const orderedList = editor.locator('div[data-list-kind="ordered"]')

    await expect(taskList).not.toBeVisible()
    await expect(orderedList).not.toBeVisible()

    await editor.pressSequentially('/task')
    await editor.press('Enter')
    await expect(taskList).toBeVisible()

    await editor.press('Backspace')
    await editor.press('Backspace')
    await editor.press('Backspace')
    await editor.press('Backspace')
    await editor.pressSequentially('Some text ')
    await editor.pressSequentially('/order')
    await editor.press('Enter')
    await expect(orderedList).toBeVisible()
  })

  test.only('press arrow keys to select item', async ({ page }) => {
    const { editor, itemH1, itemH2, focusedItemH1, focusedItemH2 } =
      await setup(page)

    await editor.focus()
    await editor.press('/')
    await expect(itemH1).toBeVisible()
    await expect(itemH2).toBeVisible()
    await expect(focusedItemH1).toBeVisible()
    await expect(focusedItemH2).toBeHidden()

    await editor.press('ArrowDown')
    await expect(focusedItemH1).toBeHidden()
    await expect(focusedItemH2).toBeVisible()

    await editor.press('ArrowDown')
    await expect(focusedItemH1).toBeHidden()
    await expect(focusedItemH2).toBeHidden()

    await editor.press('ArrowUp')
    await expect(focusedItemH1).toBeHidden()
    await expect(focusedItemH2).toBeVisible()

    await expect(editor.locator('h2')).toBeHidden()
    await editor.press('Enter')
    await expect(editor.locator('h2')).toBeVisible()
  })
})

async function setup(page: Page) {
  const editor = await waitForEditor(page)
  await emptyEditor(page)

  const item = page.locator('prosekit-autocomplete-item')
  const itemH1 = item.filter({ hasText: 'Heading 1' }).first()
  const itemH2 = item.filter({ hasText: 'Heading 2' }).first()

  const focusedItem = page.locator(
    'prosekit-autocomplete-item[data-focused="true"]',
  )
  const focusedItemH1 = focusedItem.filter({ hasText: 'Heading 1' }).first()
  const focusedItemH2 = focusedItem.filter({ hasText: 'Heading 2' }).first()

  const menu = page
    .locator('prosekit-autocomplete-popover')
    .filter({ has: itemH1 })

  return { editor, menu, itemH1, itemH2, focusedItemH1, focusedItemH2 }
}
