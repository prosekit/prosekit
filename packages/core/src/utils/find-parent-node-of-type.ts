import type { NodeType, ResolvedPos } from '@prosekit/pm/model'

import { findParentNode, type FindParentNodeResult } from './find-parent-node'
import { getNodeType } from './get-node-type'
import { isNodeOfType } from './is-node-type-of'

/**
 * Finds the closest parent node that matches the given node type.
 *
 * @public
 */
export function findParentNodeOfType(
  /**
   * The type of the node to remove.
   */
  types: NodeType | string | Array<NodeType | string>,

  /**
   * The position to start searching from.
   */
  $pos: ResolvedPos,
): FindParentNodeResult | undefined {
  return findParentNode((node) => isNodeOfType({ types, node }), $pos)
}
