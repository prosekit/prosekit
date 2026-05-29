import { defineCommands, getNodeType, type Extension } from '@prosekit/core'
import { Fragment, type NodeType, type ProseMirrorNode } from '@prosekit/pm/model'
import type { Command } from '@prosekit/pm/state'

import type { ColumnAttrs, ColumnsOptions, InsertColumnsOptions } from './columns-types.ts'
import { findParentColumn, findParentColumns, getColumnLayoutAtPos, getEqualColumnWidths, normalizeColumnWidths } from './columns-utils.ts'
import { ReplaceAroundStep } from '@prosekit/pm/transform'
import { Slice } from '@prosekit/pm/model'
function createColumnNode(
  columnType: NodeType,
  attrs: ColumnAttrs,
): ProseMirrorNode {
  return columnType.createAndFill(attrs)!
}

function createColumnsNode(
  state: Parameters<Command>[0],
  options: InsertColumnsOptions,
  defaults: Pick<ReturnType<typeof getOptionsWithDefaults>, 'defaultColumnWidth' | 'defaultGap'> = {
    defaultColumnWidth: null,
    defaultGap: null,
  },
): ProseMirrorNode {
  const columnsType = getNodeType(state.schema, 'columns')
  const columnType = getNodeType(state.schema, 'column')
  const count = Math.max(1, options.count)
  const children = Array.from(
    { length: count },
    () => createColumnNode(columnType, { width: defaults.defaultColumnWidth }),
  )

  return columnsType.createAndFill(
    { gap: defaults.defaultGap },
    Fragment.from(children),
  )!
}

function roundColumnWidth(width: number): number {
  return Math.round(width * 1000) / 1000
}

function resolveColumnWidth(node: ProseMirrorNode, index: number, count: number): number {
  return (node.attrs as ColumnAttrs).width ?? getEqualColumnWidths(count)[index]
}

function splitColumnWidth(
  width: number,
  requestedWidth: number | null,
): [currentWidth: number, insertedWidth: number] {
  const safeRequestedWidth = requestedWidth != null && requestedWidth > 0 && requestedWidth < width
    ? requestedWidth
    : width / 2
  const insertedWidth = roundColumnWidth(safeRequestedWidth)
  const currentWidth = roundColumnWidth(width - insertedWidth)
  return [currentWidth, roundColumnWidth(width - currentWidth)]
}

function getOptionsWithDefaults(options: ColumnsOptions = {}) {
  return {
    minColumnWidth: options.minColumnWidth ?? 120,
    defaultColumnWidth: options.defaultColumnWidth ?? null,
    defaultGap: options.defaultGap ?? null,
    maxColumns: options.maxColumns ?? Number.POSITIVE_INFINITY,
  }
}

/**
 * @internal
 */
export type ColumnsCommandsExtension = Extension<{
  Commands: {
    insertColumns: [options: InsertColumnsOptions]
    addColumnBefore: []
    addColumnAfter: []
    removeColumn: []
    setColumnWidth: [width: number | null]
    setColumnsGap: [gap: number | null]
    distributeColumns: []
    normalizeColumns: []
  }
}>

function validateInsertColumnsOptions(options: InsertColumnsOptions): boolean {
  return Number.isFinite(options.count) && Number.isInteger(options.count) && options.count >= 1
}

/**
 * Create a command that replaces the current selection with a new columns
 * container.
 */
export function insertColumns(options: InsertColumnsOptions): Command {
  return (state, dispatch) => {
    if (!validateInsertColumnsOptions(options)) return false
    const node = createColumnsNode(state, options)
    const { from, to } = state.selection
    dispatch?.(state.tr.replaceRangeWith(from, to, node).scrollIntoView())
    return true
  }
}

