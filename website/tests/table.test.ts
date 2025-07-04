import {
  expect,
  test,
  type Locator,
  type Page,
} from '@playwright/test'

import {
  dragAndDrop,
  getBoundingBox,
  hover,
  testStory,
  waitForEditor,
} from './helper'

testStory('table', () => {
  test('default table content', async ({ page }) => {
    const { expectTableContentToBe } = await setup(page)
    await expectTableContentToBe([
      ['A1', 'B1', 'C1', 'D1'],
      ['A2', 'B2', 'C2', 'D2'],
    ])
  })

  test('select cells by clicking handles', async ({ page }) => {
    const {
      rowHandle,
      colHandle,
      hoverCell,
      expectCellSelectionToBe,
    } = await setup(page)

    await test.step('handles are hidden before hover', async () => {
      await expect(rowHandle).toBeHidden()
      await expect(colHandle).toBeHidden()
    })

    await test.step('row handle selects the first row', async () => {
      await hoverCell('A1')
      await rowHandle.click()

      await expectCellSelectionToBe(
        ['A1', 'B1', 'C1', 'D1'],
        ['A2', 'B2', 'C2', 'D2'],
      )
    })

    await test.step('row handle selects the second row', async () => {
      await hoverCell('C2')
      await rowHandle.click()

      await expectCellSelectionToBe(
        ['A2', 'B2', 'C2', 'D2'],
        ['A1', 'B1', 'C1', 'D1'],
      )
    })

    await test.step('column handle selects the first column', async () => {
      await hoverCell('A2')
      await colHandle.click()

      await expectCellSelectionToBe(
        ['A1', 'A2'],
        ['B1', 'B2', 'C1', 'C2', 'D1', 'D2'],
      )
    })

    await test.step('column handle selects the last column', async () => {
      await hoverCell('D1')
      await colHandle.click()

      await expectCellSelectionToBe(
        ['D1', 'D2'],
        ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'],
      )
    })
  })

  test('insert column before', async ({ page }) => {
    const {
      colHandle,
      hoverCell,
      openMenu,
      getMenuItem,
      expectTableContentToBe,
    } = await setup(page)

    await test.step('hover a cell to show column handle', async () => {
      await hoverCell('A1')
      await expect(colHandle).toBeVisible()
    })

    const insertRight = getMenuItem('Insert Right')

    await test.step('click menu item', async () => {
      await expect(openMenu).not.toBeVisible()
      await colHandle.click()
      await expect(openMenu).toBeVisible()

      await expect(insertRight).toBeVisible()
      await insertRight.click()
    })

    await test.step('check table shape after first insert', async () => {
      await expectTableContentToBe([
        ['A1', '', 'B1', 'C1', 'D1'],
        ['A2', '', 'B2', 'C2', 'D2'],
      ])
    })

    await test.step('click menu item again', async () => {
      await expect(openMenu).not.toBeVisible()
      await colHandle.click()
      await expect(openMenu).toBeVisible()

      await expect(insertRight).toBeVisible()
      await insertRight.click()
    })

    await test.step('check table shape after second insert', async () => {
      await expectTableContentToBe([
        ['A1', '', '', 'B1', 'C1', 'D1'],
        ['A2', '', '', 'B2', 'C2', 'D2'],
      ])
    })
  })

  test('delete column', async ({ page }) => {
    const {
      colHandle,
      hoverCell,
      openMenu,
      getMenuItem,
      expectTableContentToBe,
    } = await setup(page)

    // hover last column cell D1
    await hoverCell('D1')

    await colHandle.click()
    await expect(openMenu).toBeVisible()

    const deleteColItem = getMenuItem('Delete Column')
    await expect(deleteColItem).toBeVisible()

    await expectTableContentToBe([
      ['A1', 'B1', 'C1', 'D1'],
      ['A2', 'B2', 'C2', 'D2'],
    ])

    await deleteColItem.click()

    await expectTableContentToBe([
      ['A1', 'B1', 'C1'],
      ['A2', 'B2', 'C2'],
    ])
  })

  test('clear row contents', async ({ page }) => {
    const {
      rowHandle,
      hoverCell,
      waitForCell,
      openMenu,
      getMenuItem,
      expectTableContentToBe,
    } = await setup(page)

    // Ensure A1 text exists
    await waitForCell('A1')

    await hoverCell('A1')
    await rowHandle.click()

    await expect(openMenu).toBeVisible()

    const clearItem = getMenuItem('Clear Contents')
    await expect(clearItem).toBeVisible()
    await clearItem.click()

    await expectTableContentToBe([
      ['', '', '', ''],
      ['A2', 'B2', 'C2', 'D2'],
    ])
  })

  test('drag column to reorder', async ({ page }) => {
    const {
      colHandle,
      hoverCell,
      expectTableContentToBe,
      waitForCell,
    } = await setup(page)

    await test.step('check initial state', async () => {
      await expectTableContentToBe([
        ['A1', 'B1', 'C1', 'D1'],
        ['A2', 'B2', 'C2', 'D2'],
      ])
    })

    await test.step('drag the first column to the third column', async () => {
      const startCell = await waitForCell('A1')
      const targetCell = await waitForCell('C2')

      await hoverCell(startCell)
      await expect(colHandle).toBeVisible()
      await dragAndDrop(colHandle, targetCell)

      await expectTableContentToBe([
        ['B1', 'C1', 'A1', 'D1'],
        ['B2', 'C2', 'A2', 'D2'],
      ])
    })
  })

  test('drag row to reorder', async ({ page }) => {
    const {
      rowHandle,
      hoverCell,
      expectTableContentToBe,
      waitForCell,
    } = await setup(page)

    await test.step('check initial state', async () => {
      await expectTableContentToBe([
        ['A1', 'B1', 'C1', 'D1'],
        ['A2', 'B2', 'C2', 'D2'],
      ])
    })

    await test.step('drag the first row below the second row', async () => {
      const startCell = await waitForCell('A2')
      const targetCell = await waitForCell('D1')

      await hoverCell(startCell)
      await expect(rowHandle).toBeVisible()

      const rowTrigger = rowHandle.locator('prosekit-table-handle-row-trigger')
      await expect(rowTrigger).toBeVisible()

      await dragAndDrop(rowTrigger, targetCell)

      await expectTableContentToBe([
        ['A2', 'B2', 'C2', 'D2'],
        ['A1', 'B1', 'C1', 'D1'],
      ])
    })
  })
})

