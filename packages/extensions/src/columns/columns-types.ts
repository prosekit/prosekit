import type { FindParentNodeResult } from '@prosekit/core'
import type { Attrs } from '@prosekit/pm/model'

/**
 * Attributes stored on the `columns` container node.
 */
export interface ColumnsAttrs extends Attrs {
  /**
   * Gap between adjacent columns, in CSS pixels.
   */
  gap: number | null
}

/**
 * Attributes stored on an individual `column` node.
 */
export interface ColumnAttrs extends Attrs {
  /**
   * Relative width of the column, expressed as a percentage-like flex weight.
   */
  width: number | null
}

/**
 * Configure the behavior of the columns extension.
 */
export interface ColumnsOptions {
  /**
   * Minimum width used when normalizing column widths.
   *
   * @default 120
   */
  minColumnWidth?: number

  /**
   * Width assigned to newly inserted columns.
   *
   * Use `null` to let the browser distribute the width automatically until the
   * columns are normalized.
   *
   * @default null
   */
  defaultColumnWidth?: number | null

  /**
   * Gap assigned to newly inserted columns, in CSS pixels.
   *
   * @default null
   */
  defaultGap?: number | null

  /**
   * Maximum number of columns allowed in one container.
   *
   * @default Infinity
   */
  maxColumns?: number
}

/**
 * Options for creating a new columns container.
 */
export interface InsertColumnsOptions {
  /**
   * Number of columns to insert.
   */
  count: number
}

/**
 * The nearest ancestor `columns` node for a resolved position.
 */
export interface FindColumnsResult extends FindParentNodeResult {
  node: FindParentNodeResult['node'] & { attrs: ColumnsAttrs }
}

/**
 * The nearest ancestor `column` node for a resolved position.
 */
export interface FindColumnResult extends FindParentNodeResult {
  node: FindParentNodeResult['node'] & { attrs: ColumnAttrs }
  index: number
  containerPos: number
}

/**
 * Information about the resize handle attached to a column boundary.
 */
export interface ColumnHandleInfo {
  pos: number
  columnPos: number
  containerPos: number
  index: number
}

/**
 * Runtime data for an active drag gesture on a column boundary.
 */
export interface ColumnDragSession {
  handlePos: number
  columnPos: number
  startX: number
  startWidth: number
}

/**
 * Plugin state used by custom column UI, such as resize handles.
 */
export interface ColumnsRuntimeState {
  activeHandle: ColumnHandleInfo | null
  dragging: ColumnDragSession | null
}

/**
 * Information about a column boundary detected from pointer coordinates.
 */
export interface ColumnBoundaryHit extends ColumnHandleInfo {}

/**
 * The current layout data for a `columns` container.
 */
export interface ColumnLayoutInfo {
  containerPos: number
  gap: number | null
  columns: Array<{
    pos: number
    index: number
    width: number | null
  }>
}
