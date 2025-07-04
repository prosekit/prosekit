import {
  expect,
  test,
} from '@playwright/test'

import {
  hover,
  testStory,
  waitForEditor,
} from './helper'

testStory('table', () => {
  test('table', async ({ page }) => {
    const editor = await waitForEditor(page)

    await test.step('initial table content is visible', async () => {
      await expect(editor.locator('table')).toBeVisible()
      await expect(editor.locator('td', { hasText: '1' })).toBeVisible()
    })

    const rowHandle = page.locator('prosekit-table-handle-row-root')
    const colHandle = page.locator('prosekit-table-handle-column-root')

    await test.step('handles are hidden before hover', async () => {
      await expect(rowHandle).toBeHidden()
      await expect(colHandle).toBeHidden()
    })

    await test.step('handles appear after hovering first cell', async () => {
      const firstCell = editor.locator('td').first()
      await hover(firstCell)

      await expect(rowHandle).toBeVisible()
      await expect(colHandle).toBeVisible()
    })
  })
})
