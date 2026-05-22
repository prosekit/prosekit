import { defineNodeSpec, type Extension } from '@prosekit/core'

import type { ColumnAttrs, ColumnsAttrs } from './columns-types.ts'

/**
 * @internal
 */
export type ColumnsSpecExtension = Extension<{
  Nodes: {
    columns: ColumnsAttrs
  }
}>

/**
 * @internal
 */
export type ColumnSpecExtension = Extension<{
  Nodes: {
    column: ColumnAttrs
  }
}>

/**
 * @internal
 */
export function defineColumnsSpec(): ColumnsSpecExtension {
  return defineNodeSpec<'columns', ColumnsAttrs>({
    name: 'columns',
    group: 'block',
    content: 'column+',
    attrs: {
      gap: { default: null },
    },
    parseDOM: [{
      tag: 'div.prosekit-columns',
      getAttrs(dom) {
        if (!(dom instanceof HTMLElement)) return false
        const gap = dom.style.getPropertyValue('--prosekit-columns-gap')
          || dom.style.getPropertyValue('gap')
        if (!gap) return { gap: null }
        const value = Number.parseFloat(gap)
        return { gap: Number.isFinite(value) ? value : null }
      },
    }],
    toDOM(node) {
      const attrs = node.attrs as ColumnsAttrs
      const gap = attrs.gap
      const style = gap != null ? `--prosekit-columns-gap:${gap}px;gap:${gap}px;` : null
      return ['div', { class: 'prosekit-columns', style }, 0]
    },
  })
}

/**
 * @internal
 */
export function defineColumnSpec(): ColumnSpecExtension {
  return defineNodeSpec<'column', ColumnAttrs>({
    name: 'column',
    content: 'block+',
    attrs: {
      width: { default: null },
    },
    parseDOM: [{
      tag: 'div.prosekit-column',
      getAttrs(dom) {
        if (!(dom instanceof HTMLElement)) return false
        const width = dom.style.getPropertyValue('--prosekit-column-width')
          || dom.style.getPropertyValue('width')
        if (!width) return { width: null }
        const value = Number.parseFloat(width)
        return { width: Number.isFinite(value) ? value : null }
      },
    }],
    toDOM(node) {
      const attrs = node.attrs as ColumnAttrs
      const width = attrs.width
      const style = width != null
        ? `--prosekit-column-width:${width}px;width:${width}px;flex:0 0 ${width}px;`
        : null
      return ['div', { class: 'prosekit-column', style }, 0]
    },
  })
}
