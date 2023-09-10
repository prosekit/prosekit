import { ProseMirrorFragment, ProseMirrorNode } from '@prosekit/pm/model'

export type NodeContent = ProseMirrorNode | ProseMirrorFragment | NodeContent[]

export function collectNodes(content: NodeContent): ProseMirrorNode[] {
  if (Array.isArray(content)) {
    return content.flatMap(collectNodes)
  }
  if (content instanceof ProseMirrorNode) {
    return [content]
  }
  if (content instanceof ProseMirrorFragment) {
    const nodes: ProseMirrorNode[] = []
    for (let i = 0; i < content.childCount; i++) {
      nodes.push(content.child(i))
    }
    return nodes
  }
  throw new Error(`Invalid node content: ${typeof content}`)
}
