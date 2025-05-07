import type {
  Fragment,
  ProseMirrorNode,
} from '@prosekit/pm/model'

/**
 * Collects all children of a node or a fragment, and returns them as an array.
 *
 * @public
 */
export function collectChildren(
  parent: ProseMirrorNode | Fragment,
): ProseMirrorNode[] {
  const children: ProseMirrorNode[] = []
  for (let i = 0; i < parent.childCount; i++) {
    children.push(parent.child(i))
  }
  return children
}
