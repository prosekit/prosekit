import { findParentNode } from '@prosekit/core'
import type { ResolvedPos } from '@prosekit/pm/model'
import type { EditorState } from '@prosekit/pm/state'
import type { EditorView } from '@prosekit/pm/view'

import type { ColumnAttrs, ColumnBoundaryHit, ColumnLayoutInfo, FindColumnResult, FindColumnsResult } from './columns-types.ts'

const TOTAL_COLUMN_WIDTH = 100
const COLUMN_WIDTH_PRECISION = 1000

function roundColumnWidth(width: number): number {
  return Math.round(width * COLUMN_WIDTH_PRECISION) / COLUMN_WIDTH_PRECISION
}

function finishColumnWidths(widths: number[]): number[] {
  if (widths.length === 0) return []
  const rounded = widths.map(roundColumnWidth)
  const total = rounded.reduce((sum, width) => sum + width, 0)
  rounded[rounded.length - 1] = roundColumnWidth(rounded[rounded.length - 1] + TOTAL_COLUMN_WIDTH - total)
  return rounded
}

export function getEqualColumnWidths(count: number): number[] {
  if (count <= 0) return []
  return finishColumnWidths(Array.from({ length: count }, () => TOTAL_COLUMN_WIDTH / count))
}

export function findParentColumns($pos: ResolvedPos): FindColumnsResult | undefined {
  const found = findParentNode((node) => node.type.name === 'columns', $pos)
  return found as FindColumnsResult | undefined
}

export function findParentColumn($pos: ResolvedPos): FindColumnResult | undefined {
  const found = findParentNode((node) => node.type.name === 'column', $pos)
  if (!found) return
  const containerDepth = found.depth - 1
  if (containerDepth < 0 || $pos.node(containerDepth).type.name !== 'columns') {
    return
  }
  return {
    ...(found as FindColumnResult),
    index: $pos.index(containerDepth),
    containerPos: containerDepth === 0 ? 0 : $pos.before(containerDepth),
  }
}

export function findColumnByIndex(
  state: EditorState,
  containerPos: number,
  index: number,
): FindColumnResult | undefined {
  const $container = state.doc.resolve(containerPos + 1)
  const container = state.doc.nodeAt(containerPos)
  if (!container || container.type.name !== 'columns') return
  if (index < 0 || index >= container.childCount) return

  let pos = containerPos + 1
  for (let i = 0; i < container.childCount; i += 1) {
    const child = container.child(i)
    if (i === index) {
      const $pos = state.doc.resolve(pos + 1)
      const found = findParentColumn($pos)
      if (found) return found
      return {
        node: child as typeof child & { attrs: ColumnAttrs },
        pos,
        start: pos + 1,
        depth: $container.depth + 1,
        index,
        containerPos,
      }
    }
    pos += child.nodeSize
  }
}

export function getColumnCount(
  state: EditorState,
  containerPos: number,
): number {
  const container = state.doc.nodeAt(containerPos)
  return container?.type.name === 'columns' ? container.childCount : 0
}

export function getColumnLayoutAtPos(
  state: EditorState,
  pos: number,
): ColumnLayoutInfo | undefined {
  const $pos = state.doc.resolve(pos)
  const found = findParentColumns($pos)
  if (!found) return

  const columns: ColumnLayoutInfo['columns'] = []
  let childPos = found.start
  found.node.forEach((node, _offset, index) => {
    columns.push({
      pos: childPos,
      index,
      width: (node.attrs as ColumnAttrs).width ?? null,
    })
    childPos += node.nodeSize
  })

  return {
    containerPos: found.pos,
    gap: found.node.attrs.gap ?? null,
    columns,
  }
}

export function clampColumnWidth(
  width: number,
  _options: { minColumnWidth: number },
): number {
  return Math.max(0, roundColumnWidth(width))
}

export function normalizeColumnWidths(
  widths: Array<number | null>,
  _options: { minColumnWidth: number },
): number[] {
  if (widths.length === 0) return []
  const fallback = TOTAL_COLUMN_WIDTH / widths.length
  const values = widths.map((width) => Math.max(0, width ?? fallback))
  const total = values.reduce((sum, width) => sum + width, 0)
  if (total <= 0) return getEqualColumnWidths(widths.length)

  return finishColumnWidths(values.map((width) => width / total * TOTAL_COLUMN_WIDTH))
}

export function findColumnBoundaryAtCoords(
  view: EditorView,
  event: MouseEvent,
  options: { handleWidth?: number } = {},
): ColumnBoundaryHit | null {
  const handleWidth = options.handleWidth ?? 6
  const container = event.composedPath().find((el) => (el as HTMLElement).classList?.contains('prosekit-columns')) as
    | HTMLElement
    | undefined
  if (!container) return null

  const columns = Array.from(container.children).filter((el) => el.classList.contains('prosekit-column'))

  for (let index = 0; index < columns.length; index += 1) {
    const column = columns[index] as HTMLElement
    const rect = column.getBoundingClientRect()
    const nextColumn = columns[index + 1] as HTMLElement | undefined
    const nextRect = nextColumn?.getBoundingClientRect()
    const handleX = nextRect ? rect.right + (nextRect.left - rect.right) / 2 : rect.right
    if (event.clientX < handleX - handleWidth || event.clientX > handleX + handleWidth) {
      continue
    }
    const columnPos = view.posAtDOM(column, 0)
    if (columnPos == null) continue
    const $column = view.state.doc.resolve(columnPos + 1)
    const found = findParentColumn($column)
    if (!found) continue
    return {
      pos: found.pos + found.node.nodeSize,
      columnPos: found.pos,
      containerPos: found.containerPos,
      index: found.index,
    }
  }

  return null
}
