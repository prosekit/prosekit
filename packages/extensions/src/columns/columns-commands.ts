import { defineCommands, getNodeType, type Extension } from '@prosekit/core'
import { Fragment, type NodeType, type ProseMirrorNode } from '@prosekit/pm/model'
import type { Command } from '@prosekit/pm/state'

import type { ColumnAttrs, ColumnsAttrs, ColumnsOptions, InsertColumnsOptions } from './columns-types.ts'
import { findParentColumn, findParentColumns, getColumnLayoutAtPos, getEqualColumnWidths, normalizeColumnWidths } from './columns-utils.ts'

function createDefaultBlock(state: Parameters<Command>[0]): ProseMirrorNode {
  const paragraphType = getNodeType(state.schema, 'paragraph')
  return paragraphType.createAndFill()!
}

function createColumnNode(
  columnType: NodeType,
  state: Parameters<Command>[0],
  attrs: ColumnAttrs,
): ProseMirrorNode {
  return columnType.createAndFill(attrs, Fragment.from(createDefaultBlock(state)))!
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
  const widths = options.widths ?? []
  const children = Array.from(
    { length: count },
    (_, index) => createColumnNode(columnType, state, { width: widths[index] ?? defaults.defaultColumnWidth }),
  )

  return columnsType.createAndFill(
    { gap: options.gap ?? defaults.defaultGap },
    Fragment.from(children),
  )!
}

function replaceColumnsChildren(
  state: Parameters<Command>[0],
  dispatch: Parameters<Command>[1],
  containerPos: number,
  nextColumns: ProseMirrorNode[],
  containerAttrs: ColumnsAttrs,
): boolean {
  const container = state.doc.nodeAt(containerPos)
  const columnsType = getNodeType(state.schema, 'columns')
  if (!container || container.type !== columnsType) return false
  if (!dispatch) return true

  if (nextColumns.length <= 1) {
    const content = nextColumns[0]?.content ?? Fragment.empty
    dispatch(state.tr.replaceWith(containerPos, containerPos + container.nodeSize, content).scrollIntoView())
    return true
  }

  const nextContainer = columnsType.createChecked(containerAttrs, nextColumns)
  dispatch(state.tr.replaceWith(containerPos, containerPos + container.nodeSize, nextContainer).scrollIntoView())
  return true
}

function getChildNodes(node: ProseMirrorNode): ProseMirrorNode[] {
  const children: ProseMirrorNode[] = []
  node.forEach((child) => {
    children.push(child)
  })
  return children
}

function getOptionsWithDefaults(options: ColumnsOptions = {}) {
  return {
    minColumnWidth: options.minColumnWidth ?? 120,
    defaultColumnWidth: options.defaultColumnWidth ?? null,
    defaultGap: options.defaultGap ?? null,
    maxColumns: options.maxColumns ?? null,
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

/**
 * Create a command that replaces the current selection with a new columns
 * container.
 */
export function insertColumns(options: InsertColumnsOptions): Command {
  return (state, dispatch) => {
    if (options.count < 1) return false
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
    if (defaults.maxColumns != null && container.childCount >= defaults.maxColumns) {
      return false
    }

    const nextChildren = getChildNodes(container)
    const insertIndex = side === 'before' ? found.index : found.index + 1
    nextChildren.splice(
      insertIndex,
      0,
      createColumnNode(columnType, state, { width: defaults.defaultColumnWidth }),
    )

    return replaceColumnsChildren(
      state,
      dispatch,
      found.containerPos,
      nextChildren,
      container.attrs as ColumnsAttrs,
    )
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

  const nextChildren = getChildNodes(container)
  nextChildren.splice(found.index, 1)

  return replaceColumnsChildren(
    state,
    dispatch,
    found.containerPos,
    nextChildren,
    container.attrs as ColumnsAttrs,
  )
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
export function normalizeColumns(options: ColumnsOptions = {}): Command {
  const defaults = getOptionsWithDefaults(options)
  return (state, dispatch) => {
    const layout = getColumnLayoutAtPos(state, state.selection.anchor)
    if (!layout) return false
    const widths = normalizeColumnWidths(
      layout.columns.map((column) => column.width),
      { minColumnWidth: defaults.minColumnWidth },
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
}

/**
 * Register editor commands for the columns extension.
 */
export function defineColumnsCommands(options: ColumnsOptions = {}): ColumnsCommandsExtension {
  const defaults = getOptionsWithDefaults(options)
  return defineCommands({
    insertColumns: (commandOptions: InsertColumnsOptions) => (state, dispatch) => {
      if (commandOptions.count < 1) return false
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
