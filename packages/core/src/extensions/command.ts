import { addMark } from '../commands/add-mark'
import { insertNode } from '../commands/insert-node'
import { insertText } from '../commands/insert-text'
import { removeMark } from '../commands/remove-mark'
import { removeNode } from '../commands/remove-node'
import { selectAll } from '../commands/select-all'
import { setBlockType } from '../commands/set-block-type'
import { setNodeAttrs } from '../commands/set-node-attrs'
import { unsetBlockType } from '../commands/unset-block-type'
import { unsetMark } from '../commands/unset-mark'
import { wrap } from '../commands/wrap'
import { commandFacet } from '../facets/command'
import { defineFacetPayload } from '../facets/facet-extension'
import type { Extension } from '../types/extension'
import type { CommandCreator } from '../types/extension-command'

export function defineCommands<
  T extends Record<string, CommandCreator> = Record<string, CommandCreator>,
>(
  commands: T,
): Extension<{
  Commands: { [K in keyof T]: Parameters<T[K]> }
}> {
  return defineFacetPayload(commandFacet, [commands]) as Extension<{
    Commands: { [K in keyof T]: Parameters<T[K]> }
  }>
}

/**
 * Add some base commands
 *
 * @public
 */
export function defineBaseCommands() {
  return defineCommands({
    insertText,

    insertNode,

    removeNode,

    wrap,

    setBlockType,

    setNodeAttrs,

    selectAll,

    addMark,

    removeMark,

    unsetBlockType,

    unsetMark,
  })
}
