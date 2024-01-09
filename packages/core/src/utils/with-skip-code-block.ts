import type { NodeType } from '@prosekit/pm/model'
import type { Command, Selection } from '@prosekit/pm/state'

function isCodeBlockType(type: NodeType) {
  return type.spec.code && type.isBlock
}

function isInCodeBlock(selection: Selection) {
  return (
    isCodeBlockType(selection.$from.parent.type) ||
    isCodeBlockType(selection.$to.parent.type)
  )
}

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
