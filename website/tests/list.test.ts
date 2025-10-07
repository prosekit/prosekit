import {
  expect,
  test,
} from '@playwright/test'

import {
  emptyEditor,
  testStory,
  waitForEditor,
} from './helper'

testStory('list', () => {
  test('toggle bullet list', async ({ page }) => {
    const editor = await waitForEditor(page)
    const btn = page.getByRole('button', { name: 'Bullet' })

    await emptyEditor(page)
    await editor.pressSequentially('Item')

    await expect(btn).toBeVisible()
    await btn.click()
    await expect(
      editor.locator('.prosemirror-flat-list[data-list-kind="bullet"] p', { hasText: 'Item' }),
    ).toBeVisible()

    await expect(btn).toBeVisible()
    await btn.click()
    await expect(editor.locator('.prosemirror-flat-list[data-list-kind="bullet"]')).toHaveCount(0)
  })

  test('toggle ordered list', async ({ page }) => {
    const editor = await waitForEditor(page)
    const btn = page.getByRole('button', { name: 'Ordered' })

    await emptyEditor(page)
    await editor.pressSequentially('Item')

    await expect(btn).toBeVisible()
    await btn.click()
    await expect(
      editor.locator('.prosemirror-flat-list[data-list-kind="ordered"] p', { hasText: 'Item' }),
    ).toBeVisible()

    await expect(btn).toBeVisible()
    await btn.click()
    await expect(editor.locator('.prosemirror-flat-list[data-list-kind="ordered"]').first()).toHaveCount(0)
  })

  test('toggle task list', async ({ page }) => {
    const editor = await waitForEditor(page)
    const btn = page.getByRole('button', { name: 'Task' })

    await emptyEditor(page)
    await editor.pressSequentially('Task')

    await btn.click()
    const taskList = editor.locator('.prosemirror-flat-list[data-list-kind="task"]')
    await expect(taskList).toBeVisible()
    await expect(taskList.locator('input[type="checkbox"]').first()).toBeVisible()

    await btn.click()
    await expect(editor.locator('.prosemirror-flat-list[data-list-kind="task"]').first()).toHaveCount(0)
  })

  test('toggle toggle-list', async ({ page }) => {
    const editor = await waitForEditor(page)
    const btn = page.getByRole('button', { name: 'Toggle' })

    await emptyEditor(page)
    await editor.pressSequentially('Toggle')

    await btn.click()
    await expect(
      editor.locator('.prosemirror-flat-list[data-list-kind="toggle"] p', { hasText: 'Toggle' }),
    ).toBeVisible()

    await btn.click()
    await expect(editor.locator('.prosemirror-flat-list[data-list-kind="toggle"]').first()).toHaveCount(0)
  })
})
