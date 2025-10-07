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

async function setup(page: Page) {
  const editor = await waitForEditor(page)
  return {
    editor,
    bulletBtn: page.getByRole('button', { name: 'Bullet' }),
    orderedBtn: page.getByRole('button', { name: 'Ordered' }),
    taskBtn: page.getByRole('button', { name: 'Task' }),
    toggleBtn: page.getByRole('button', { name: 'Toggle' }),
    bulletList: editor.locator('.prosemirror-flat-list[data-list-kind="bullet"]'),
    orderedList: editor.locator('.prosemirror-flat-list[data-list-kind="ordered"]'),
    taskList: editor.locator('.prosemirror-flat-list[data-list-kind="task"]'),
    toggleList: editor.locator('.prosemirror-flat-list[data-list-kind="toggle"]'),
  }
}

testStory('list', () => {
  test('toggle bullet list', async ({ page }) => {
    const { editor, bulletBtn, bulletList } = await setup(page)

    await emptyEditor(page)
    await editor.pressSequentially('Item')

    await expect(bulletBtn).toBeVisible()
    await bulletBtn.click()
    await expect(bulletList.locator('p', { hasText: 'Item' })).toBeVisible()

    await expect(bulletBtn).toBeVisible()
    await bulletBtn.click()
    await expect(bulletList).toHaveCount(0)
  })

  test('toggle ordered list', async ({ page }) => {
    const { editor, orderedBtn, orderedList } = await setup(page)

    await emptyEditor(page)
    await editor.pressSequentially('Item')

    await expect(orderedBtn).toBeVisible()
    await orderedBtn.click()
    await expect(orderedList.locator('p', { hasText: 'Item' })).toBeVisible()

    await expect(orderedBtn).toBeVisible()
    await orderedBtn.click()
    await expect(orderedList.first()).toHaveCount(0)
  })

  test('toggle task list', async ({ page }) => {
    const { editor, taskBtn, taskList } = await setup(page)

    await emptyEditor(page)
    await editor.pressSequentially('Task')

    await taskBtn.click()
    await expect(taskList).toBeVisible()
    await expect(taskList.locator('input[type="checkbox"]').first()).toBeVisible()

    await taskBtn.click()
    await expect(taskList.first()).toHaveCount(0)
  })

  test('toggle toggle-list', async ({ page }) => {
    const { editor, toggleBtn, toggleList } = await setup(page)

    await emptyEditor(page)
    await editor.pressSequentially('Toggle')

    await toggleBtn.click()
    await expect(toggleList.locator('p', { hasText: 'Toggle' })).toBeVisible()

    await toggleBtn.click()
    await expect(toggleList.first()).toHaveCount(0)
  })
})
