import type { ContentMatch, NodeType } from '@prosekit/pm/model'

/**
 * @internal
 */
export function defaultBlockAt(match: ContentMatch): NodeType | null {
  for (let i = 0; i < match.edgeCount; i++) {
    const { type } = match.edge(i)
    if (type.isTextblock && !type.hasRequiredAttrs()) return type
  }
  return null
}
