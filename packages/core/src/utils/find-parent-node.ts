import type { NodeType, ResolvedPos } from '@prosekit/pm/model'

export function findParentNode(
  nodeType: NodeType,
  $pos: ResolvedPos,
): { from: number | null; to: number | null } {
  for (let depth = $pos.depth; depth > 0; depth -= 1) {
    const node = $pos.node(depth)

    if (node.type === nodeType) {
      const from = $pos.before(depth)
      const to = $pos.after(depth)
      return {
        from,
        to,
      }
    }
  }

  return {
    from: null,
    to: null,
  }
}
