import type { Command } from '@prosekit/pm/state'

import type { CommandCreator } from '../types/extension-command.ts'

/**
 * @public
 *
 * Options for {@link unsetMark}.
 */
export interface UnsetMarkOptions {
  /**
   * The start position of the document. By default it will be the start position of current selection.
   */
  from?: number

  /**
   * The end position of the document. By default it will be the end position of current selection.
   */
  to?: number
}

/**
 * Returns a command that removes all marks.
 *
 * @public
 */
export function unsetMark(options?: UnsetMarkOptions): Command {
  return (state, dispatch) => {
    const from = options?.from ?? state.selection.from
    const to = options?.to ?? state.selection.to
    if (from > to) return false

    dispatch?.(state.tr.removeMark(from, to))
    return true
  }
}

unsetMark satisfies CommandCreator
