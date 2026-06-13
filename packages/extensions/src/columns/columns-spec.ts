import { defineNodeSpec, defineNodeView, type Extension } from '@prosekit/core'
import type { ProseMirrorNode } from '@prosekit/pm/model'
import type { ViewMutationRecord } from '@prosekit/pm/view'

import type { ColumnAttrs, ColumnGroupAttrs } from './columns-types.ts'

/**
 * @internal
 */
export type ColumnGroupSpecExtension = Extension<{
  Nodes: {
    columnGroup: ColumnGroupAttrs
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
export type ColumnNodeViewExtension = Extension

/**
 * @internal
 */
export type ColumnGroupNodeViewExtension = Extension

/**
 * Define the `columnGroup` container node spec.
 */
export function defineColumnGroupSpec(): ColumnGroupSpecExtension {
  return defineNodeSpec<'columnGroup', ColumnGroupAttrs>({
    name: 'columnGroup',
    group: 'block',
    content: 'column+',
    parseDOM: [{
      tag: 'div.prosekit-column-group',
    }],
    toDOM(node) {
      const colCount = node.childCount
      return ['div', { class: 'prosekit-column-group', style: `--prosekit-column-group-count: ${colCount};` }, 0]
    },
  })
}

/**
 * Define the `column` child node spec.
 */
export function defineColumnSpec(): ColumnSpecExtension {
  return defineNodeSpec<'column', ColumnAttrs>({
    name: 'column',
    isolating: true,
    content: 'block+',
    attrs: {
      width: { default: null },
    },
    parseDOM: [{
      tag: 'div.prosekit-column',
      getAttrs(dom) {
        const width = dom.style.getPropertyValue('--prosekit-column-width')
          || dom.style.getPropertyValue('flex-grow')
          || (
            dom.style.getPropertyValue('width').trim().endsWith('%')
              ? dom.style.getPropertyValue('width')
              : ''
          )
        if (!width) return { width: null }
        const value = Number.parseFloat(width)
        return { width: Number.isFinite(value) ? value : null }
      },
    }],
    toDOM(node) {
      const attrs = node.attrs as ColumnAttrs
      const width = attrs.width
      const style = width != null
        ? `--prosekit-column-width:${width};`
        : null
      return ['div', { class: 'prosekit-column', style }, 0]
    },
  })
}

/**
 * Apply a column's width attribute to its DOM element as a CSS custom property.
 */
function applyColumnWidth(dom: HTMLElement, node: ProseMirrorNode): void {
  const width = (node.attrs as ColumnAttrs).width
  if (width != null) {
    dom.style.setProperty('--prosekit-column-width', String(width))
  } else {
    dom.style.removeProperty('--prosekit-column-width')
  }
}

/**
 * Sync the `--prosekit-column-group-count` CSS custom property on the column group
 * to match the current number of child columns.
 *
 * Without a node view, ProseMirror only reconciles the container's children
 * when the document changes — the inline `style` written by `toDOM` is not
 * re-applied on structural changes like adding or removing a column.  This
 * keeps the CSS variable in sync so `--gap-deduction` and other formulas that
 * depend on it always reflect the correct count.
 */
function applyColumnGroupCount(dom: HTMLElement, node: ProseMirrorNode): void {
  dom.style.setProperty('--prosekit-column-group-count', String(node.childCount))
}

/**
 * Define a node view for the `column` node.
 *
 * The column resize plugin previews a drag by writing the new width directly to
 * each column's `--prosekit-column-width` style. Without this node view,
 * ProseMirror's `DOMObserver` treats those style mutations as external DOM
 * changes, marks the node dirty, and redraws it from the stored `width`
 * attribute — reverting the preview on every mouse move. The result is a handle
 * that cannot move smoothly and a width that never visibly changes mid-drag.
 *
 * `ignoreMutation` tells ProseMirror to ignore attribute mutations on the
 * column element (the live preview), while content edits still arrive as
 * `childList`/`characterData` mutations and are processed normally. `update`
 * keeps the same DOM element across transactions and re-syncs the width from
 * the node's attributes once the drag is committed.
 */
export function defineColumnNodeView(): ColumnNodeViewExtension {
  return defineNodeView({
    name: 'column',
    constructor: (node) => {
      const dom = document.createElement('div')
      dom.className = 'prosekit-column'
      applyColumnWidth(dom, node)

      return {
        dom,
        contentDOM: dom,
        update: (updatedNode) => {
          if (updatedNode.type.name !== 'column') return false
          applyColumnWidth(dom, updatedNode)
          return true
        },
        ignoreMutation: (record: ViewMutationRecord) => {
          return record.type === 'attributes' && record.target === dom
        },
      }
    },
  })
}

/**
 * Define a node view for the `columnGroup` container.
 *
 * The container's inline `style` sets `--prosekit-column-group-count` via `toDOM`, but
 * ProseMirror does not re-apply container attributes when only children change
 * (e.g. after `addColumnAfter` or `removeColumn`).  This node view keeps the
 * CSS variable in sync whenever the child count changes.
 *
 * `ignoreMutation` prevents the plugin's own style writes (drag preview,
 * handle detection class) from triggering a node update.
 */
export function defineColumnGroupNodeView(): ColumnGroupNodeViewExtension {
  return defineNodeView({
    name: 'columnGroup',
    constructor: (node) => {
      const dom = document.createElement('div')
      dom.className = 'prosekit-column-group'
      applyColumnGroupCount(dom, node)

      return {
        dom,
        contentDOM: dom,
        update: (updatedNode) => {
          if (updatedNode.type.name !== 'columnGroup') return false
          applyColumnGroupCount(dom, updatedNode)
          return true
        },
        ignoreMutation: (record: ViewMutationRecord) => {
          return record.type === 'attributes' && record.target === dom
        },
      }
    },
  })
}
