import { definePlugin, type PlainExtension } from '@prosekit/core'
import type { EditorState } from '@prosekit/pm/state'
import { Plugin, PluginKey, TextSelection } from '@prosekit/pm/state'
import { Decoration, DecorationSet, type EditorView } from '@prosekit/pm/view'

import { addColumnAfter as createAddColumnAfter } from './columns-commands.ts'
import { applyColumnsMetaAction, type ColumnsMetaAction } from './columns-state.ts'
import type { ColumnAttrs, ColumnDragState, ColumnsRuntimeState } from './columns-types.ts'
import { findColumnBoundaryAtCoords, findParentColumn, normalizeColumnWidths, TOTAL_COLUMN_WIDTH } from './columns-utils.ts'

export const columnsPluginKey: PluginKey<ColumnsRuntimeState> = new PluginKey<ColumnsRuntimeState>('columns')

/**
 * @internal
 */
export type ColumnsPluginExtension = PlainExtension

/**
 * Options for the column resize plugin.
 */
export interface ColumnsPluginOptions {
  /**
   * Width of the hotspot zone on each side of a column boundary used to
   * detect a resize handle, in CSS pixels.
   *
   * @default 8
   */
  handleWidth?: number

  /**
   * Minimum column width as a percentage, used during resize clamping.
   *
   * @default 4
   */
  minColumnPercent?: number

  /**
   * Default column width used when adding a column via the handle's + button.
   *
   * @default null
   */
  defaultColumnWidth?: number | null
}

/**
 * Read the runtime state used by the columns plugin.
 */
export function getColumnsRuntimeState(state: EditorState): ColumnsRuntimeState | undefined {
  return columnsPluginKey.getState(state)
}

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

const DEFAULT_MIN_COLUMN_PERCENT = 4
const COLUMN_PERCENT_PRECISION = 1000

function roundPct(value: number): number {
  return Math.round(value * COLUMN_PERCENT_PRECISION) / COLUMN_PERCENT_PRECISION
}

/**
 * Finish a list of percentages so they sum to exactly `TOTAL_COLUMN_WIDTH`.
 */
function finishPcts(pcts: number[]): number[] {
  if (pcts.length === 0) return []
  const rounded = pcts.map(roundPct)
  const total = rounded.reduce((a, b) => a + b, 0)
  rounded[rounded.length - 1] = roundPct(rounded[rounded.length - 1] + TOTAL_COLUMN_WIDTH - total)
  return rounded
}

/**
 * Collect the column DOM elements inside a columns container.
 */
function getColumnElements(container: Element): HTMLElement[] {
  return Array.from(container.children).filter(
    (el): el is HTMLElement => el.classList.contains('prosekit-column'),
  )
}

/**
 * Take a snapshot of column DOM widths at the start of a drag gesture.
 */
function snapshotColumns(container: Element, leftIndex: number): {
  columns: Array<{ width: number }>
  totalWidth: number
  leftIndex: number
  minPct: number
} | null {
  const els = getColumnElements(container)
  if (leftIndex < 0 || leftIndex >= els.length - 1) return null

  const measured = els.map((el) => ({ width: el.getBoundingClientRect().width }))
  const totalWidth = measured.reduce((a, b) => a + b.width, 0)

  if (totalWidth <= 0) return null

  const minPct = Math.min(DEFAULT_MIN_COLUMN_PERCENT, TOTAL_COLUMN_WIDTH / els.length / 2)

  return { columns: measured, totalWidth, leftIndex, minPct }
}

// ---------------------------------------------------------------------------
// Drag helpers
// ---------------------------------------------------------------------------

interface DragContext {
  view: EditorView
  onMove: (event: MouseEvent) => void
  onEnd: (event: MouseEvent) => void
  cleanup: () => void
}

