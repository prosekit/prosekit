import { addMark, type AddMarkOptions } from '../commands/add-mark.ts'
import { insertDefaultBlock, type InsertDefaultBlockOptions } from '../commands/insert-default-block.ts'
import { insertNode, type InsertNodeOptions } from '../commands/insert-node.ts'
import { insertText, type InsertTextOptions } from '../commands/insert-text.ts'
import { removeMark, type RemoveMarkOptions } from '../commands/remove-mark.ts'
import { removeNode, type RemoveNodeOptions } from '../commands/remove-node.ts'
import { selectAll } from '../commands/select-all.ts'
import { selectBlock } from '../commands/select-block.ts'
import { setBlockType, type SetBlockTypeOptions } from '../commands/set-block-type.ts'
import { setNodeAttrsBetween, type SetNodeAttrsBetweenOptions } from '../commands/set-node-attrs-between.ts'
import { setNodeAttrs, type SetNodeAttrsOptions } from '../commands/set-node-attrs.ts'
import { toggleWrap, type ToggleWrapOptions } from '../commands/toggle-wrap.ts'
import { unsetBlockType, type UnsetBlockTypeOptions } from '../commands/unset-block-type.ts'
import { unsetMark, type UnsetMarkOptions } from '../commands/unset-mark.ts'
import { wrap, type WrapOptions } from '../commands/wrap.ts'
import { commandFacet } from '../facets/command.ts'
import { defineFacetPayload } from '../facets/facet-extension.ts'
import type { CommandCreator } from '../types/extension-command.ts'
import type { Extension } from '../types/extension.ts'

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
    setNodeAttrsBetween: [options: SetNodeAttrsBetweenOptions]
    insertDefaultBlock: [options?: InsertDefaultBlockOptions]
    selectAll: []
    selectBlock: []
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

    setNodeAttrsBetween,

    insertDefaultBlock,

    selectAll,

    selectBlock,

    addMark,

    removeMark,

    unsetBlockType,

    unsetMark,
  })
}
