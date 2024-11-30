import {
  addMark,
  type AddMarkOptions,
} from '../commands/add-mark'
import {
  insertDefaultBlock,
  type InsertDefaultBlockOptions,
} from '../commands/insert-default-block'
import {
  insertNode,
  type InsertNodeOptions,
} from '../commands/insert-node'
import {
  insertText,
  type InsertTextOptions,
} from '../commands/insert-text'
import {
  removeMark,
  type RemoveMarkOptions,
} from '../commands/remove-mark'
import {
  removeNode,
  type RemoveNodeOptions,
} from '../commands/remove-node'
import { selectAll } from '../commands/select-all'
import {
  setBlockType,
  type SetBlockTypeOptions,
} from '../commands/set-block-type'
import {
  setNodeAttrs,
  type SetNodeAttrsOptions,
} from '../commands/set-node-attrs'
import {
  toggleWrap,
  type ToggleWrapOptions,
} from '../commands/toggle-wrap'
import {
  unsetBlockType,
  type UnsetBlockTypeOptions,
} from '../commands/unset-block-type'
import {
  unsetMark,
  type UnsetMarkOptions,
} from '../commands/unset-mark'
import {
  wrap,
  type WrapOptions,
} from '../commands/wrap'
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
 * @internal
 */
export type BaseCommandsExtension = Extension<{
  Commands: {
    insertText: [options: InsertTextOptions]
    insertNode: [options: InsertNodeOptions]
    removeNode: [options: RemoveNodeOptions]
    wrap: [options: WrapOptions]
    toggleWrap: [options: ToggleWrapOptions]
    setBlockType: [options: SetBlockTypeOptions]
    setNodeAttrs: [options: SetNodeAttrsOptions]
    insertDefaultBlock: [options?: InsertDefaultBlockOptions]
    selectAll: []
    addMark: [options: AddMarkOptions]
    removeMark: [options: RemoveMarkOptions]
    unsetBlockType: [options?: UnsetBlockTypeOptions]
    unsetMark: [options?: UnsetMarkOptions]
  }
}>

/**
 * Add some base commands
 *
 * @public
 */
export function defineBaseCommands(): BaseCommandsExtension {
  return defineCommands({
    insertText,

    insertNode,

    removeNode,

    wrap,

    toggleWrap,

    setBlockType,

    setNodeAttrs,

    insertDefaultBlock,

    selectAll,

    addMark,

    removeMark,

    unsetBlockType,

    unsetMark,
  })
}
