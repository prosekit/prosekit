import { toggleMark as baseToggleMark } from '@prosekit/pm/commands'
import { Attrs, MarkType } from '@prosekit/pm/model'
import { Command } from '@prosekit/pm/state'

import { CommandCreator } from '../types/command'
import { getMarkType } from '../utils/get-mark-type'

export interface ToggleMarkOptions {
  type: string | MarkType
  attrs?: Attrs | null
}

export function toggleMark(options: ToggleMarkOptions): Command {
  return (state, dispatch, view) => {
    return baseToggleMark(
      getMarkType(state.schema, options.type),
      options.attrs,
    )(state, dispatch, view)
  }
}

toggleMark satisfies CommandCreator
