import {
  defineKeymap,
  isAtBlockStart,
  Priority,
  toggleNode,
  unsetBlockType,
  withPriority,
  withSkipCodeBlock,
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
  console.log('backspaceUnsetHeading')
  const $pos = isAtBlockStart(state, view)
  if ($pos?.parent.type.name === 'heading') {
    return unsetBlockType()(state, dispatch, view)
  }
  return false
}

export function defineHeadingKeymap() {
  return withPriority(
    defineKeymap({
      'mod-1': toggleHeadingKeybinding(1),
      'mod-2': toggleHeadingKeybinding(2),
      'mod-3': toggleHeadingKeybinding(3),
      'mod-4': toggleHeadingKeybinding(4),
      'mod-5': toggleHeadingKeybinding(5),
      'mod-6': toggleHeadingKeybinding(6),
      Backspace: backspaceUnsetHeading,
    }),
    Priority.high,
  )
}
