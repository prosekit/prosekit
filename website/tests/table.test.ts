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

    const rowHandle = page.locator('prosekit-table-handle-row-root')
    const colHandle = page.locator('prosekit-table-handle-column-root')
    const cells = {
      A1: editor.locator('td', { hasText: 'A1' }),
      B1: editor.locator('td', { hasText: 'B1' }),
      C1: editor.locator('td', { hasText: 'C1' }),
      D1: editor.locator('td', { hasText: 'D1' }),
      A2: editor.locator('td', { hasText: 'A2' }),
      B2: editor.locator('td', { hasText: 'B2' }),
    } as const

    async function expectSelected(selected: Array<keyof typeof cells>) {
      for (const key of selected) {
        await expect(cells[key]).toHaveClass(/selectedCell/)
      }
    }

    async function expectNotSelected(unselected: Array<keyof typeof cells>) {
      for (const key of unselected) {
        await expect(cells[key]).not.toHaveClass(/selectedCell/)
      }
    }

    await test.step('initial table content is visible', async () => {
      await expect(editor.locator('table')).toBeVisible()
      await expect(cells.A1).toBeVisible()
    })

    await test.step('handles are hidden before hover', async () => {
      await expect(rowHandle).toBeHidden()
      await expect(colHandle).toBeHidden()
    })

    await test.step('handles appear after hovering first cell', async () => {
      await hover(cells.A1)

      await expect(rowHandle).toBeVisible()
      await expect(colHandle).toBeVisible()
    })

    await test.step('row handle selects the first row', async () => {
      // ensure no selection beforehand
      await expect(editor.locator('td.selectedCell')).toHaveCount(0)

      await rowHandle.click()

      await expectSelected(['A1', 'B1', 'C1', 'D1'])
      await expectNotSelected(['A2'])
    })

    await test.step('column handle selects the first column', async () => {
      await colHandle.click()

      await expectSelected(['A1', 'A2'])
      await expectNotSelected(['B1'])
    })
  })
})
