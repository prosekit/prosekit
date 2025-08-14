import {
  getMarkType,
  type PlainExtension,
} from '@prosekit/core'
import type {
  MarkType,
  ProseMirrorNode,
} from '@prosekit/pm/model'
import {
  Fragment,
  Slice,
} from '@prosekit/pm/model'

import { definePasteRule } from '../paste-rule'

import { LINK_MARK_RE } from './link-regex'
import type { LinkAttrs } from './link-types'
import { splitTextByRegex } from './split-text-by-regex'

/**
 * @internal
 */
export function defineLinkPasteRule(): PlainExtension {
  return definePasteRule({
    handler: ({ slice, view }) => {
      const linkType = getMarkType(view.state.schema, 'link')
      const newFragment = replaceMarkInFragment(linkType, LINK_MARK_RE, slice.content)
      if (!newFragment) return slice
      return new Slice(newFragment, slice.openStart, slice.openEnd)
    },
  })
}

function replaceMarkInFragment(markType: MarkType, regex: RegExp, fragment: Fragment): Fragment | undefined {
  let changed = false
  let children: ProseMirrorNode[] = []

  for (const child of fragment.content) {
    const newChild = replaceMarkInNode(markType, regex, child)
    if (newChild) {
      changed = true
    }
    children.push(newChild || child)
  }

  if (changed) {
    return Fragment.from(children)
  }

  return
}

function replaceMarkInNode(markType: MarkType, regex: RegExp, node: ProseMirrorNode): ProseMirrorNode | undefined {
  if (node.type.spec.code) {
    return
  }
  if (node.type.isInline) {
    return
  }
  if (node.type.isTextblock) {
    return replaceMarkInTextblockNode(markType, regex, node)
  }

  const newChildren = replaceMarkInFragment(markType, regex, node.content)
  if (!newChildren) {
    return
  }
  return node.copy(newChildren)
}

function replaceMarkInTextblockNode(markType: MarkType, regex: RegExp, node: ProseMirrorNode): ProseMirrorNode | undefined {
  const newChildren: ProseMirrorNode[] = []
  let changed = false

  for (const inlineNode of node.content.content) {
    const newInlineNodes = replaceMarkInInlineNode(markType, regex, inlineNode)
    if (newInlineNodes) {
      changed = true
      newChildren.push(...newInlineNodes)
    } else {
      newChildren.push(inlineNode)
    }
  }
  if (changed) {
    return node.copy(Fragment.from(newChildren))
  }
  return
}

function replaceMarkInInlineNode(markType: MarkType, regex: RegExp, node: ProseMirrorNode): ProseMirrorNode[] | undefined {
  const text = node.text
  if (!text) {
    return
  }

  if (node.marks.some((mark) => mark.type === markType)) {
    return
  }

  // Skip processing if the node has a code mark
  if (node.marks.some((mark) => mark.type.spec.code)) {
    return
  }

  const chunks = splitTextByRegex(text, regex)
  if (!chunks) {
    return
  }

  const schema = node.type.schema

  const nodes: ProseMirrorNode[] = []

  for (const [text, match] of chunks) {
    if (!text) {
      continue
    }
    if (match && match[1]) {
      const mark = markType.create({ href: match[1] } satisfies LinkAttrs)
      nodes.push(schema.text(text, [...node.marks, mark]))
    } else {
      nodes.push(schema.text(text))
    }
  }

  return nodes
}
