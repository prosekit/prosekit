import {
  expect,
  test,
} from '@playwright/test'

import {
  testStory,
  waitForEditor,
} from './helper'

testStory('unmount', () => {
  test('unmount', async ({ page }) => {
    const editor = page.locator('.ProseMirror')
    const button = page.locator('button')
    const buttonAdd = button.filter({ hasText: 'Add editor' })
    const buttonRemove = (no: number) => button.filter({ hasText: `Unmount No.${no}` })
    const placeholder = (text: string) => editor.locator(`p[data-placeholder='${text}']`)

    await waitForEditor(page)

    await expect(editor).toHaveCount(1)
    await expect(placeholder('Editor No.1 of 1')).toBeVisible()

    await buttonAdd.click()
    await expect(editor).toHaveCount(2)
    await expect(placeholder('Editor No.1 of 2')).toBeVisible()
    await expect(placeholder('Editor No.2 of 2')).toBeVisible()

    await buttonAdd.click()
    await expect(editor).toHaveCount(3)
    await expect(placeholder('Editor No.1 of 3')).toBeVisible()
    await expect(placeholder('Editor No.2 of 3')).toBeVisible()
    await expect(placeholder('Editor No.3 of 3')).toBeVisible()

    await buttonRemove(1).click()
    await expect(editor).toHaveCount(2)
    await expect(placeholder('Editor No.2 of 2')).toBeVisible()
    await expect(placeholder('Editor No.3 of 2')).toBeVisible()

    await buttonRemove(3).click()
    await expect(editor).toHaveCount(1)
    await expect(placeholder('Editor No.2 of 1')).toBeVisible()

    await buttonRemove(2).click()
    await expect(editor).toHaveCount(0)

    await buttonAdd.click()
    await expect(editor).toHaveCount(1)
    await expect(placeholder('Editor No.4 of 1')).toBeVisible()

    await buttonAdd.click()
    await expect(editor).toHaveCount(2)
    await expect(placeholder('Editor No.4 of 2')).toBeVisible()
    await expect(placeholder('Editor No.5 of 2')).toBeVisible()
  })
})
