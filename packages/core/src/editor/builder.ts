import {
  Schema,
  type Attrs,
  type Mark,
  type MarkType,
  type NodeType,
  type ProseMirrorNode,
} from '@prosekit/pm/model'
import type { EditorState } from '@prosekit/pm/state'

import { ProseKitError } from '../error'
import { isMarkActive } from '../utils/is-mark-active'
import { isNodeActive } from '../utils/is-node-active'
import { isProseMirrorNode } from '../utils/type-assertion'

export type NodeChild = ProseMirrorNode | string | NodeChild[]

export interface NodeBuilder {
  (attrs: Attrs | null, ...children: NodeChild[]): ProseMirrorNode
  (...children: NodeChild[]): ProseMirrorNode
  isActive(attrs?: Attrs): boolean
}

export interface MarkBuilder {
  (attrs: Attrs | null, ...children: NodeChild[]): ProseMirrorNode[]
  (...children: NodeChild[]): ProseMirrorNode[]
  isActive(attrs?: Attrs): boolean
}

export function createNodeBuilder(
  getState: () => EditorState | null | undefined,
  type: NodeType,
): NodeBuilder {
  const builder = (
    ...args: [Attrs | NodeChild | null | undefined, ...NodeChild[]]
  ) => buildNode(type, args)
  builder.isActive = (attrs?: Attrs) => {
    const state = getState()
    return state ? isNodeActive(state, type, attrs) : false
  }
  return builder
}

export function createMarkBuilder(
  getState: () => EditorState | null | undefined,
  type: MarkType,
): MarkBuilder {
  const builder = (
    ...args: [Attrs | NodeChild | null | undefined, ...NodeChild[]]
  ) => buildMark(type, args)
  builder.isActive = (attrs?: Attrs) => {
    const state = getState()
    return state ? isMarkActive(state, type, attrs) : false
  }
  return builder
}

function buildMark(
  type: MarkType,
  args: [Attrs | NodeChild | null | undefined, ...NodeChild[]],
): ProseMirrorNode[] {
  const [attrs, children] = normalizeArgs(args)
  return flattenChildren(type.schema, children, type.create(attrs))
}

function buildNode(
  type: NodeType,
  args: [Attrs | NodeChild | null | undefined, ...NodeChild[]],
): ProseMirrorNode {
  const [attrs, children] = normalizeArgs(args)
  const node = type.createAndFill(attrs, flattenChildren(type.schema, children))
  if (!node) {
    throw new ProseKitError(`Couldn't create node ${type.name}`)
  }
  return node
}

function flattenChildren(
  schema: Schema,
  children: NodeChild[],
  mark?: Mark,
): Array<ProseMirrorNode> {
  const nodes: Array<ProseMirrorNode> = []

  for (const child of children) {
    if (typeof child === 'string') {
      if (child) {
        nodes.push(schema.text(child, mark ? [mark] : null))
      }
    } else if (Array.isArray(child)) {
      nodes.push(...flattenChildren(schema, child, mark))
    } else if (isProseMirrorNode(child)) {
      nodes.push(mark ? child.mark(mark.addToSet(child.marks)) : child)
    } else {
      throw new ProseKitError(`Invalid node child: ${typeof child}`)
    }
  }

  return nodes
}

function normalizeArgs(
  args: [Attrs | NodeChild | null | undefined, ...NodeChild[]],
): [Attrs | null, NodeChild[]] {
  const [attrs, ...children] = args

  if (isNodeChild(args)) {
    children.unshift(args)
    return [null, children]
  } else if (typeof attrs === 'object') {
    return [attrs, children]
  } else {
    return [null, children]
  }
}

function isNodeChild(
  value: Attrs | NodeChild | null | undefined,
): value is NodeChild {
  if (!value) {
    return false
  }

  return (
    typeof value === 'string' ||
    Array.isArray(value) ||
    isProseMirrorNode(value)
  )
}
