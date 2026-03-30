import type { NodeType, Schema } from '@prosekit/pm/model'

import { ProseKitError } from '../error.ts'

/**
 * @internal
 */
export function getNodeType(schema: Schema, type: string | NodeType): NodeType {
  if (typeof type === 'string') {
    const nodeType = schema.nodes[type]
    if (!nodeType) {
      throw new ProseKitError(`Cannot find ProseMirror node type "${type}"`)
    }
    return nodeType
  }
  return type
}
