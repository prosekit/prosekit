import {
  expect,
  test,
  type Page,
} from '@playwright/test'

import {
  emptyEditor,
  testStory,
  waitForEditor,
} from './helper'

testStory(['slash-menu'], () => {
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

  test('ignore slash followed by a space', async ({ page }) => {
    const { editor, menu } = await setup(page)

    await editor.focus()
    await expect(menu).toBeHidden()
    await editor.press('/')
    await expect(menu).toBeVisible()
    await editor.press(' ')
    await expect(menu).toBeHidden()
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
    const { editor, focusedItem } = await setup(page)

    const taskList = editor.locator('div[data-list-kind="task"]')
    const orderedList = editor.locator('div[data-list-kind="ordered"]')

    await expect(taskList).not.toBeVisible()
    await expect(orderedList).not.toBeVisible()

    await editor.pressSequentially('/task')
    await expect(focusedItem).toHaveText('Task list')

    await editor.press('Enter')
    await expect(taskList).toBeVisible()

    await editor.press('Backspace')
    await editor.press('Backspace')
    await editor.press('Backspace')
    await editor.press('Backspace')
    await editor.pressSequentially('Some text ')
    await editor.pressSequentially('/order')
    await expect(focusedItem).toHaveText('Ordered list')

    await editor.press('Enter')
    await expect(orderedList).toBeVisible()
  })

  test('press arrow keys to select item', async ({ page }) => {
    const { editor, itemText, itemH1, itemH2, focusedItem } = await setup(page)

    await editor.focus()
    await editor.press('/')
    await expect(itemText).toBeVisible()
    await expect(itemH1).toBeVisible()
    await expect(itemH2).toBeVisible()
    await expect(itemText).toHaveText('Text')

    await editor.press('ArrowDown')
    await expect(focusedItem).toHaveText('Heading 1')

    await editor.press('ArrowDown')
    await expect(focusedItem).toHaveText('Heading 2')

    await editor.press('ArrowDown')
    await expect(focusedItem).toHaveText('Heading 3')

    await editor.press('ArrowDown')
    await expect(focusedItem).not.toContainText('Heading')

    await editor.press('ArrowUp')
    await expect(focusedItem).toHaveText('Heading 3')

    await expect(editor.locator('h3')).toBeHidden()
    await editor.press('Enter')
    await expect(editor.locator('h3')).toBeVisible()
  })
})

async function setup(page: Page) {
  const editor = await waitForEditor(page)
  await emptyEditor(page)

  const item = page.locator('prosekit-autocomplete-item')

  const itemText = item.filter({ hasText: 'Text' }).first()
  const itemH1 = item.filter({ hasText: 'Heading 1' }).first()
  const itemH2 = item.filter({ hasText: 'Heading 2' }).first()

  const focusedItem = page.locator(
    'prosekit-autocomplete-item[data-focused="true"] > span',
  )

  const menu = page
    .locator('prosekit-autocomplete-popover')
    .filter({ has: itemH1 })

  return {
    editor,
    menu,
    itemText,
    itemH1,
    itemH2,
    focusedItem,
  }
}
