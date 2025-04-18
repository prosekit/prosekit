import {
  defineKeymap,
  isAtBlockStart,
  toggleWrap,
  type PlainExtension,
} from '@prosekit/core'
import { joinBackward } from '@prosekit/pm/commands'
import type { Command } from '@prosekit/pm/state'

function toggleBlockquoteKeybinding(): Command {
  return toggleWrap({ type: 'blockquote' })
}

function backspaceUnsetBlockquote(): Command {
  return (state, dispatch, view) => {
    const $pos = isAtBlockStart(state, view)
    if ($pos?.node(-1).type.name === 'blockquote') {
      return joinBackward(state, dispatch, view)
    }
    return false
  }
}
/**
 * @internal
 */
export function defineBlockquoteKeymap(): PlainExtension {
  return defineKeymap({
    'mod-shift-b': toggleBlockquoteKeybinding(),
    'Backspace': backspaceUnsetBlockquote(),
  })
}
