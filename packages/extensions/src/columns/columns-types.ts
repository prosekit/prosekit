import type { FindParentNodeResult } from '@prosekit/core'
import type { Attrs } from '@prosekit/pm/model'

export interface ColumnsAttrs extends Attrs {
  gap: number | null
}

export interface ColumnAttrs extends Attrs {
  width: number | null
}

export interface ColumnsOptions {
  minColumnWidth?: number
  defaultColumnWidth?: number | null
  defaultGap?: number | null
  maxColumns?: number | null
  enableModAWithinColumn?: boolean
  normalizeOnTransaction?: boolean
}

export interface InsertColumnsOptions {
  count: number
  widths?: number[]
  gap?: number | null
}

export interface FindColumnsResult extends FindParentNodeResult {
  node: FindParentNodeResult['node'] & { attrs: ColumnsAttrs }
}

export interface FindColumnResult extends FindParentNodeResult {
  node: FindParentNodeResult['node'] & { attrs: ColumnAttrs }
  index: number
  containerPos: number
}

export interface ColumnHandleInfo {
  pos: number
  columnPos: number
  containerPos: number
  index: number
}

export interface ColumnDragSession {
  handlePos: number
  columnPos: number
  startX: number
  startWidth: number
}

export interface ColumnsRuntimeState {
  activeHandle: ColumnHandleInfo | null
  dragging: ColumnDragSession | null
}

export interface ColumnBoundaryHit extends ColumnHandleInfo {}

export interface ColumnLayoutInfo {
  containerPos: number
  gap: number | null
  columns: Array<{
    pos: number
    index: number
    width: number | null
  }>
}
