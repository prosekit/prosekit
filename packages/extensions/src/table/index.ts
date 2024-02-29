import {
  definePlugin,
  defineNodeSpec,
  union,
} from '@prosekit/core'
// import { Plugin, PluginKey } from '@prosekit/pm/state'

import { tableEditing, columnResizing, tableNodes } from 'prosemirror-tables' // Missing fixTables
// import { ProseMirrorNode } from '@prosekit/pm/model'

import { defineTableCommands } from './table-commands'

const tableNodesSpec = tableNodes({
  tableGroup: 'block',
  cellContent: 'block+',
  cellAttributes: {
    background: {
      default: null,
      getFromDOM(dom) {
        return dom.style.backgroundColor || null
      },
      setDOMAttr(value, attrs) {
        if (value)
          attrs.style = (attrs.style || '') + `background-color: ${value};`
      },
    },
  },
})

export function defineTableSpec() {
  return defineNodeSpec({
    name: 'table',
    ...tableNodesSpec.table
  })
}

export function defineTableHeaderSpec() {
  return defineNodeSpec({
    name: 'table_header',
    ...tableNodesSpec.table_header
  })
}

export function defineTableRowSpec() {
  return defineNodeSpec({
    name: 'table_row',
    ...tableNodesSpec.table_row
  })
}

export function defineTableCellSpec() {
  return defineNodeSpec({
    name: 'table_cell',
    ...tableNodesSpec.table_cell
  })
}

function createColumResizingPlugin(options?: any) {
  return columnResizing()
}

function createTableEditingPlugin(options?: any) {
  return tableEditing({
    allowTableNodeSelection: true
  })
}

/*
function createFixTablesPlugin(options?: any): Plugin {
  return new Plugin({
    key: new PluginKey('fix-table-plugin'),
    props: {
      decorations: (state) => {
        // if (options.strategy === 'doc' && !isDocEmpty(state.doc)) {
        //   return null
        // }

        // if (isInCodeBlock(state.selection)) {
        //   return null
        // }

        console.log(fixTables(state))
        const fix = fixTables(state)
        if (fix) state = state.apply(fix.setMeta('addToHistory', false))
        // const deco = createPlaceholderDecoration(state, placeholderText)
        // if (!deco) {
        //   return null
        // }

        return null // DecorationSet.create(state.doc, [fix])
      },
    },
  })
}
// function isDocEmpty(doc: ProseMirrorNode) {
  return doc.childCount <= 1 && !doc.firstChild?.content.size
}
*/

/**
 * @public
 */
export function defineTable() {
  return union([
    defineTableSpec(),
    defineTableHeaderSpec(),
    defineTableRowSpec(),
    defineTableCellSpec(),
    // fixTables()
    definePlugin(createColumResizingPlugin()),
    definePlugin(createTableEditingPlugin()),
    defineTableCommands()
  ])
}
