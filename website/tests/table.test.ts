import {
  expect,
  test,
  type Locator,
} from '@playwright/test'

import {
  getBoundingBox,
  hover,
  testStory,
  waitForEditor,
} from './helper'

testStory('table', ({ getUncaughtErrors }) => {
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
      C2: editor.locator('td', { hasText: 'C2' }),
      D2: editor.locator('td', { hasText: 'D2' }),
    } as const

    async function hoverCell(cell: Locator) {
      await hover(cell)
      await expect(rowHandle).toBeVisible()
      await expect(colHandle).toBeVisible()

      const checkPosition = async () => {
        const cellBox = await getBoundingBox(cell)
        const rowHandleBox = await getBoundingBox(rowHandle)
        const colHandleBox = await getBoundingBox(colHandle)

        const rowHandleCenterY = rowHandleBox.y + rowHandleBox.height / 2
        const colHandleCenterX = colHandleBox.x + colHandleBox.width / 2

        // Row handle's vertical position should intersect cell vertically
        expect(rowHandleCenterY).toBeGreaterThanOrEqual(cellBox.y)
        expect(rowHandleCenterY).toBeLessThanOrEqual(cellBox.y + cellBox.height)

        // Column handle's horizontal position should intersect cell horizontally
        expect(colHandleCenterX).toBeGreaterThanOrEqual(cellBox.x)
        expect(colHandleCenterX).toBeLessThanOrEqual(cellBox.x + cellBox.width)
      }

      await expect(checkPosition).toPass()
    }

    async function expectCellToBeSelected(cell: keyof typeof cells) {
      await expect(cells[cell]).toHaveClass(/selectedCell/)
    }

    async function expectCellToBeNotSelected(cell: keyof typeof cells) {
      await expect(cells[cell]).not.toHaveClass(/selectedCell/)
    }

    await test.step('initial table content is visible', async () => {
      await expect(editor.locator('table')).toBeVisible()
      await expect(cells.A1).toBeVisible()
    })

    await test.step('handles are hidden before hover', async () => {
      await expect(rowHandle).toBeHidden()
      await expect(colHandle).toBeHidden()
    })

    await test.step('row handle selects the first row', async () => {
      await hoverCell(cells.A1)
      await rowHandle.click()

      await expectCellToBeSelected('A1')
      await expectCellToBeSelected('B1')
      await expectCellToBeSelected('C1')
      await expectCellToBeSelected('D1')
      await expectCellToBeNotSelected('A2')
      await expectCellToBeNotSelected('B2')
      await expectCellToBeNotSelected('C2')
      await expectCellToBeNotSelected('D2')
    })

    await test.step('column handle selects the first column', async () => {
      await hoverCell(cells.A1)
      await colHandle.click()

      await expectCellToBeSelected('A1')
      await expectCellToBeSelected('A2')
      await expectCellToBeNotSelected('B1')
      await expectCellToBeNotSelected('B2')
      await expectCellToBeNotSelected('C1')
      await expectCellToBeNotSelected('C2')
      await expectCellToBeNotSelected('D1')
      await expectCellToBeNotSelected('D2')
    })

    await test.step('row handle selects the second row', async () => {
      await hoverCell(cells.A2)
      await rowHandle.click()

      // Second row should be selected
      await expectCellToBeSelected('A2')
      await expectCellToBeSelected('B2')
      await expectCellToBeSelected('C2')
      await expectCellToBeSelected('D2')

      // First row should not be selected
      await expectCellToBeNotSelected('A1')
      await expectCellToBeNotSelected('B1')
      await expectCellToBeNotSelected('C1')
      await expectCellToBeNotSelected('D1')
    })

    await test.step('column handle selects the last column', async () => {
      await hoverCell(cells.D1)
      await colHandle.click()

      await expectCellToBeSelected('D1')
      await expectCellToBeSelected('D2')

      // Ensure other cells unselected
      await expectCellToBeNotSelected('A1')
      await expectCellToBeNotSelected('A2')
      await expectCellToBeNotSelected('B1')
      await expectCellToBeNotSelected('B2')
      await expectCellToBeNotSelected('C1')
      await expectCellToBeNotSelected('C2')
    })

    // TODO: fix this
    await test.step.skip('no runtime errors', () => {
      const errors = getUncaughtErrors()
      expect(errors).toEqual([])
    })
  })
})
