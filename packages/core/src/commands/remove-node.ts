import type { NodeType } from '@prosekit/pm/model'
import type { Command } from '@prosekit/pm/state'

import type { CommandCreator } from '../types/extension-command.ts'
import { findParentNodeOfType } from '../utils/find-parent-node-of-type.ts'

/**
 * @public
 */
export interface RemoveNodeOptions {
  /**
   * The type of the node to remove.
   */
  type: string | NodeType

  /**
   * The document position to start searching for the node. By default, it will
   * use the anchor position of current selection.
   */
  pos?: number
}

/**
 * Returns a command to remove the nearest ancestor node of a specific type from the current position.
 *
 * @public
 */
export function removeNode(options: RemoveNodeOptions): Command {
  return (state, dispatch) => {
    const $pos = typeof options.pos === 'number'
      ? state.doc.resolve(options.pos)
      : state.selection.$anchor

    const found = findParentNodeOfType(options.type, $pos)
    if (!found) return false

    const { pos, node } = found
    dispatch?.(state.tr.delete(pos, pos + node.nodeSize))
    return true
  }
}

removeNode satisfies CommandCreator
