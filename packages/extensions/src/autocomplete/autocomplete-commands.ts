import type { Command } from '@prosekit/pm/state'

import { setTrMeta } from './autocomplete-helpers.ts'

const scanCommand: Command = (state, dispatch) => {
  dispatch?.(setTrMeta(state.tr, { type: 'scan' }))
  return true
}

/**
 * Returns a command that re-scans the text before the cursor for an autocomplete
 * match and opens the menu if a rule matches.
 *
 * Autocomplete normally only opens while the user is typing. Use this command to
 * open a menu imperatively. It is intended for an empty (cursor) selection.
 */
export function triggerAutocomplete(): Command {
  return scanCommand
}
