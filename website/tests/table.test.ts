import {
  expect,
  test,
  type Locator,
  type Page,
} from '@playwright/test'

import {
  getBoundingBox,
  hover,
  testStory,
  waitForEditor,
} from './helper'

testStory('table', ({ example }) => {
  test('select cells by clicking handles', async ({ page }) => {
    const {
      editor,
      rowHandle,
      colHandle,
      waitForCell,
      hoverCell,
      checkCellSelection,
    } = await setup(page)
    await test.step('initial table content is visible', async () => {
      await expect(editor.locator('table')).toBeVisible()
      await waitForCell('A1')
      await waitForCell('D2')
    })

    await test.step('handles are hidden before hover', async () => {
      await expect(rowHandle).toBeHidden()
      await expect(colHandle).toBeHidden()
    })

    await test.step('row handle selects the first row', async () => {
      await hoverCell('A1')
      await rowHandle.click()

      await checkCellSelection(
        ['A1', 'B1', 'C1', 'D1'],
        ['A2', 'B2', 'C2', 'D2'],
      )
    })

    await test.step('column handle selects the first column', async () => {
      await hoverCell('A2')
      await colHandle.click()

      await checkCellSelection(
        ['A1', 'A2'],
        ['B1', 'B2', 'C1', 'C2', 'D1', 'D2'],
      )
    })

    await test.step('row handle selects the second row', async () => {
      await hoverCell('A2')
      await rowHandle.click()

      await checkCellSelection(
        ['A2', 'B2', 'C2', 'D2'],
        ['A1', 'B1', 'C1', 'D1'],
      )
    })

    await test.step('column handle selects the last column', async () => {
      await hoverCell('D1')
      await colHandle.click()

      await checkCellSelection(
        ['D1', 'D2'],
        ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'],
      )
    })
  })

  test.only('insert column before the first column', async ({ page }) => {
    if (example.includes('svelte')) {
      console.warn('Skipping Svelte test')
      return
    }

    const { colHandle, hoverCell, getTableShape } = await setup(page)

    await hoverCell('A1')
    await expect(colHandle).toBeVisible()

    const { cols: colsBefore } = await getTableShape()

    await colHandle.click()

    const menu = page.locator('prosekit-table-handle-popover-content').first()
    await expect(menu).toBeVisible()

    const insertRight = menu.locator('prosekit-table-handle-popover-item', { hasText: 'Insert Right' })
    await expect(insertRight).toBeVisible()

    await insertRight.click()

    const { cols: colsAfter } = await getTableShape()
    expect(colsAfter).toBe(colsBefore + 1)
  })
})

async function setup(page: Page) {
  const editor = await waitForEditor(page)

  const rowHandle = page.locator('prosekit-table-handle-row-root')
  const colHandle = page.locator('prosekit-table-handle-column-root')

  const locateCell = (cell: string | Locator) => {
    if (typeof cell === 'string') {
      return editor.locator('td', { hasText: cell })
    }
    return cell
  }

  const waitForCell = async (text: string) => {
    let cell = locateCell(text)
    await expect(cell).toBeVisible()
    return cell
  }

  const expectCellToBeSelected = async (cell: Locator) => {
    await expect(cell).toHaveClass(/selectedCell/)
  }

  const expectCellToBeNotSelected = async (cell: Locator) => {
    await expect(cell).not.toHaveClass(/selectedCell/)
  }

  const checkCellSelection = async (selectedCells: string[], unselectedCells: string[]) => {
    for (const cell of selectedCells) {
      await expectCellToBeSelected(await waitForCell(cell))
    }

    for (const cell of unselectedCells) {
      await expectCellToBeNotSelected(await waitForCell(cell))
    }
  }

  const hoverCell = async (cell: Locator | string) => {
    await hover(locateCell(cell))
    await expect(rowHandle).toBeVisible()
    await expect(colHandle).toBeVisible()

    const checkPosition = async () => {
      const cellBox = await getBoundingBox(locateCell(cell))
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

  const getTableShape = async () => {
    const table = editor.locator('table')
    const rows = await table.locator('tr').count()
    const cols = await table.locator('tr').first().locator('td').count()
    return { rows, cols }
  }

  return {
    editor,
    rowHandle,
    colHandle,
    checkCellSelection,
    hoverCell,
    waitForCell,
    getTableShape,
  }
}