function getResizedColumnWidths(
  dragState: ColumnDragState,
  clientX: number,
  minColumnPercent: number,
): number[] {
  const { startX, totalWidth, leftIndex, columns } = dragState

  // Use the rendered column content width as the reference so a fixed `gap`
  // does not cause the first controlled frame to jump.
  const deltaPct = (clientX - startX) / totalWidth * TOTAL_COLUMN_WIDTH

  // The pair of columns being resized.
  const leftPx = columns[leftIndex].width
  const rightPx = columns[leftIndex + 1].width
  const pairPct = (leftPx + rightPx) / totalWidth * TOTAL_COLUMN_WIDTH

  const min = Math.min(minColumnPercent, dragState.minPercent, pairPct / 2)
  const max = pairPct - min
  const curLeftPct = leftPx / totalWidth * TOTAL_COLUMN_WIDTH

  const newLeftPct = roundPct(Math.max(min, Math.min(max, curLeftPct + deltaPct)))
  const newRightPct = roundPct(pairPct - newLeftPct)

  // Build all column percentages.
  const allPcts = columns.map((col, i) => {
    if (i === leftIndex) return newLeftPct
    if (i === leftIndex + 1) return newRightPct
    return roundPct(col.width / totalWidth * TOTAL_COLUMN_WIDTH)
  })

  return finishPcts(normalizeColumnWidths(allPcts))
}

function applyColumnWidthPreview(
  columnEls: HTMLElement[],
  widths: number[],
): void {
  const gridTemplate = widths.map(w => `${w}%`).join(' ')

  const container = columnEls[0]?.parentElement
  if (container) {
    container.style.gridTemplateColumns = gridTemplate
  }
  // for (const [index, width] of widths.entries()) {
  //   columnEls[index]?.style.setProperty('--prosekit-column-width', String(width))
  // }
}

function startDrag(
  view: EditorView,
  columnEls: HTMLElement[],
  minColumnPercent: number,
): DragContext {
  let ticking = false

  const onMove = (event: MouseEvent) => {
    if (ticking) return
    ticking = true

    window.requestAnimationFrame(() => {
      const state = getColumnsRuntimeState(view.state)
      if (!state?.dragging) {
        ticking = false
        return
      }

      // Normalize and apply to DOM as a live preview.
      const normalized = getResizedColumnWidths(state.dragging, event.clientX, minColumnPercent)
      applyColumnWidthPreview(columnEls, normalized)
      ticking = false
    })
  }

  const onEnd = (event: MouseEvent) => {
    const state = getColumnsRuntimeState(view.state)
    if (!state?.dragging || state.activeHandle == null) return

    const normalized = getResizedColumnWidths(state.dragging, event.clientX, minColumnPercent)

    // Find column positions in the document to dispatch the change.
    // Resolve at +1 to enter the column node; resolving at the boundary
    // position causes findParentColumn to miss the column.
    const $pos = view.state.doc.resolve(state.activeHandle + 1)
    const found = findParentColumn($pos)
    const containerNode = found ? view.state.doc.nodeAt(found.containerPos) : null

    const tr = view.state.tr
    if (found && containerNode) {
      let childPos = found.containerPos + 1
      containerNode.forEach((node, _offset, index) => {
        if (index < normalized.length) {
          const newWidth = normalized[index]
          if ((node.attrs as ColumnAttrs).width !== newWidth) {
            tr.setNodeMarkup(childPos, undefined, { ...node.attrs, width: newWidth })
          }
        }
        childPos += node.nodeSize
      })
    }

    tr.setMeta(columnsPluginKey, { type: 'stopDragging' } satisfies ColumnsMetaAction)
    view.dispatch(tr)
  }

  const win = view.dom.ownerDocument.defaultView ?? window

  const wrappedMove = (event: MouseEvent) => onMove(event)
  const wrappedEnd = (event: MouseEvent) => {
    win.removeEventListener('mousemove', wrappedMove)
    win.removeEventListener('mouseup', wrappedEnd)
    onEnd(event)
  }

  win.addEventListener('mousemove', wrappedMove)
  win.addEventListener('mouseup', wrappedEnd)

  return {
    view,
    onMove,
    onEnd,
    cleanup: () => {
      win.removeEventListener('mousemove', wrappedMove)
      win.removeEventListener('mouseup', wrappedEnd)
    },
  }
}

// ---------------------------------------------------------------------------
// Event handlers
// ---------------------------------------------------------------------------

function handleMouseMove(
  view: EditorView,
  event: MouseEvent,
  handleWidth: number,
) {
  if (!view.editable) return false
  const state = getColumnsRuntimeState(view.state)
  if (!state || state.dragging) return false

  const columnPos = findColumnBoundaryAtCoords(view, event, { handleWidth })
  if (columnPos === state.activeHandle) return false

  view.dispatch(
    view.state.tr.setMeta(
      columnsPluginKey,
      {
        type: 'setActiveHandle',
        pos: columnPos,
      } satisfies ColumnsMetaAction,
    ),
  )
  return false
}

