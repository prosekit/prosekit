import { toggleMark as baseToggleMark } from '@prosekit/pm/commands'
import type { Attrs, MarkType } from '@prosekit/pm/model'
import type { Command } from '@prosekit/pm/state'

import type { CommandCreator } from '../types/extension-command'
import { getMarkType } from '../utils/get-mark-type'

/**
 * @public
 */
export interface ToggleMarkOptions {
  /**
   * The mark type to toggle.
   */
  type: string | MarkType

  /**
   * The optional attributes to set on the mark.
   */
  attrs?: Attrs | null

  /**
   * Controls whether, when part of the selected range has the mark
   * already and part doesn't, the mark is removed (`true`) or added
   * (`false`).
   *
   * @default false
   */
  removeWhenPresent?: boolean

  /**
   * Whether the command should act on the content of inline nodes marked as
   * [atoms](https://prosemirror.net/docs/ref/#model.NodeSpec.atom) that are
   * completely covered by a selection range.
   *
   * @default true
   */
  enterInlineAtoms?: boolean
}

/**
 * Returns a command that toggles the given mark with the given attributes.
 *
 * @param options
 *
 * @public
 */
export function toggleMark({
  type,
  attrs,
  removeWhenPresent = false,
  enterInlineAtoms = true,
}: ToggleMarkOptions): Command {
  return (state, dispatch, view) => {
    return baseToggleMark(getMarkType(state.schema, type), attrs, {
      removeWhenPresent,
      enterInlineAtoms,
    })(state, dispatch, view)
  }
}

toggleMark satisfies CommandCreator
