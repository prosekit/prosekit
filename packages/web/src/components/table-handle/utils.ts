import { findParentNode } from '@prosekit/core'
import type { ProseMirrorNode, ResolvedPos } from '@prosekit/pm/model'
import type { EditorView } from '@prosekit/pm/view'
import { cellAround, TableMap } from 'prosemirror-tables'

import type { CellAxisWithPos } from './context'

/**
 * Copied from https://github.com/ProseMirror/prosemirror-tables/blob/v1.5.0/src/columnresizing.ts#L256
 *
 * @internal
 */
function domCellAround(target: HTMLElement | null): HTMLElement | null {
  while (target && target.nodeName != 'TD' && target.nodeName != 'TH') {
    target = target.classList?.contains('ProseMirror')
      ? null
      : (target.parentNode as HTMLElement | null)
  }
  return target
}

export function getCellAxisByMouseEvent(
  view: EditorView,
  event: MouseEvent,
): CellAxisWithPos | undefined {
  const domCell = domCellAround(event.target as HTMLElement | null)
  if (!domCell) return

  const { left, top, width, height } = domCell.getBoundingClientRect()

  /**
   * Use the center coordinates of the cell to ensure we're within the selected cell.
   * This prevents potential issues when the mouse is on the border of two cells.
   */
  return getCellAxisByCoords(view, {
    left: left + width / 2,
    top: top + height / 2,
  })
}

function getCellAxisByCoords(
  view: EditorView,
  coords: { left: number; top: number },
): CellAxisWithPos | undefined {
  const cellPos = view.posAtCoords(coords)?.pos
  if (!cellPos) return

  const $cellPos = cellAround(view.state.doc.resolve(cellPos))
  if (!$cellPos) return

  const map = TableMap.get($cellPos.node(-1))
  const tableStart = $cellPos.start(-1)
  const cellRect = map.findCell($cellPos.pos - tableStart)
  return { col: cellRect.left, row: cellRect.top, $cell: $cellPos }
}

export function getColumnFirstCellPos(
  table: ProseMirrorNode,
  tablePos: number,
  index: number,
) {
  const map = TableMap.get(table)
  const cellIndex = getCellIndex(map, 0, index)
  const posInTable = map.map[cellIndex]
  return tablePos + posInTable + 1
}

export function getRowFirstCellPos(
  table: ProseMirrorNode,
  tablePos: number,
  index: number,
) {
  const map = TableMap.get(table)
  const cellIndex = getCellIndex(map, index, 0)
  const posInTable = map.map[cellIndex]
  return tablePos + posInTable + 1
}

export function getCellIndex(
  map: TableMap,
  rowIndex: number,
  colIndex: number,
): number {
  return map.width * rowIndex + colIndex
}

export function findTable($pos: ResolvedPos) {
  return findParentNode((node) => node.type.spec.tableRole === 'table', $pos)
}
