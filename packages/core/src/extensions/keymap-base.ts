import {
  chainCommands,
  createParagraphNear,
  deleteSelection,
  exitCode,
  joinForward,
  joinTextblockBackward,
  liftEmptyBlock,
  newlineInCode,
  selectAll,
  selectNodeBackward,
  selectNodeForward,
  selectTextblockEnd,
  selectTextblockStart,
} from '@prosekit/pm/commands'
import { splitSplittableBlock } from 'prosemirror-splittable'

import { withPriority } from '../editor/with-priority'
import { Priority } from '../types/priority'
import { isApple } from '../utils/env'

import { defineKeymap, type Keymap } from './keymap'

// Replace `joinBackward` with `joinTextblockBackward`
const backspace = chainCommands(
  deleteSelection,
  joinTextblockBackward,
  selectNodeBackward,
)

// Replace `splitBlock` with `splitSplittableBlock`
const enter = chainCommands(
  newlineInCode,
  createParagraphNear,
  liftEmptyBlock,
  splitSplittableBlock,
)

const del = chainCommands(deleteSelection, joinForward, selectNodeForward)

const pcBaseKeymap: Keymap = {
  Enter: enter,
  'Mod-Enter': exitCode,
  Backspace: backspace,
  'Mod-Backspace': backspace,
  'Shift-Backspace': backspace,
  Delete: del,
  'Mod-Delete': del,
  'Mod-a': selectAll,
}

const macBseKeymap: Keymap = {
  'Ctrl-h': pcBaseKeymap['Backspace'],
  'Alt-Backspace': pcBaseKeymap['Mod-Backspace'],
  'Ctrl-d': pcBaseKeymap['Delete'],
  'Ctrl-Alt-Backspace': pcBaseKeymap['Mod-Delete'],
  'Alt-Delete': pcBaseKeymap['Mod-Delete'],
  'Alt-d': pcBaseKeymap['Mod-Delete'],
  'Ctrl-a': selectTextblockStart,
  'Ctrl-e': selectTextblockEnd,
}

const baseKeymap = isApple ? { ...pcBaseKeymap, ...macBseKeymap } : pcBaseKeymap

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
  return withPriority(defineKeymap(baseKeymap), priority)
}
