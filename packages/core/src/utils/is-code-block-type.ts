import type { NodeType } from '@prosekit/pm/model'

/**
 * @internal
 */
export function isCodeBlockType(type: NodeType): boolean {
  return !!(type.spec.code && type.isBlock)
}
