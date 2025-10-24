import {
  beforeEach,
  expect,
  it,
} from 'vitest'
import {
  page,
  type Locator,
} from 'vitest/browser'

import {
  dragAndDrop,
  emptyEditor,
  expectLocatorToHaveCount,
  expectLocatorToNotExist,
  getBoundingBox,
  hover,
  pasteHtmlToEditor,
  testStory,
  waitForEditor,
} from './helper'

testStory('table', () => {
  it('default table content', async () => {
    const { expectTableContentToBe } = await setup()
    await expectTableContentToBe([
      ['A1', 'B1', 'C1', 'D1'],
      ['A2', 'B2', 'C2', 'D2'],
    ])
  })
})

testStory(['table', 'full'], () => {
  beforeEach(async () => {
    await emptyEditor()
    await pasteHtmlToEditor(`
      <table>
        <tr>
          <td>A1</td>
          <td>B1</td>
          <td>C1</td>
          <td>D1</td>
        </tr>
        <tr>
          <td>A2</td>
          <td>B2</td>
          <td>C2</td>
          <td>D2</td>
        </tr>
      </table>
    `)
  })

  it('select cells by clicking handles', async () => {
    const {
      rowHandle,
      colHandle,
      hoverCell,
      expectCellSelectionToBe,
    } = await setup()

    // Handles are hidden before hover
    await expectLocatorToNotExist(rowHandle)
    await expectLocatorToNotExist(colHandle)

    // Row handle selects the first row
    await hoverCell('A1')
    await rowHandle.click()
    await expectCellSelectionToBe(
      ['A1', 'B1', 'C1', 'D1'],
      ['A2', 'B2', 'C2', 'D2'],
    )

    // Row handle selects the second row
    await hoverCell('C2')
    await rowHandle.click()
    await expectCellSelectionToBe(
      ['A2', 'B2', 'C2', 'D2'],
      ['A1', 'B1', 'C1', 'D1'],
    )

    // Column handle selects the first column
    await hoverCell('A2')
    await colHandle.click()
    await expectCellSelectionToBe(
      ['A1', 'A2'],
      ['B1', 'B2', 'C1', 'C2', 'D1', 'D2'],
    )

    // Column handle selects the last column
    await hoverCell('D1')
    await colHandle.click()
    await expectCellSelectionToBe(
      ['D1', 'D2'],
      ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'],
    )
  })

  it('insert column before', async () => {
    const {
      colHandle,
      hoverCell,
      openMenu,
      getColumnMenuItem,
      expectTableContentToBe,
    } = await setup()

    // Hover a cell to show column handle
    await hoverCell('A1')
    await expectLocatorToHaveCount(colHandle, 1)

    const insertRight = getColumnMenuItem('Insert Right')

    // Click menu item
    await expectLocatorToHaveCount(openMenu, 0)
    await colHandle.click()
    await expectLocatorToHaveCount(openMenu, 1)
    await expect.element(insertRight).toBeVisible()
    await insertRight.click()

    // Check table shape after first insert
    await expectTableContentToBe([
      ['A1', '', 'B1', 'C1', 'D1'],
      ['A2', '', 'B2', 'C2', 'D2'],
    ])

    // Click menu item again
    await expectLocatorToHaveCount(openMenu, 0)
    await colHandle.click()
    await expectLocatorToHaveCount(openMenu, 1)
    await expect.element(insertRight).toBeVisible()
    await insertRight.click()

    // Check table shape after second insert
    await expectTableContentToBe([
      ['A1', '', '', 'B1', 'C1', 'D1'],
      ['A2', '', '', 'B2', 'C2', 'D2'],
    ])
  })

  it('delete column', async () => {
    const {
      colHandle,
      hoverCell,
      openMenu,
      getColumnMenuItem,
      expectTableContentToBe,
    } = await setup()

    await hoverCell('D1')
    await colHandle.click()
    await expectLocatorToHaveCount(openMenu, 1)

    const deleteColItem = getColumnMenuItem('Delete Column')
    await expect.element(deleteColItem).toBeVisible()

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

  it('clear row contents', async () => {
    const {
      rowHandle,
      hoverCell,
      waitForCell,
      openMenu,
      getRowMenuItem,
      expectTableContentToBe,
    } = await setup()

    await waitForCell('A1')
    await hoverCell('A1')
    await rowHandle.click()
    await expectLocatorToHaveCount(openMenu, 1)

    const clearItem = getRowMenuItem('Clear Contents')
    await expect.element(clearItem).toBeVisible()
    await clearItem.click()

    await expectTableContentToBe([
      ['', '', '', ''],
      ['A2', 'B2', 'C2', 'D2'],
    ])
  })

  it('drag column to reorder', async () => {
    const {
      colHandle,
      hoverCell,
      expectTableContentToBe,
      waitForCell,
    } = await setup()

    // Check initial state
    await expectTableContentToBe([
      ['A1', 'B1', 'C1', 'D1'],
      ['A2', 'B2', 'C2', 'D2'],
    ])

    // Drag the first column to the third column
    const startCell = await waitForCell('A1')
    const targetCell = await waitForCell('C2')

    await hoverCell(startCell)
    await expect.element(colHandle).toBeVisible()
    await expect.element(targetCell).toBeVisible()

    await dragAndDrop(colHandle, targetCell)

    await expectTableContentToBe([
      ['B1', 'C1', 'A1', 'D1'],
      ['B2', 'C2', 'A2', 'D2'],
    ])
  })

  it('drag row to reorder', async () => {
    const {
      rowHandle,
      hoverCell,
      expectTableContentToBe,
      waitForCell,
    } = await setup()

    // Check initial state
    await expectTableContentToBe([
      ['A1', 'B1', 'C1', 'D1'],
      ['A2', 'B2', 'C2', 'D2'],
    ])

    // Drag the first row below the second row
    const startCell = await waitForCell('A2')
    const targetCell = await waitForCell('D1')

    await hoverCell(startCell)
    await expect.element(rowHandle).toBeVisible()
    await expect.element(targetCell).toBeVisible()

    await dragAndDrop(rowHandle, targetCell)

    await expectTableContentToBe([
      ['A2', 'B2', 'C2', 'D2'],
      ['A1', 'B1', 'C1', 'D1'],
    ])
  })
})

async function setup() {
  const editor = await waitForEditor()

  const rowHandle = page.locate('prosekit-table-handle-row-root[data-state="open"]').locate('prosekit-table-handle-row-trigger')
  const colHandle = page.locate('prosekit-table-handle-column-root[data-state="open"]').locate('prosekit-table-handle-column-trigger')
  const openMenu = page.locate('prosekit-table-handle-popover-content[data-state="open"]')

  const rowMenu = page.locate('prosekit-table-handle-row-root[data-state="open"]').locate('prosekit-table-handle-popover-content')
  const colMenu = page.locate('prosekit-table-handle-column-root[data-state="open"]').locate('prosekit-table-handle-popover-content')

  const getRowMenuItem = (text: string) => {
    return rowMenu.locate('prosekit-table-handle-popover-item', { hasText: text }).last()
  }

  const getColumnMenuItem = (text: string) => {
    return colMenu.locate('prosekit-table-handle-popover-item', { hasText: text }).first()
  }

  const getCell = (cell: string | Locator) => {
    if (typeof cell === 'string') {
      return editor.locate('td', { hasText: cell })
    }
    return cell
  }

  const waitForCell = async (text: string) => {
    const cell = getCell(text)
    await expect.element(cell).toBeVisible()
    return cell
  }

  const expectCellToBeSelected = async (cell: Locator) => {
    await expect.element(cell).toHaveClass(/selectedCell/)
  }

  const expectCellToBeNotSelected = async (cell: Locator) => {
    await expect.element(cell).not.toHaveClass(/selectedCell/)
  }

  const expectCellSelectionToBe = async (selectedCells: string[], unselectedCells: string[]) => {
    for (const value of selectedCells) {
      await expectCellToBeSelected(await waitForCell(value))
    }

    for (const value of unselectedCells) {
      await expectCellToBeNotSelected(await waitForCell(value))
    }
  }

  const hoverCell = async (cell: Locator | string) => {
    const cellLocator = getCell(cell)

    // Reset the hover state
    await hover(editor, { position: { x: 0, y: 0 } })

    await hover(cellLocator)
    await expectLocatorToHaveCount(rowHandle, 1)
    await expectLocatorToHaveCount(colHandle, 1)

    const positionIsAligned = () => {
      const cellBox = getBoundingBox(cellLocator)
      const rowHandleBox = getBoundingBox(rowHandle)
      const colHandleBox = getBoundingBox(colHandle)

      const rowHandleCenterY = rowHandleBox.y + rowHandleBox.height / 2
      const colHandleCenterX = colHandleBox.x + colHandleBox.width / 2

      const cellBoxTop = cellBox.y
      const cellBoxBottom = cellBoxTop + cellBox.height

      const cellBoxLeft = cellBox.x
      const cellBoxRight = cellBoxLeft + cellBox.width

      return (
        rowHandleCenterY >= cellBoxTop
        && rowHandleCenterY <= cellBoxBottom
        && colHandleCenterX >= cellBoxLeft
        && colHandleCenterX <= cellBoxRight
      )
    }

    await expect.poll(positionIsAligned).toBe(true)
  }

  const getTableContent = () => {
    const table = editor.locate('table').element()
    const rows = Array.from(table.querySelectorAll('tr'))
    return rows.map((row) => {
      return Array.from(row.querySelectorAll('td')).map((cell) => cell.textContent?.trim() ?? '')
    })
  }

  const expectTableContentToBe = async (expected: string[][]) => {
    await expect.poll(() => getTableContent()).toEqual(expected)
  }

  return {
    editor,
    rowHandle,
    colHandle,
    openMenu,
    getColumnMenuItem,
    getRowMenuItem,
    expectCellSelectionToBe,
    hoverCell,
    waitForCell,
    getTableContent,
    expectTableContentToBe,
  }
}
