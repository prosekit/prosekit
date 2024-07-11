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
}) {
  const priority = options?.priority ?? Priority.low
  return withPriority(defineKeymap(customBaseKeymap), priority)
}
