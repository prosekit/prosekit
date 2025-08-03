import { assignStyles } from '../../../utils/assign-styles'
import {
  cloneElement,
  deepCloneElement,
} from '../../../utils/clone-element'
import { fadeColor } from '../../../utils/fade-color'
import { getEffectiveBackgroundColor } from '../../../utils/get-effective-background-color'

export function clearPreviewDOM(previewRoot: HTMLElement): void {
  while (previewRoot.firstChild) {
    previewRoot.removeChild(previewRoot.firstChild)
  }
}

export function createPreviewDOM(
  table: HTMLTableElement,
  previewRoot: HTMLElement,
  index: number,
  direction: 'row' | 'col',
): void {
  clearPreviewDOM(previewRoot)

  const previewTable = cloneElementWithoutSize(table)

  const tableBody = table.querySelector('tbody')
  const previewTableBody = tableBody
    ? cloneElementWithoutSize(tableBody)
    : table.ownerDocument.createElement('tbody')

  unsetSize(previewTableBody)
  unsetSize(previewTable)

  // Get effective background color and apply it with some opacity
  const backgroundColor = getEffectiveBackgroundColor(table)
  if (backgroundColor) {
    const backgroundColorWithOpacity = fadeColor(backgroundColor, 0.8)
    if (backgroundColorWithOpacity) {
      assignStyles(previewTable, { backgroundColor: backgroundColorWithOpacity })
    }
  }

  previewTable.appendChild(previewTableBody)
  previewRoot.appendChild(previewTable)

  const rows = table.querySelectorAll('tr')

  if (direction === 'row') {
    const row = rows[index]
    const previewRow = deepCloneElement(row)
    previewTableBody.appendChild(previewRow)
  } else {
    rows.forEach((row) => {
      const previewRow = cloneElementWithoutSize(row)
      unsetSize(previewRow)

      const cells = row.querySelectorAll('td')
      const cell = cells[index]
      if (cell) {
        const previewCell = deepCloneElement(cell)
        previewRow.appendChild(previewCell)
        previewTableBody.appendChild(previewRow)
      }
    })
  }
}

function cloneElementWithoutSize(element: HTMLElement) {
  const clonedElement = cloneElement(element)
  unsetSize(clonedElement)
  return clonedElement
}

function unsetSize(element: HTMLElement) {
  assignStyles(element, {
    width: 'unset',
    height: 'unset',
    minWidth: 'unset',
    minHeight: 'unset',
    maxWidth: 'unset',
    maxHeight: 'unset',
  })
}
