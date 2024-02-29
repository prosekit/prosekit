import {
  defineCommands,
  getNodeType,
  insertNode
} from '@prosekit/core'

/**
 * Adds commands for working with `table` nodes.
 *
 * @public
 */
export function defineTableCommands() {
  return defineCommands({
    insertTable: (state) => {
      const text = state.schema.text(' ')
      const tableCell = getNodeType(state.schema, 'table_cell').create(null, text)
      const tableRow = getNodeType(state.schema, 'table_row').create(null, [tableCell, tableCell])

      const table = getNodeType(state.schema, 'table').create(null, [tableRow, tableRow])

      return insertNode({ node: table })
    },
  })
}
