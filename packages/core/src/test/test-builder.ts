import type { ProseMirrorNode } from '@prosekit/pm/model'

import type { ApplyMarkFunction, CreateNodeFunction } from '../editor/action'
import { assert } from '../utils/assert'

type Tags = Record<string, number>
export type TaggedProseMirrorNode = ProseMirrorNode & { tags?: Tags }

export const createNodeForTest: CreateNodeFunction = (
  type,
  attrs,
  children: TaggedProseMirrorNode[],
): TaggedProseMirrorNode => {
  const tags: Tags = {}
  const isTopNode = type === type.schema.topNodeType
  let pos = isTopNode ? 0 : 1
  const normalizedChildren: TaggedProseMirrorNode[] = []

  for (const child of children) {
    if (child.tags) {
      for (const [key, value] of Object.entries(child.tags)) {
        tags[key] = pos + value
      }
      normalizedChildren.push(child)
      pos += child.nodeSize
    } else if (child.isText) {
      const text = child.text!
      const re = /<(a|b)>/g
      let i = 0
      let out = ''
      for (const match of text.matchAll(re)) {
        out += text.slice(i, match.index)
        tags[match[1]] = pos + out.length
        i = match.index + match[0].length
      }
      out += text.slice(i)
      if (out) {
        normalizedChildren.push(child.type.schema.text(out).mark(child.marks))
        pos += out.length
      }
    } else {
      normalizedChildren.push(child)
      pos += child.nodeSize
    }
  }

  const node: TaggedProseMirrorNode | null = type.createAndFill(
    attrs,
    normalizedChildren,
  )
  assert(node, `Failed to create node ${type.name}`)
  node.tags = tags
  return node
}

export const applyMarkForTest: ApplyMarkFunction = (
  mark,
  children: TaggedProseMirrorNode[],
): TaggedProseMirrorNode[] => {
  return children.map((node) => {
    const newNode: TaggedProseMirrorNode = node.mark(mark.addToSet(node.marks))
    newNode.tags = node.tags
    return newNode
  })
}
