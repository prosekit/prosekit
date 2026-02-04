import type { NodeType, ResolvedPos } from '@prosekit/pm/model'

import { findParentNode, type FindParentNodeResult } from './find-parent-node'
import { getNodeTypes } from './get-node-types'

/**
 * Finds the closest parent node that matches the given node type.
 *
 * @public
 */
export function findParentNodeOfType(
  /**
   * The type of the node to find.
   */
  type: string | NodeType | string[] | NodeType[],
  /**
   * The position to start searching from.
   */
  $pos: ResolvedPos,
): FindParentNodeResult | undefined {
  const nodeTypes = getNodeTypes($pos.doc.type.schema, type)
  return findParentNode((node) => nodeTypes.includes(node.type), $pos)
}
