import { addMark } from '../commands/add-mark'
import { insertNode } from '../commands/insert-node'
import { insertText } from '../commands/insert-text'
import { removeMark } from '../commands/remove-mark'
import { selectAll } from '../commands/select-all'
import { setBlockType } from '../commands/set-block-type'
import { setNodeAttrs } from '../commands/set-node-attrs'
import { wrap } from '../commands/wrap'
import { commandFacet } from '../facets/command'
import { defineFacetPayload } from '../facets/facet-extension'
import { type CommandCreator } from '../types/command'
import { type Extension } from '../types/extension'

export function defineCommands<
  T extends Record<string, CommandCreator> = Record<string, CommandCreator>,
>(
  commands: T,
): Extension<{ COMMAND_ARGS: { [K in keyof T]: Parameters<T[K]> } }> {
  return defineFacetPayload(commandFacet, [commands]) as Extension<{
    COMMAND_ARGS: { [K in keyof T]: Parameters<T[K]> }
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

    wrap,

    setBlockType,

    setNodeAttrs,

    selectAll,

    addMark,

    removeMark,
  })
}
