import { setBlockType } from '@prosekit/pm/commands'
import { NodeType, type Attrs } from '@prosekit/pm/model'
import { type Command } from '@prosekit/pm/state'

import { getNodeType } from '../utils/get-node-type'
import { isNodeActive } from '../utils/is-node-active'

/**
 * Returns a command that set the selected textblocks to the given node type
 * with the given attributes.
 * 
 * @public
 */
export function toggleNode({
  type,
  attrs,
}: {
  type: string | NodeType
  attrs?: Attrs | null
}): Command {
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
