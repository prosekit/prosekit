import {
  baseKeymap,
  chainCommands,
  createParagraphNear,
  deleteSelection,
  joinTextblockBackward,
  liftEmptyBlock,
  newlineInCode,
  selectAll,
  selectNodeBackward,
} from '@prosekit/pm/commands'
import { splitSplittableBlock } from 'prosemirror-splittable'

import { selectBlockCommand } from '../commands/select-block'
import { withPriority } from '../editor/with-priority'
import type { PlainExtension } from '../types/extension'
import { Priority } from '../types/priority'

import { defineKeymap, type Keymap } from './keymap'

// Replace `splitBlock` with `splitSplittableBlock`
const customEnter = chainCommands(
  newlineInCode,
  createParagraphNear,
  liftEmptyBlock,
  splitSplittableBlock,
)

// Replace `joinBackward` with `joinTextblockBackward`
const customBackspace = chainCommands(
  deleteSelection,
  joinTextblockBackward,
  selectNodeBackward,
)

/**
 * @internal
 */
export type BaseKeymapExtension = PlainExtension

/**
 * @public
 */
export interface BaseKeymapOptions {
  /**
   * The priority of the keymap.
   *
   * @default Priority.low
   */
  priority?: Priority

  /**
   * If `true`, the first `Mod-a` press selects the current block that the
   * cursor is in, and a second press selects the entire document.
   *
   * If `false`, `Mod-a` immediately selects the entire document.
   *
   * @default true
   */
  preferBlockSelection?: boolean
}

/**
 * Defines some basic key bindings.
 *
 * @param options
 *
 * @public
 */
export function defineBaseKeymap({
  priority = Priority.low,
  preferBlockSelection = true,
}: BaseKeymapOptions = {}): BaseKeymapExtension {
  const keymap: Keymap = {
    ...baseKeymap,
    'Mod-a': preferBlockSelection ? chainCommands(selectBlockCommand, selectAll) : selectAll,
    'Enter': customEnter,
    'Backspace': customBackspace,
  }
  return withPriority(defineKeymap(keymap), priority)
}
