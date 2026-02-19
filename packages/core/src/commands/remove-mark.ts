import type { Attrs, MarkType } from '@prosekit/pm/model'
import type { Command } from '@prosekit/pm/state'

import type { CommandCreator } from '../types/extension-command.ts'
import { getMarkType } from '../utils/get-mark-type.ts'

/**
 * @public
 */
export interface RemoveMarkOptions {
  /**
   * The type of the mark to remove.
   */
  type: string | MarkType

  /**
   * If attrs is given, remove precisely the mark with the given attrs. Otherwise, remove all marks of the given type.
   */
  attrs?: Attrs | null

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
 * Returns a command that removes the given mark.
 *
 * @public
 */
export function removeMark(options: RemoveMarkOptions): Command {
  return (state, dispatch) => {
    const markType = getMarkType(state.schema, options.type)
    const mark = options.attrs ? markType.create(options.attrs) : markType
    const from = options.from ?? state.selection.from
    const to = options.to ?? state.selection.to
    if (from > to) {
      return false
    }
    dispatch?.(state.tr.removeMark(from, to, mark))
    return true
  }
}

removeMark satisfies CommandCreator
