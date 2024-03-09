import { defineNodeSpec } from '@prosekit/core'
import type { AttributeSpec, Attrs, ProseMirrorNode } from '@prosekit/pm/model'
import { type TableRole } from 'prosemirror-tables'

const cellAttrs: Record<string, AttributeSpec> = {
  colspan: { default: 1 },
  rowspan: { default: 1 },
  colwidth: { default: null },
}

const cellContent = 'block+'

// TODO: export this from prosemirror-tables
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

export function defineTableSpec() {
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

export function defineTableRowSpec() {
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

export function defineTableCellSpec() {
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

export function defineTableHeaderCellSpec() {
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
