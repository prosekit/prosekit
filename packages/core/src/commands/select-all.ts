import { selectAll as selectAllCommand } from '@prosekit/pm/commands'
import type { Command } from '@prosekit/pm/state'

/**
 * Returns a command that selects the whole document.
 *
 * @public
 */
export function selectAll(): Command {
  return selectAllCommand
}
