import {
  ProseMirrorFragment,
  ProseMirrorNode,
} from '@prosekit/pm/model'

import { ProseKitError } from '../error'

/**
 * @hidden
 *
 * @deprecated
 */
export type NodeContent = ProseMirrorNode | ProseMirrorFragment | NodeContent[]

/**
 * Collects all nodes from a given content.
 *
 * @deprecated Use `collectChildren` instead.
 *
 * @hidden
 */
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
  throw new ProseKitError(`Invalid node content: ${typeof content}`)
}
