import type { NodeType, Schema } from '@prosekit/pm/model'

import { getNodeType } from './get-node-type.ts'

/**
 * @internal
 */
export function getNodeTypes(
  schema: Schema,
  types: string | NodeType | string[] | NodeType[],
): NodeType[] {
  if (Array.isArray(types)) {
    return types.map((type) => getNodeType(schema, type))
  }
  return [getNodeType(schema, types)]
}
