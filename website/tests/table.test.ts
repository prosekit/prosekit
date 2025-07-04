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

    await test.step('row handle selects the first row', async () => {
      // ensure no selection beforehand
      await expect(editor.locator('td.selectedCell')).toHaveCount(0)

      await rowHandle.click()

      const selected = editor.locator('td.selectedCell')
      await expect(selected).toHaveCount(4)

      const texts = await selected.evaluateAll((els) => els.map((e) => e.textContent?.trim()))
      expect(texts).toEqual(['1', '2', '3', '4'])
    })

    await test.step('column handle selects the first column', async () => {
      await colHandle.click()

      const selected = editor.locator('td.selectedCell')
      await expect(selected).toHaveCount(2)

      const texts = await selected.evaluateAll((els) => els.map((e) => e.textContent?.trim()))
      expect(texts).toEqual(['1', '5'])
    })
  })
})
