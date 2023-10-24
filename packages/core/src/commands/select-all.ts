import { AllSelection, type Command } from '@prosekit/pm/state'

export function selectAll(): Command {
  return (state, dispatch) => {
    dispatch?.(state.tr.setSelection(new AllSelection(state.doc)))
    return true
  }
}