function addColumn(side: 'before' | 'after', options: ColumnsOptions): Command {
  const defaults = getOptionsWithDefaults(options)
  return (state, dispatch) => {
    const found = findParentColumn(state.selection.$anchor)
    if (!found) return false
    const container = state.doc.nodeAt(found.containerPos)
    const columnType = getNodeType(state.schema, 'column')
    if (!container) return false
    if (container.childCount >= defaults.maxColumns) {
      return false
    }
    if (!dispatch) return true

    const currentWidth = resolveColumnWidth(found.node, found.index, container.childCount)
    const [nextCurrentWidth, insertedWidth] = splitColumnWidth(currentWidth, defaults.defaultColumnWidth)
    const insertPos = side === 'before' ? found.pos : found.pos + found.node.nodeSize
    const insertedColumn = createColumnNode(columnType, { width: insertedWidth })

    const tr = state.tr.insert(insertPos, insertedColumn)
    const currentPos = side === 'before' ? tr.mapping.map(found.pos, 1) : found.pos
    const currentNode = tr.doc.nodeAt(currentPos)
    if (currentNode) {
      tr.setNodeMarkup(currentPos, undefined, { ...currentNode.attrs, width: nextCurrentWidth })
    }
    dispatch(tr.scrollIntoView())
    return true
  }
}

/**
 * Create a command that inserts a new column before the current column.
 */
export function addColumnBefore(options: ColumnsOptions = {}): Command {
  return addColumn('before', options)
}

/**
 * Create a command that inserts a new column after the current column.
 */
export function addColumnAfter(options: ColumnsOptions = {}): Command {
  return addColumn('after', options)
}

/**
 * Create a command that removes the current column.
 *
 * When the container would only have one column left, the remaining column
 * content is unwrapped back into regular blocks.
 */
export function removeColumn(): Command {
  return removeColumnCommand
}

const removeColumnCommand: Command = (state, dispatch) => {
  const found = findParentColumn(state.selection.$anchor)
  if (!found) return false
  const container = state.doc.nodeAt(found.containerPos)
  if (!container) return false

  // When removing the last column from a single-column container, unwrap
  // the column's content so user content isn't lost.
  if (container.childCount <= 2) {
    if (!dispatch) return true
    // const remainingIndex = found.index === 0 ? 1 : 0
    // const content = container.child(remainingIndex)?.content ?? Fragment.empty
    // dispatch(state.tr.replaceWith(found.containerPos, found.containerPos + container.nodeSize, content).scrollIntoView())
    //
    const remainingIndex = found.index === 0 ? 1 : 0
    const remainingNode = container.child(remainingIndex)
    if (!remainingNode) return false

    let remainingNodePos = found.containerPos + 1
    if (remainingIndex === 1) {
      remainingNodePos += container.child(0).nodeSize
    }

    const origFrom = found.containerPos
    const origTo = found.containerPos + container.nodeSize
    const origGapFrom = remainingNodePos + 1
    const origGapTo = origGapFrom + remainingNode.content.size

    const tr = state.tr

    tr.delete(found.pos, found.pos + found.node.nodeSize)

    const from = tr.mapping.map(origFrom)
    const to = tr.mapping.map(origTo)
    const gapFrom = tr.mapping.map(origGapFrom)
    const gapTo = tr.mapping.map(origGapTo)

    const unwrapStep = new ReplaceAroundStep(
      from,
      to,
      gapFrom,
      gapTo,
      Slice.empty,
      0,
      true
    )

    tr.step(unwrapStep)

    dispatch(tr.scrollIntoView())

    return true
  }
  if (!dispatch) return true

  const removedWidth = resolveColumnWidth(found.node, found.index, container.childCount)
  const targetIndex = found.index < container.childCount - 1 ? found.index + 1 : found.index - 1
  const targetNode = container.child(targetIndex)
  const targetWidth = resolveColumnWidth(targetNode, targetIndex, container.childCount)
  let targetPos = found.containerPos + 1
  for (let index = 0; index < targetIndex; index += 1) {
    targetPos += container.child(index).nodeSize
  }
  const tr = state.tr.delete(found.pos, found.pos + found.node.nodeSize)
  const mappedTargetPos = targetIndex < found.index ? targetPos : found.pos
  const mappedTargetNode = tr.doc.nodeAt(mappedTargetPos)
  if (mappedTargetNode) {
    tr.setNodeMarkup(mappedTargetPos, undefined, {
      ...mappedTargetNode.attrs,
      width: roundColumnWidth(targetWidth + removedWidth),
    })
  }
  dispatch(tr.scrollIntoView())
  return true
}

