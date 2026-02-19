import type { Command } from '@prosekit/pm/state'

import { isInCodeBlock } from './is-in-code-block.ts'

/**
 * @internal
 */
export function withSkipCodeBlock(command: Command): Command {
  return (state, dispatch, view) => {
    if (isInCodeBlock(state.selection)) {
      return false
    }
    return command(state, dispatch, view)
  }
}
