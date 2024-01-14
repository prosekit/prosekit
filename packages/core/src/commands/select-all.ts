import { AllSelection, type Command } from '@prosekit/pm/state'

/**
 * Returns a command that selects the whole document.
 * 
 * @public
 */
export function selectAll(): Command {
  return (state, dispatch) => {
    dispatch?.(state.tr.setSelection(new AllSelection(state.doc)))
    return true
  }
}