/**
 * Create a command that updates the width of the current column.
 */
export function setColumnWidth(width: number | null): Command {
  return (state, dispatch) => {
    const found = findParentColumn(state.selection.$anchor)
    if (!found) return false
    return setColumnWidthAt(found.pos, width)(state, dispatch)
  }
}

/**
 * Create a command that updates the width of the column at the given document
 * position.
 */
export function setColumnWidthAt(pos: number, width: number | null): Command {
  return (state, dispatch) => {
    if (width != null && (!Number.isFinite(width) || width < 0)) return false
    const node = state.doc.nodeAt(pos)
    if (!node || node.type.name !== 'column') return false
    if (!dispatch) return true
    dispatch(state.tr.setNodeMarkup(pos, undefined, { ...node.attrs, width }).scrollIntoView())
    return true
  }
}

/**
 * Create a command that updates the gap of the current columns container.
 */
export function setColumnsGap(gap: number | null): Command {
  return (state, dispatch) => {
    if (gap != null && (!Number.isFinite(gap) || gap < 0)) return false
    const found = findParentColumns(state.selection.$anchor)
    if (!found) return false
    if (!dispatch) return true
    dispatch(state.tr.setNodeMarkup(found.pos, undefined, { ...found.node.attrs, gap }).scrollIntoView())
    return true
  }
}

/**
 * Create a command that redistributes the current columns container to equal
 * widths.
 */
export function distributeColumns(_options: ColumnsOptions = {}): Command {
  return distributeColumnsCommand
}

const distributeColumnsCommand: Command = (state, dispatch) => {
  const found = findParentColumns(state.selection.$anchor)
  if (!found) return false
  const widths = getEqualColumnWidths(found.node.childCount)
  if (!dispatch) return true

  const tr = state.tr
  let pos = found.start
  found.node.forEach((node, _offset, index) => {
    tr.setNodeMarkup(pos, undefined, { ...node.attrs, width: widths[index] })
    pos += node.nodeSize
  })
  dispatch(tr.scrollIntoView())
  return true
}

/**
 * Create a command that normalizes the current columns container so all widths
 * add up to 100.
 */
export function normalizeColumns(_options: ColumnsOptions = {}): Command {
  return normalizeColumnsCommand
}

const normalizeColumnsCommand: Command = (state, dispatch) => {
  const layout = getColumnLayoutAtPos(state, state.selection.anchor)
  if (!layout) return false
  const widths = normalizeColumnWidths(
    layout.columns.map((column) => column.width),
  )
  if (!dispatch) return true

  const tr = state.tr
  for (let index = 0; index < layout.columns.length; index += 1) {
    const column = layout.columns[index]
    const node = state.doc.nodeAt(column.pos)
    if (!node) continue
    tr.setNodeMarkup(column.pos, undefined, { ...node.attrs, width: widths[index] })
  }
  dispatch(tr.scrollIntoView())
  return true
}

/**
 * Register editor commands for the columns extension.
 */
export function defineColumnsCommands(options: ColumnsOptions = {}): ColumnsCommandsExtension {
  const defaults = getOptionsWithDefaults(options)
  return defineCommands({
    insertColumns: (commandOptions: InsertColumnsOptions) => (state, dispatch) => {
      if (!validateInsertColumnsOptions(commandOptions)) return false
      const node = createColumnsNode(state, commandOptions, defaults)
      const { from, to } = state.selection
      dispatch?.(state.tr.replaceRangeWith(from, to, node).scrollIntoView())
      return true
    },
    addColumnBefore: () => addColumnBefore(options),
    addColumnAfter: () => addColumnAfter(options),
    removeColumn,
    setColumnWidth,
    setColumnsGap,
    distributeColumns: () => distributeColumns(options),
    normalizeColumns: () => normalizeColumns(options),
  })
}
