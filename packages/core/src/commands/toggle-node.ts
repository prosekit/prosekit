import { setBlockType } from '@prosekit/pm/commands'
import { NodeType, type Attrs } from '@prosekit/pm/model'
import { type Command } from '@prosekit/pm/state'

import { getNodeType } from '../utils/get-node-type'
import { isNodeActive } from '../utils/is-node-active'

export interface ToggleNodeOptions {
  type: string | NodeType
  attrs?: Attrs | null
}

export function toggleNode(options: ToggleNodeOptions): Command {
  return (state, dispatch, view) => {
    if (isNodeActive(state, options.type, options.attrs)) {
      const defaultType = state.schema.topNodeType.contentMatch.defaultType
      if (!defaultType) {
        return false
      }
      return setBlockType(defaultType)(state, dispatch, view)
    } else {
      const nodeType = getNodeType(state.schema, options.type)
      return setBlockType(nodeType, options.attrs)(state, dispatch, view)
    }
  }
}
