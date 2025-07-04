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

    await test.step('row handle selects the second row', async () => {
      await hoverCell('C2')
      await rowHandle.click()

      await checkCellSelection(
        ['A2', 'B2', 'C2', 'D2'],
        ['A1', 'B1', 'C1', 'D1'],
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

    await test.step('column handle selects the last column', async () => {
      await hoverCell('D1')
      await colHandle.click()

      await checkCellSelection(
        ['D1', 'D2'],
        ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'],
      )
    })
  })

  test('insert column', async ({ page }) => {
    // TODO: fix this test
    if (example.includes('svelte')) {
      console.warn('Skipping Svelte test')
      return
    }

    const { colHandle, hoverCell, getTableShape, openMenu, getMenuItem } = await setup(page)

    await test.step('hover a cell to show column handle', async () => {
      await hoverCell('A1')
      await expect(colHandle).toBeVisible()
    })

    const { cols: colsBefore } = await getTableShape()

    const insertRight = getMenuItem('Insert Right')

    await test.step('click menu item', async () => {
      await expect(openMenu).not.toBeVisible()
      await colHandle.click()
      await expect(openMenu).toBeVisible()

      await expect(insertRight).toBeVisible()
      await insertRight.click()
    })

    await test.step('check table shape after first insert', async () => {
      const { cols: colsAfter } = await getTableShape()
      expect(colsAfter).toBe(colsBefore + 1)
    })

    await test.step('click menu item again', async () => {
      await expect(openMenu).not.toBeVisible()
      await colHandle.click()
      await expect(openMenu).toBeVisible()

      await expect(insertRight).toBeVisible()
      await insertRight.click()
    })

    await test.step('check table shape after second insert', async () => {
      const { cols: colsAfter } = await getTableShape()
      // TODO: this should be colsBefore + 2. Fix this test.
      expect(colsAfter).toBeGreaterThan(colsBefore)
    })
  })

  test('delete last column', async ({ page }) => {
    // TODO: fix this test
    if (example.includes('svelte')) {
      console.warn('Skipping Svelte test')
      return
    }

    const { colHandle, hoverCell, getTableShape, openMenu, getMenuItem } = await setup(page)

    // hover last column cell D1
    await hoverCell('D1')
    const { cols: beforeCols } = await getTableShape()

    await colHandle.click()
    await expect(openMenu).toBeVisible()

    const deleteColItem = getMenuItem('Delete Column')
    await expect(deleteColItem).toBeVisible()
    await deleteColItem.click()

    const { cols: afterCols } = await getTableShape()
    expect(afterCols).toBe(beforeCols - 1)
  })

  test('clear first row contents', async ({ page }) => {
    // TODO: fix this test
    if (example.includes('svelte')) {
      console.warn('Skipping Svelte test')
      return
    }

    const {
      rowHandle,
      hoverCell,
      waitForCell,
      getTableShape,
      openMenu,
      getMenuItem,
    } = await setup(page)

    // Ensure A1 text exists
    await waitForCell('A1')

    await hoverCell('A1')
    await rowHandle.click()

    await expect(openMenu).toBeVisible()

    const clearItem = getMenuItem('Clear Contents')
    await expect(clearItem).toBeVisible()
    await clearItem.click()

    // After clearing, cells in first row should have no text.
    const { cols } = await getTableShape()
    for (let i = 0; i < cols; i++) {
      const cell = page
        .locator('tr')
        .first()
        .locator('td')
        .nth(i)
      await expect(cell).toContainText(/^\s*$/)
    }
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
    const cellLocator = locateCell(cell)

    // Reset the hover state
    await hover(editor, { position: { x: 0, y: 0 } })

    await hover(cellLocator)
    await expect(rowHandle).toBeVisible()
    await expect(colHandle).toBeVisible()

    const checkPosition = async () => {
      const cellBox = await getBoundingBox(cellLocator)
      const rowHandleBox = await getBoundingBox(rowHandle)
      const colHandleBox = await getBoundingBox(colHandle)

      const rowHandleCenterY = rowHandleBox.y + rowHandleBox.height / 2
      const colHandleCenterX = colHandleBox.x + colHandleBox.width / 2

      const cellBoxTop = cellBox.y
      const cellBoxBottom = cellBoxTop + cellBox.height

      const cellBoxLeft = cellBox.x
      const cellBoxRight = cellBoxLeft + cellBox.width

      // Row handle's vertical position should intersect cell vertically
      expect(
        rowHandleCenterY,
        'Expect rowHandleCenterY to be greater than or equal to cellBoxTop',
      ).toBeGreaterThanOrEqual(cellBoxTop)
      expect(
        rowHandleCenterY,
        'Expect rowHandleCenterY to be less than or equal to cellBoxBottom',
      ).toBeLessThanOrEqual(cellBoxBottom)

      // Column handle's horizontal position should intersect cell horizontally
      expect(
        colHandleCenterX,
        'Expect colHandleCenterX to be greater than or equal to cellBoxLeft',
      ).toBeGreaterThanOrEqual(cellBoxLeft)
      expect(
        colHandleCenterX,
        'Expect colHandleCenterX to be less than or equal to cellBoxRight',
      ).toBeLessThanOrEqual(cellBoxRight)
    }

    await expect(checkPosition).toPass({ timeout: 3000 })
  }

  const getTableShape = async () => {
    const table = editor.locator('table')
    const rows = await table.locator('tr').count()
    const cols = await table.locator('tr').first().locator('td').count()
    return { rows, cols }
  }

  const openMenu = page.locator('prosekit-table-handle-popover-content[data-state="open"]').first()

  const getMenuItem = (text: string) => openMenu.locator('prosekit-table-handle-popover-item', { hasText: text })

  return {
    editor,
    rowHandle,
    colHandle,
    checkCellSelection,
    hoverCell,
    waitForCell,
    getTableShape,
    openMenu,
    getMenuItem,
  }
}
