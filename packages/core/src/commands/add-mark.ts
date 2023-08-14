import { MarkType, type Attrs } from '@prosekit/pm/model'
import { type Command } from '@prosekit/pm/state'

import { type CommandCreator } from '../types/command'
import { getMarkType } from '../utils/get-mark-type'

export interface AddMarkOptions {
  type: string | MarkType
  attrs?: Attrs | null

  /**
   * The start position of the mark. By default it will be the start position of current selection.
   */
  from?: number

  /**
   * The end position of the mark. By default it will be the end position of current selection.
   */
  to?: number
}

export function addMark(options: AddMarkOptions): Command {
  return (state, dispatch) => {
    const mark = getMarkType(state.schema, options.type).create(options.attrs)
    const from = options.from ?? state.selection.from
    const to = options.to ?? state.selection.to
    if (from > to) {
      return false
    }
    dispatch?.(state.tr.addMark(from, to, mark))
    return true
  }
}

addMark satisfies CommandCreator
