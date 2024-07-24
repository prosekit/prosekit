import { defineNodeSpec, type Extension } from '@prosekit/core'
import type { AttributeSpec, Attrs, ProseMirrorNode } from '@prosekit/pm/model'
import type { TableRole } from 'prosemirror-tables'

const cellContent = 'block+'

// TODO: export this from prosemirror-tables

/**
 * @public
 */
export interface CellAttrs {
  colspan: number
  rowspan: number
  colwidth: number[] | null
}

function getCellAttrs(dom: HTMLElement | string): Partial<CellAttrs> {
  if (typeof dom === 'string') {
    return {}
  }

  const widthAttr = dom.getAttribute('data-colwidth')
  const widths =
    widthAttr && /^\d+(,\d+)*$/.test(widthAttr)
      ? widthAttr.split(',').map((s) => Number(s))
      : null
  const colspan = Number(dom.getAttribute('colspan') || 1)
  return {
    colspan,
    rowspan: Number(dom.getAttribute('rowspan') || 1),
    colwidth: widths && widths.length == colspan ? widths : null,
  } satisfies CellAttrs
}

function setCellAttrs(node: ProseMirrorNode): Attrs {
  const pmAttrs = node.attrs as CellAttrs
  const domAttrs: Record<string, string | number> = {}

  if (pmAttrs.colspan !== 1) {
    domAttrs.colspan = pmAttrs.colspan
  }
  if (pmAttrs.rowspan !== 1) {
    domAttrs.rowspan = pmAttrs.rowspan
  }
  if (pmAttrs.colwidth) {
    domAttrs['data-colwidth'] = pmAttrs.colwidth.join(',')
  }

  return domAttrs
}

/**
 * @internal
 */
export type TableSpecExtension = Extension<{
  Nodes: {
    table: Attrs
  }
}>

/**
 * @internal
 */
export function defineTableSpec(): TableSpecExtension {
  return defineNodeSpec({
    name: 'table',

    tableRole: 'table' satisfies TableRole,
    content: 'tableRow+',
    isolating: true,
    group: 'block',
    parseDOM: [{ tag: 'table' }],
    toDOM() {
      return ['table', ['tbody', 0]]
    },
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
    name: 'tableRow',

    tableRole: 'row' satisfies TableRole,
    content: '(tableCell | tableHeaderCell)*',
    parseDOM: [{ tag: 'tr' }],
    toDOM() {
      return ['tr', 0]
    },
  })
}

const cellAttrs = {
  colspan: { default: 1 },
  rowspan: { default: 1 },
  colwidth: { default: null },
} satisfies Record<string, AttributeSpec>

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
    name: 'tableCell',

    tableRole: 'cell' satisfies TableRole,
    content: cellContent,
    attrs: cellAttrs,
    isolating: true,
    parseDOM: [{ tag: 'td', getAttrs: (dom) => getCellAttrs(dom) }],
    toDOM(node) {
      return ['td', setCellAttrs(node), 0]
    },
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
    name: 'tableHeaderCell',

    tableRole: 'header_cell' satisfies TableRole,
    content: cellContent,
    attrs: cellAttrs,
    isolating: true,
    parseDOM: [{ tag: 'th', getAttrs: (dom) => getCellAttrs(dom) }],
    toDOM(node) {
      return ['th', setCellAttrs(node), 0]
    },
  })
}
