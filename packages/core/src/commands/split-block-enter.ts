import type { NodeType, ProseMirrorNode } from '@prosekit/pm/model'
import type { Command } from '@prosekit/pm/state'

import { splitBlockAs } from './split-block-as'

export const splitBlockEnter: Command = splitBlockAs((node, deflt, atEnd) => {
  if (atEnd && deflt) {
    const attrs = pickSplittableAttrs(node, deflt)
    if (attrs) {
      return { type: deflt, attrs }
    }
  }

  return null
})

function pickSplittableAttrs(node: ProseMirrorNode, type: NodeType) {
  const attrs: Record<string, unknown> = {}
  let found = false
  for (const [attr, value] of Object.entries(node.attrs)) {
    const spec = type.spec.attrs?.[attr]
    if (spec && spec.default !== value && spec.splittable === true) {
      attrs[attr] = value
      found = true
    }
  }
  return found ? attrs : null
}

declare module '@prosekit/pm/model' {
  export interface AttributeSpec {
    splittable?: boolean
  }
}
