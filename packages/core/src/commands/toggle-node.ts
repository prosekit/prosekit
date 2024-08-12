import { setBlockType } from '@prosekit/pm/commands'
import type { NodeType, Attrs } from '@prosekit/pm/model'
import type { Command } from '@prosekit/pm/state'

import { getNodeType } from '../utils/get-node-type'
import { isNodeActive } from '../utils/is-node-active'

/**
 * @public
 */
export interface ToggleNodeOptions {
  /**
   * The type of the node to toggle.
   */
  type: string | NodeType

  /**
   * The attributes of the node to toggle.
   */
  attrs?: Attrs | null
}

/**
 * Returns a command that set the selected textblocks to the given node type
 * with the given attributes.
 *
 * @param options
 *
 * @public
 */
export function toggleNode({ type, attrs }: ToggleNodeOptions): Command {
  return (state, dispatch, view) => {
    if (isNodeActive(state, type, attrs)) {
      const defaultType = state.schema.topNodeType.contentMatch.defaultType
      if (!defaultType) {
        return false
      }
      return setBlockType(defaultType)(state, dispatch, view)
    } else {
      const nodeType = getNodeType(state.schema, type)
      return setBlockType(nodeType, attrs)(state, dispatch, view)
    }
  }
}
