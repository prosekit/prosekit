import { union } from '@prosekit/core'

import { defineTableCommands } from './table-commands'
import { defineTablePlugins } from './table-plugins'
import {
  defineTableCellSpec,
  defineTableHeaderCellSpec,
  defineTableRowSpec,
  defineTableSpec,
} from './table-spec'

/**
 * @public
 */
export function defineTable() {
  return union([
    defineTableSpec(),
    defineTableRowSpec(),
    defineTableCellSpec(),
    defineTableHeaderCellSpec(),
    defineTablePlugins(),
    defineTableCommands(),
  ])
}

export {
  defineTableCellSpec,
  defineTableCommands,
  defineTableHeaderCellSpec,
  defineTablePlugins,
  defineTableRowSpec,
  defineTableSpec,
}