function handleMouseLeave(view: EditorView) {
  if (!view.editable) return false
  const state = getColumnsRuntimeState(view.state)
  if (!state || state.dragging) return false
  if (state.activeHandle == null) return false

  view.dispatch(
    view.state.tr.setMeta(
      columnsPluginKey,
      {
        type: 'setActiveHandle',
        pos: null,
      } satisfies ColumnsMetaAction,
    ),
  )
  return false
}

function handleMouseDown(
  view: EditorView,
  event: MouseEvent,
  handleWidth: number,
  minColumnPercent: number,
  defaultColumnWidth: number | null,
) {
  if (!view.editable) return false

  const state = getColumnsRuntimeState(view.state)
  if (!state || state.dragging) return false

  const columnPos = state.activeHandle ?? findColumnBoundaryAtCoords(view, event, { handleWidth })
  if (columnPos == null) return false

  // If an explicit "add column" button was clicked, insert a new column.
  if (
    event.target instanceof HTMLElement
    && event.target.closest('.prosekit-column-resize-add')
  ) {
    handleAddColumnClick(view, columnPos, defaultColumnWidth)
    event.preventDefault()
    return true
  }

  if (!beginColumnDrag(view, columnPos, event.clientX, minColumnPercent)) {
    return false
  }

  event.preventDefault()
  return true
}

/**
 * Insert a new column after the active handle position.
 */
function handleAddColumnClick(
  view: EditorView,
  columnPos: number,
  defaultColumnWidth: number | null,
) {
  // Set the selection inside the current column and run addColumnAfter.
  const tr = view.state.tr.setSelection(
    TextSelection.create(view.state.doc, columnPos + 1),
  )
  tr.setMeta(columnsPluginKey, { type: 'setActiveHandle', pos: null } satisfies ColumnsMetaAction)
  view.dispatch(tr)

  // Run the add-column-after command.
  const command = createAddColumnAfter({ defaultColumnWidth })
  command(view.state, (cmdTr) => {
    view.dispatch(cmdTr)
  }, view)
}

function beginColumnDrag(
  view: EditorView,
  columnPos: number,
  clientX: number,
  minColumnPercent: number,
): boolean {
  const state = getColumnsRuntimeState(view.state)
  if (!state || state.dragging) return false

  const columnDom = view.nodeDOM(columnPos)
  if (!(columnDom instanceof HTMLElement)) return false

  const container = columnDom.parentElement
  if (!container?.classList.contains('prosekit-columns')) return false

  const columnEls = getColumnElements(container)
  const leftIndex = columnEls.indexOf(columnDom)
  if (leftIndex < 0 || leftIndex >= columnEls.length - 1) return false

  const snap = snapshotColumns(container, leftIndex)
  if (!snap) return false

  const dragState: ColumnDragState = {
    startX: clientX,
    columns: snap.columns,
    totalWidth: snap.totalWidth,
    leftIndex: snap.leftIndex,
    minPercent: snap.minPct,
  }

  applyColumnWidthPreview(
    columnEls,
    finishPcts(snap.columns.map((column) => column.width / snap.totalWidth * TOTAL_COLUMN_WIDTH)),
  )

  view.dispatch(
    view.state.tr.setMeta(
      columnsPluginKey,
      {
        type: 'startDragging',
        pos: columnPos,
        state: dragState,
      } satisfies ColumnsMetaAction,
    ),
  )

  startDrag(view, columnEls, minColumnPercent)
  return true
}

// ---------------------------------------------------------------------------
// Decorations
// ---------------------------------------------------------------------------

/**
 * Widget DOM that represents one column resize handle at a column boundary.
 */
