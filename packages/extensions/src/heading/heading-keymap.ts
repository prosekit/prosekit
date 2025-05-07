import {
  defineKeymap,
  isAtBlockStart,
  toggleNode,
  unsetBlockType,
  withSkipCodeBlock,
  type PlainExtension,
} from '@prosekit/core'
import type { Command } from '@prosekit/pm/state'

function toggleHeadingKeybinding(level: number): Command {
  return withSkipCodeBlock(toggleNode({ type: 'heading', attrs: { level } }))
}

/**
 * Set the block type to default (usually `paragraph`) when pressing Backspace at
 * the start of a heading block.
 */
const backspaceUnsetHeading: Command = (state, dispatch, view) => {
  const $pos = isAtBlockStart(state, view)
  if ($pos?.parent.type.name === 'heading') {
    return unsetBlockType()(state, dispatch, view)
  }
  return false
}

/**
 * @internal
 */
export function defineHeadingKeymap(): PlainExtension {
  return defineKeymap({
    'mod-alt-1': toggleHeadingKeybinding(1),
    'mod-alt-2': toggleHeadingKeybinding(2),
    'mod-alt-3': toggleHeadingKeybinding(3),
    'mod-alt-4': toggleHeadingKeybinding(4),
    'mod-alt-5': toggleHeadingKeybinding(5),
    'mod-alt-6': toggleHeadingKeybinding(6),
    'Backspace': backspaceUnsetHeading,
  })
}
