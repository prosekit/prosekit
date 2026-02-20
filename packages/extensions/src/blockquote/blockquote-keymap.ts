import { defineKeymap, isAtBlockStart, toggleWrap, type PlainExtension } from '@prosekit/core'
import { joinBackward } from '@prosekit/pm/commands'
import type { Command } from '@prosekit/pm/state'

function toggleBlockquoteKeybinding(): Command {
  return toggleWrap({ type: 'blockquote' })
}

const backspaceUnsetBlockquoteCommand: Command = (state, dispatch, view): boolean => {
  const $pos = isAtBlockStart(state, view)
  if ($pos?.node(-1).type.name === 'blockquote') {
    return joinBackward(state, dispatch, view)
  }
  return false
}

function backspaceUnsetBlockquote(): Command {
  return backspaceUnsetBlockquoteCommand
}
/**
 * @internal
 */
export function defineBlockquoteKeymap(): PlainExtension {
  return defineKeymap({
    'Mod-B': toggleBlockquoteKeybinding(),
    'Backspace': backspaceUnsetBlockquote(),
  })
}
