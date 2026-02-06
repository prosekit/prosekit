import type { Attrs, Mark, ProseMirrorNode } from '@prosekit/pm/model'

export function attrsMatch(
  nodeOrMark: ProseMirrorNode | Mark,
  attrs: Attrs,
): boolean {
  const currentAttrs = nodeOrMark.attrs

  for (const [key, value] of Object.entries(attrs)) {
    if (currentAttrs[key] !== value) {
      return false
    }
  }

  return true
}
