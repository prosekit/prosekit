import { defineKeymap, isAtBlockStart, toggleNode, unsetBlockType, withSkipCodeBlock, type PlainExtension } from '@prosekit/core'
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
    'Mod-Alt-1': toggleHeadingKeybinding(1),
    'Mod-Alt-2': toggleHeadingKeybinding(2),
    'Mod-Alt-3': toggleHeadingKeybinding(3),
    'Mod-Alt-4': toggleHeadingKeybinding(4),
    'Mod-Alt-5': toggleHeadingKeybinding(5),
    'Mod-Alt-6': toggleHeadingKeybinding(6),
    'Backspace': backspaceUnsetHeading,
  })
}
