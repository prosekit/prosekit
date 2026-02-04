import { lift } from '@prosekit/pm/commands'
import type { Attrs, NodeType } from '@prosekit/pm/model'
import type { Command } from '@prosekit/pm/state'

import { isNodeActive } from '../utils/is-node-active'

import { wrap } from './wrap'

export interface ToggleWrapOptions {
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
 * Toggle between wrapping an inactive node with the provided node type, and
 * lifting it up into its parent.
 *
 * @param options
 *
 * @public
 */
export function toggleWrap(options: ToggleWrapOptions): Command {
  const { type, attrs } = options

  return (state, dispatch) => {
    if (isNodeActive(state, type, attrs)) {
      return lift(state, dispatch)
    }

    return wrap({ type, attrs })(state, dispatch)
  }
}
