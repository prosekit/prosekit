export function getDragOverColumn(
  table: HTMLTableElement,
  cell: HTMLElement,
  pointerX: number,
  direction: 'left' | 'right',
): [element: Element, index: number] | undefined {
  const offsetParent = table.offsetParent
  if (!offsetParent || !(offsetParent instanceof HTMLElement)) return
  const wrapperOffsetLeft = offsetParent.offsetLeft
  const firstRow = table.querySelector('tr')
  if (!firstRow) return
  const children = Array.from(firstRow.children)
  const { width } = cell.getBoundingClientRect()
  const { left } = table.getBoundingClientRect()
  const leftGap = wrapperOffsetLeft - left
  const previewLeft = pointerX + leftGap - width / 2
  const previewRight = pointerX + leftGap + width / 2

  const col = children.find((col, index) => {
    const boundary = col.getBoundingClientRect()
    let boundaryLeft = boundary.left + leftGap
    let boundaryRight = boundary.right + leftGap

    if (direction === 'right') {
      boundaryLeft = boundaryLeft + boundary.width / 2
      boundaryRight = boundaryRight + boundary.width / 2

      if (boundaryLeft <= previewRight && boundaryRight >= previewRight) {
        return true
      }

      if (index === firstRow.children.length - 1 && previewRight > boundaryRight) {
        return true
      }
    } else {
      boundaryLeft = boundaryLeft - boundary.width / 2
      boundaryRight = boundaryRight - boundary.width / 2

      if (boundaryLeft <= previewLeft && boundaryRight >= previewLeft) {
        return true
      }

      if (index === 0 && previewLeft < boundaryLeft) {
        return true
      }
    }

    return false
  })

  return col ? [col, children.indexOf(col)] : undefined
}

export function getDragOverRow(
  table: HTMLTableElement,
  cell: HTMLElement,
  pointerY: number,
  direction: 'up' | 'down',
): [element: Element, index: number] | undefined {
  const offsetParent = table.offsetParent

  if (!offsetParent || !(offsetParent instanceof HTMLElement)) return

  const wrapperOffsetTop = offsetParent.offsetTop

  const { height } = cell.getBoundingClientRect()
  const { top } = table.getBoundingClientRect()
  const topGap = wrapperOffsetTop - top
  const previewTop = pointerY + topGap - height / 2
  const previewBottom = pointerY + topGap + height / 2

  const rows = Array.from(table.querySelectorAll('tr'))
  const row = rows.find((row, index) => {
    const boundary = row.getBoundingClientRect()
    let boundaryTop = boundary.top + topGap
    let boundaryBottom = boundary.bottom + topGap

    if (direction === 'down') {
      boundaryTop = boundaryTop + boundary.height / 2
      boundaryBottom = boundaryBottom + boundary.height / 2
      if (boundaryTop <= previewBottom && boundaryBottom >= previewBottom) return true
      if (index === rows.length - 1 && previewBottom > boundaryBottom) return true
    } else {
      boundaryTop = boundaryTop - boundary.height / 2
      boundaryBottom = boundaryBottom - boundary.height / 2
      if (boundaryTop <= previewTop && boundaryBottom >= previewTop) return true
      if (index === 0 && previewTop < boundaryTop) return true
    }
    return false
  })

  return row ? [row, rows.indexOf(row)] : undefined
}