async function setup(page: Page) {
  const editor = await waitForEditor(page)

  const rowHandle = page.locator('prosekit-table-handle-row-root')
  const colHandle = page.locator('prosekit-table-handle-column-root')
  const openMenu = page.locator('prosekit-table-handle-popover-content[data-state="open"]')

  const getMenuItem = (text: string) => {
    return openMenu.locator('prosekit-table-handle-popover-item', { hasText: text })
  }

  const getCell = (cell: string | Locator) => {
    if (typeof cell === 'string') {
      return editor.locator('td', { hasText: cell })
    }
    return cell
  }

  const waitForCell = async (text: string) => {
    let cell = getCell(text)
    await expect(cell).toBeVisible()
    return cell
  }

  const expectCellToBeSelected = async (cell: Locator) => {
    await expect(cell).toHaveClass(/selectedCell/)
  }

  const expectCellToBeNotSelected = async (cell: Locator) => {
    await expect(cell).not.toHaveClass(/selectedCell/)
  }

  const expectCellSelectionToBe = async (selectedCells: string[], unselectedCells: string[]) => {
    for (const cell of selectedCells) {
      await expectCellToBeSelected(await waitForCell(cell))
    }

    for (const cell of unselectedCells) {
      await expectCellToBeNotSelected(await waitForCell(cell))
    }
  }

  const hoverCell = async (cell: Locator | string) => {
    const cellLocator = getCell(cell)

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

  const getTableContent = async (): Promise<string[][]> => {
    const table = editor.locator('table')
    return await table.evaluate((table): string[][] => {
      const rows = Array.from(table.querySelectorAll('tr'))
      return rows.map((row) => {
        const cells = Array.from(row.querySelectorAll('td'))
        return cells.map((cell) => {
          return cell.textContent || ''
        })
      })
    })
  }

  const expectTableContentToBe = async (expected: string[][]) => {
    await expect(async () => {
      const content = await getTableContent()
      expect(content).toEqual(expected)
    }).toPass({ timeout: 3000 })
  }

  return {
    editor,
    rowHandle,
    colHandle,
    openMenu,
    getMenuItem,
    expectCellSelectionToBe,
    hoverCell,
    waitForCell,
    getTableContent,
    expectTableContentToBe,
  }
}
