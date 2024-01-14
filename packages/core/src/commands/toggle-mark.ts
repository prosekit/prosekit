import { toggleMark as baseToggleMark } from '@prosekit/pm/commands'
import { type Attrs, MarkType } from '@prosekit/pm/model'
import { type Command } from '@prosekit/pm/state'

import { type CommandCreator } from '../types/command'
import { getMarkType } from '../utils/get-mark-type'

/**
 * Returns a command that toggles the given mark with the given attributes.
 *
 * @public
 */
export function toggleMark({
  type,
  attrs,
}: {
  type: string | MarkType
  attrs?: Attrs | null
}): Command {
  return (state, dispatch, view) => {
    return baseToggleMark(getMarkType(state.schema, type), attrs)(
      state,
      dispatch,
      view,
    )
  }
}

toggleMark satisfies CommandCreator
