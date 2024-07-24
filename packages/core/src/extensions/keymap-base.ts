import {
  baseKeymap,
  chainCommands,
  createParagraphNear,
  deleteSelection,
  joinTextblockBackward,
  liftEmptyBlock,
  newlineInCode,
  selectNodeBackward,
} from '@prosekit/pm/commands'
import { splitSplittableBlock } from 'prosemirror-splittable'

import { withPriority } from '../editor/with-priority'
import type { PlainExtension } from '../types/extension'
import { Priority } from '../types/priority'

import { defineKeymap } from './keymap'

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

const customBaseKeymap = {
  ...baseKeymap,
  Enter: customEnter,
  Backspace: customBackspace,
}

/**
 * @internal
 */
export type BaseKeymapExtension = PlainExtension

/**
 * Defines some basic key bindings.
 *
 * @public
 */
export function defineBaseKeymap(options?: {
  /**
   * The priority of the keymap.
   *
   * @default Priority.low
   */
  priority?: Priority
}): BaseKeymapExtension {
  const priority = options?.priority ?? Priority.low
  return withPriority(
    defineKeymap(customBaseKeymap),
    priority,
  ) as BaseKeymapExtension
}
