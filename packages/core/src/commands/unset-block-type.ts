import { Fragment, Slice } from '@prosekit/pm/model'
import type { Command, Transaction } from '@prosekit/pm/state'
import { ReplaceAroundStep } from '@prosekit/pm/transform'

import type { CommandCreator } from '../types/extension-command'

/**
 * @public
 */
export interface UnsetBlockTypeOptions {
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
 * Returns a command that set the type of all textblocks between the given range
 * to the default type (usually `paragraph`).
 *
 * @public
 */
export function unsetBlockType(options?: UnsetBlockTypeOptions): Command {
  return (state, dispatch) => {
    const from = options?.from ?? state.selection.from
    const to = options?.to ?? state.selection.to
    if (from > to) return false

    const tr = state.tr
    if (unsetTextBlockType(tr, from, to)) {
      dispatch?.(tr)
      return true
    }
    return false
  }
}

function unsetTextBlockType(
  tr: Transaction,
  from: number,
  to: number,
): boolean {
  const mapFrom = tr.steps.length
  tr.doc.nodesBetween(from, to, (node, pos, parent, index): boolean => {
    if (!parent || !node.isTextblock) return true

    const defaultType = parent.contentMatchAt(index).defaultType
    if (
      defaultType
      && defaultType.isTextblock
      && node.type !== defaultType
      && defaultType.validContent(node.content)
    ) {
      const mapping = tr.mapping.slice(mapFrom)
      const start = mapping.map(pos, 1)
      const end = mapping.map(pos + node.nodeSize, 1)
      const step = new ReplaceAroundStep(
        start,
        end,
        start + 1,
        end - 1,
        new Slice(Fragment.from(defaultType.create()), 0, 0),
        1,
        true,
      )
      tr.step(step)
    }
    return false
  })
  return tr.steps.length > mapFrom
}

unsetBlockType satisfies CommandCreator
