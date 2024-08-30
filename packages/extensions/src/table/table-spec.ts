import { defineNodeSpec, type Extension } from '@prosekit/core'
import type { AttributeSpec, Attrs } from '@prosekit/pm/model'
import { tableNodes } from 'prosemirror-tables'

const cellContent = 'block+'

/**
 * @public
 */
export interface CellAttrs {
  colspan: number
  rowspan: number
  colwidth: number[] | null
}

const cellAttrs = {
  colspan: { default: 1 },
  rowspan: { default: 1 },
  colwidth: { default: null },
} satisfies Record<string, AttributeSpec>

/**
 * @internal
 */
export type TableSpecExtension = Extension<{
  Nodes: {
    table: Attrs
  }
}>

const specs = tableNodes({
  tableGroup: 'block',
  cellContent,
  cellAttributes: {},
})

/**
 * @internal
 */
export function defineTableSpec(): TableSpecExtension {
  const spec = specs.table
  return defineNodeSpec({
    ...spec,
    content: 'tableRow+',
    name: 'table',
  })
}

/**
 * @internal
 */
export type TableRowSpecExtension = Extension<{
  Nodes: {
    tableRow: Attrs
  }
}>

/**
 * @internal
 */
export function defineTableRowSpec(): TableRowSpecExtension {
  const spec = specs.table_row
  return defineNodeSpec({
    ...spec,
    content: '(tableCell | tableHeaderCell)*',
    name: 'tableRow',
  })
}

/**
 * @internal
 */
export type TableCellSpecExtension = Extension<{
  Nodes: {
    tableCell: CellAttrs
  }
}>

/**
 * @internal
 */
export function defineTableCellSpec(): TableCellSpecExtension {
  const spec = specs.table_cell
  return defineNodeSpec({
    ...spec,
    name: 'tableCell',
    attrs: cellAttrs,
  })
}

/**
 * @internal
 */
export type TableHeaderCellSpecExtension = Extension<{
  Nodes: {
    tableHeaderCell: CellAttrs
  }
}>

export function defineTableHeaderCellSpec(): TableHeaderCellSpecExtension {
  const spec = specs.table_header
  return defineNodeSpec({
    ...spec,
    name: 'tableHeaderCell',
    attrs: cellAttrs,
  })
}
