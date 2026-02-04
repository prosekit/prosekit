import type { Attrs, NodeType } from '@prosekit/pm/model'
import type { Command } from '@prosekit/pm/state'

import { getCustomSelection } from '../utils/get-custom-selection'
import { getNodeType } from '../utils/get-node-type'

/**
 * @public
 */
export interface SetBlockTypeOptions {
  type: NodeType | string
  attrs?: Attrs | null
  from?: number
  to?: number
}

/**
 * Returns a command that tries to set the selected textblocks to the given node
 * type with the given attributes.
 *
 * @public
 */
export function setBlockType(options: SetBlockTypeOptions): Command {
  return (state, dispatch) => {
    const nodeType = getNodeType(state.schema, options.type)
    const selection = getCustomSelection(state, options.from, options.to)
    const attrs = options.attrs

    let applicable = false
    for (let i = 0; i < selection.ranges.length && !applicable; i++) {
      const {
        $from: { pos: from },
        $to: { pos: to },
      } = selection.ranges[i]
      state.doc.nodesBetween(from, to, (node, pos) => {
        if (applicable) return false
        if (!node.isTextblock || node.hasMarkup(nodeType, attrs)) return
        if (node.type == nodeType) {
          applicable = true
        } else {
          const $pos = state.doc.resolve(pos),
            index = $pos.index()
          applicable = $pos.parent.canReplaceWith(index, index + 1, nodeType)
        }
      })
    }
    if (!applicable) return false
    if (dispatch) {
      const tr = state.tr
      for (const range of selection.ranges) {
        const {
          $from: { pos: from },
          $to: { pos: to },
        } = range
        tr.setBlockType(from, to, nodeType, attrs)
      }
      dispatch(tr.scrollIntoView())
    }
    return true
  }
}
