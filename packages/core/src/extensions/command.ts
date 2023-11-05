import { addMark } from '../commands/add-mark'
import { insertText } from '../commands/insert-text'
import { removeMark } from '../commands/remove-mark'
import { selectAll } from '../commands/select-all'
import { setBlockType } from '../commands/set-block-type'
import { wrap } from '../commands/wrap'
import { commandFacet } from '../facets/command'
import { type CommandCreator } from '../types/command'
import { type Extension } from '../types/extension'

import { insertNode } from './actions'

export function defineCommands<
  T extends Record<string, CommandCreator> = Record<string, CommandCreator>,
>(
  commands: T,
): Extension<{ COMMAND_ARGS: { [K in keyof T]: Parameters<T[K]> } }> {
  return commandFacet.extension([commands]) satisfies Extension
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

    selectAll,

    addMark,

    removeMark,
  })
}
