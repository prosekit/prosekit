import type { NodeType, ResolvedPos } from '@prosekit/pm/model'

import { findParentNode, type FindParentNodeResult } from './find-parent-node'
import { getNodeType } from './get-node-type'

/**
 * Finds the closest parent node that matches the given node type.
 *
 * @public
 */
export function findParentNodeOfType(
  /**
   * The type of the node to remove.
   */
  type: NodeType | string,

  /**
   * The position to start searching from.
   */
  $pos: ResolvedPos,
): FindParentNodeResult | undefined {
  const nodeType = getNodeType($pos.doc.type.schema, type)
  return findParentNode((node) => node.type === nodeType, $pos)
}
