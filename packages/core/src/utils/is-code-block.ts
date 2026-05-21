import type { NodeType } from '@prosekit/pm/model'

export function isCodeBlockType(type: NodeType): boolean {
  return !!(type.spec.code && type.isBlock)
}
