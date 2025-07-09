import {
  defineNodeSpec,
  type Extension,
} from '@prosekit/core'
import type {
  AttributeSpec,
  Attrs,
} from '@prosekit/pm/model'
import { tableNodes } from 'prosemirror-tables'

const cellContent = 'block+'

/**
 * @public
 */
export interface CellAttrs {
  colspan?: number
  rowspan?: number
  colwidth?: number[] | null
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
  return defineNodeSpec({
    ...specs['table'],
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
  return defineNodeSpec({
    ...specs['table_row'],
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
  return defineNodeSpec({
    ...specs['table_cell'],
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
  return defineNodeSpec({
    ...specs['table_header'],
    name: 'tableHeaderCell',
    attrs: cellAttrs,
  })
}
