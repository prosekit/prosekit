import type { FindParentNodeResult } from '@prosekit/core'
import type { Attrs } from '@prosekit/pm/model'

/**
 * Attributes stored on the `columns` container node.
 */
export interface ColumnsAttrs extends Attrs {}

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
   * Maximum number of columns allowed in one container.
   *
   * @default Infinity
   */
  maxColumns?: number

  /**
   * Width of the hotspot zone on each side of a column boundary used to
   * detect a resize handle, in CSS pixels.
   *
   * @default 8
   */
  handleWidth?: number
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
 * Snapshot of column widths captured when a resize drag starts.
 */
export interface ColumnDragState {
  /**
   * The initial mouse X position.
   */
  startX: number

  /**
   * Rendered pixel widths of every column in the container at drag start.
   * This is a snapshot used for delta computation during the drag.
   */
  columns: Array<{ width: number }>

  /**
   * Total rendered width of all columns in the container, in pixels.
   */
  totalWidth: number

  /**
   * Index of the column to the left of the dragged boundary.
   */
  leftIndex: number

  /**
   * Minimum width a column can have, expressed as a percentage of the
   * container.
   */
  minPercent: number
}

/**
 * Plugin state used by the columns resize plugin.
 *
 * The plugin handles resize detection and drag gestures automatically via
 * `handleDOMEvents`. `activeHandle` is a document position pointing to the
 * left-side column at the boundary under the mouse cursor.
 */
export interface ColumnsRuntimeState {
  /**
   * Document position of the column whose right edge is the active resize
   * boundary, or `null` when no handle is active.
   *
   * This position is remapped automatically when the document changes.
   */
  activeHandle: number | null

  /**
   * Drag session snapshot, or `null` when not dragging.
   */
  dragging: ColumnDragState | null
}

/**
 * Information about a column boundary detected from pointer coordinates.
 */
export interface ColumnBoundaryHit {
  /**
   * Document position of the left-side column.
   */
  columnPos: number

  /**
   * Position of the columns container.
   */
  containerPos: number

  /**
   * Index of the left-side column within the container.
   */
  index: number
}

/**
 * The current layout data for a `columns` container.
 */
export interface ColumnLayoutInfo {
  containerPos: number
  columns: Array<{
    pos: number
    index: number
    width: number | null
  }>
}