function createHandleWidgetDOM(
  view: EditorView,
  getPos: () => number | undefined,
  isDragging: boolean,
  minColumnPercent: number,
  defaultColumnWidth: number | null,
): HTMLElement {
  const document = view.dom.ownerDocument
  const handle = document.createElement('div')
  handle.className = `prosekit-column-resize-handle${isDragging ? ' prosekit-column-resize-handle-dragging' : ''}`
  handle.setAttribute('contenteditable', 'false')
  handle.addEventListener('mousedown', (event) => {
    const columnPos = getPos()
    if (columnPos == null) return
    if (event.target instanceof HTMLElement && event.target.closest('.prosekit-column-resize-add')) {
      return
    }
    if (beginColumnDrag(view, columnPos, event.clientX, minColumnPercent)) {
      event.preventDefault()
      event.stopPropagation()
    }
  })

  const addBtn = document.createElement('button')
  addBtn.className = 'prosekit-column-resize-add'
  addBtn.type = 'button'
  addBtn.setAttribute('aria-label', 'Add column')
  addBtn.textContent = '+'
  addBtn.addEventListener('mousedown', (event) => {
    event.preventDefault()
    event.stopPropagation()
  })
  addBtn.addEventListener('click', (event) => {
    const columnPos = getPos()
    if (columnPos == null) return
    handleAddColumnClick(view, columnPos, defaultColumnWidth)
    event.preventDefault()
    event.stopPropagation()
  })
  handle.appendChild(addBtn)

  const line = document.createElement('div')
  line.className = 'prosekit-column-resize-line'
  handle.appendChild(line)

  return handle
}

function columnResizeDecorations(
  state: EditorState,
  options: {
    minColumnPercent: number
    defaultColumnWidth: number | null
  },
): DecorationSet {
  const runtime = getColumnsRuntimeState(state)
  if (runtime?.activeHandle == null) return DecorationSet.empty

  const columnPos = runtime.activeHandle
  const node = state.doc.nodeAt(columnPos)
  if (!node || node.type.name !== 'column') return DecorationSet.empty

  // Resolve one level inside the column so we can check whether it is the
  // last child in its columns container.
  const $pos = state.doc.resolve(columnPos + 1)
  const containerDepth = $pos.depth - 1
  const container = $pos.node(containerDepth)
  if (container.type.name !== 'columns') return DecorationSet.empty

  const columnIndex = $pos.index(containerDepth)
  if (columnIndex >= container.childCount - 1) {
    return DecorationSet.empty
  }

  // Place the widget just inside the column so it sits in the column's DOM
  // element rather than between sibling nodes. That way absolute positioning
  // (right: -6px) is relative to the column, not some outer container.
  const widgetPos = columnPos + 1
  return DecorationSet.create(state.doc, [
    Decoration.widget(widgetPos, (view, getPos) =>
      createHandleWidgetDOM(
        view,
        getPos,
        !!runtime.dragging,
        options.minColumnPercent,
        options.defaultColumnWidth,
      )),
  ])
}

// ---------------------------------------------------------------------------
// Plugin definition
// ---------------------------------------------------------------------------

/**
 * Register the columns runtime plugin with resize support.
 */
export function defineColumnsPlugin(options: ColumnsPluginOptions = {}): ColumnsPluginExtension {
  const handleWidth = options.handleWidth ?? 8
  const minColumnPercent = options.minColumnPercent ?? DEFAULT_MIN_COLUMN_PERCENT
  const defaultColumnWidth = options.defaultColumnWidth ?? null

  return definePlugin(
    new Plugin<ColumnsRuntimeState>({
      key: columnsPluginKey,
      state: {
        init: (): ColumnsRuntimeState => ({
          activeHandle: null,
          dragging: null,
        }),
        apply(tr, prev) {
          const action = tr.getMeta(columnsPluginKey) as ColumnsMetaAction | undefined
          return applyColumnsMetaAction(prev, tr, action)
        },
      },
      props: {
        attributes: (state): Record<string, string> => {
          const runtime = getColumnsRuntimeState(state)
          if (runtime?.activeHandle != null) {
            return { class: 'prosekit-column-resizing' }
          }

          return {}
        },
        handleDOMEvents: {
          mousemove: (view, event) => handleMouseMove(view, event, handleWidth),
          mouseleave: (view) => handleMouseLeave(view),
          mousedown: (view, event) => handleMouseDown(view, event, handleWidth, minColumnPercent, defaultColumnWidth),
        },
        decorations: (state) =>
          columnResizeDecorations(state, {
            minColumnPercent,
            defaultColumnWidth,
          }),
      },
    }),
  )
}
