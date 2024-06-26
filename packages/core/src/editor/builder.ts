import {
  Schema,
  type Attrs,
  type Mark,
  type MarkType,
  type NodeType,
  type ProseMirrorNode,
} from '@prosekit/pm/model'
import type { EditorState } from '@prosekit/pm/state'
import { assert } from 'vitest'

import { ProseKitError } from '../error'
import { isMarkActive } from '../utils/is-mark-active'
import { isNodeActive } from '../utils/is-node-active'
import { isProseMirrorNode } from '../utils/type-assertion'

/**
 * @public
 */
export type NodeChild = ProseMirrorNode | string | NodeChild[]

/**
 * @public
 */
export interface NodeBuilder {
  (attrs: Attrs | null, ...children: NodeChild[]): ProseMirrorNode
  (...children: NodeChild[]): ProseMirrorNode
  isActive: (attrs?: Attrs) => boolean
}

/**
 * @public
 */
export interface MarkBuilder {
  (attrs: Attrs | null, ...children: NodeChild[]): ProseMirrorNode[]
  (...children: NodeChild[]): ProseMirrorNode[]
  isActive: (attrs?: Attrs) => boolean
}

/**
 * @internal
 */
export function createNodeBuilders(
  schema: Schema,
  getState: () => EditorState | null | undefined,
  createNode: CreateNodeFunction = defaultCreateNode,
): Record<string, NodeBuilder> {
  const builders: Record<string, NodeBuilder> = {}
  for (const type of Object.values(schema.nodes)) {
    const builder = (
      ...args: [Attrs | NodeChild | null | undefined, ...NodeChild[]]
    ) => buildNode(type, args, createNode)
    builder.isActive = (attrs?: Attrs) => {
      const state = getState()
      return state ? isNodeActive(state, type, attrs) : false
    }
    builders[type.name] = builder
  }
  return builders
}

/**
 * @internal
 */
export function createMarkBuilders(
  schema: Schema,
  getState: () => EditorState | null | undefined,
  applyMark: ApplyMarkFunction = defaultApplyMark,
): Record<string, MarkBuilder> {
  const builders: Record<string, MarkBuilder> = {}
  for (const type of Object.values(schema.marks)) {
    const builder = (
      ...args: [Attrs | NodeChild | null | undefined, ...NodeChild[]]
    ) => buildMark(type, args, applyMark)
    builder.isActive = (attrs?: Attrs) => {
      const state = getState()
      return state ? isMarkActive(state, type, attrs) : false
    }
    builders[type.name] = builder
  }
  return builders
}

function buildMark(
  type: MarkType,
  args: [Attrs | NodeChild | null | undefined, ...NodeChild[]],
  applyMark: ApplyMarkFunction,
): ProseMirrorNode[] {
  const [attrs, children] = normalizeArgs(args)
  const mark = type.create(attrs)
  return applyMark(mark, flattenChildren(type.schema, children))
}

/**
 * @internal
 */
export type ApplyMarkFunction = (
  mark: Mark,
  children: ProseMirrorNode[],
) => ProseMirrorNode[]

const defaultApplyMark: ApplyMarkFunction = (
  mark: Mark,
  children: ProseMirrorNode[],
): ProseMirrorNode[] => {
  return children.map((child) => child.mark([mark]))
}

export function buildNode(
  type: NodeType,
  args: [Attrs | NodeChild | null | undefined, ...NodeChild[]],
  createNode: CreateNodeFunction,
): ProseMirrorNode {
  const [attrs, children] = normalizeArgs(args)
  return createNode(type, attrs, flattenChildren(type.schema, children))
}

/**
 * @internal
 */
export type CreateNodeFunction = (
  type: NodeType,
  attrs: Attrs | null,
  children: ProseMirrorNode[],
) => ProseMirrorNode

const defaultCreateNode: CreateNodeFunction = (
  type: NodeType,
  attrs: Attrs | null,
  children: ProseMirrorNode[],
) => {
  const node = type.createAndFill(attrs, children)
  assert(node, `Failed to create node ${type.name}`)
  return node
}

function flattenChildren(
  schema: Schema,
  children: NodeChild[],
): Array<ProseMirrorNode> {
  const nodes: Array<ProseMirrorNode> = []

  for (const child of children) {
    if (typeof child === 'string') {
      if (child) {
        nodes.push(schema.text(child, null))
      }
    } else if (Array.isArray(child)) {
      nodes.push(...flattenChildren(schema, child))
    } else if (isProseMirrorNode(child)) {
      nodes.push(child)
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
  if (isNodeChild(attrs)) {
    children.unshift(attrs)
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
