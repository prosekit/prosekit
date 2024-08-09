import type { NodeType, ProseMirrorNode } from '@prosekit/pm/model'

interface NodeEqualsTypeProps {
  types: NodeType | string | Array<NodeType | string>
  node: ProseMirrorNode | null | undefined
}

/**
 * Checks if the type a given `node` has a given `nodeType`.
 */
export function isNodeOfType(props: NodeEqualsTypeProps): boolean {
  const { types, node } = props

  if (!node) {
    return false
  }

  const matches = (type: NodeType | string) =>
    type === node.type || type === node.type.name

  if (Array.isArray(types)) {
    return types.some(matches)
  }

  return matches(types)
}
