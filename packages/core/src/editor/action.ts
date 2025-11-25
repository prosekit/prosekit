import type {
  Attrs,
  Mark,
  MarkType,
  NodeType,
  ProseMirrorNode,
  Schema,
} from '@prosekit/pm/model'
import type { EditorState } from '@prosekit/pm/state'
import mapValues from 'just-map-values'

import { ProseKitError } from '../error'
import type { AnyAttrs } from '../types/attrs'
import { assert } from '../utils/assert'
import { isMarkActive } from '../utils/is-mark-active'
import { isNodeActive } from '../utils/is-node-active'
import { isProseMirrorNode } from '../utils/type-assertion'

/**
 * Available children parameters for {@link NodeAction} and {@link MarkAction}.
 *
 * @public
 */
export type NodeChild = ProseMirrorNode | string | NodeChild[]

/**
 * A function for creating a node with optional attributes and any number of
 * children.
 *
 * It also has a `isActive` method for checking if the node is active in the
 * current editor selection.
 *
 * @public
 */
export interface NodeAction<Attrs extends AnyAttrs = AnyAttrs> {
  /**
   * Creates a node with attributes and any number of children.
   */
  (attrs: Attrs | null, ...children: NodeChild[]): ProseMirrorNode

  /**
   * Creates a node with any number of children.
   */
  (...children: NodeChild[]): ProseMirrorNode

  /**
   * Checks if the node is active in the current editor selection. If the
   * optional `attrs` parameter is provided, it will check if the node is active
   * with the given attributes.
   */
  isActive: (attrs?: Attrs) => boolean
}

/**
 * A function for applying a mark with optional attributes and any number of
 * children.
 *
 * It also has a `isActive` method for checking if the mark is active in the
 * current editor selection.
 *
 * @public
 */
export interface MarkAction<Attrs extends AnyAttrs = AnyAttrs> {
  /**
   * Applies a mark with attributes and any number of children.
   */
  (attrs: Attrs | null, ...children: NodeChild[]): ProseMirrorNode[]

  /**
   * Applies a mark with any number of children.
   */
  (...children: NodeChild[]): ProseMirrorNode[]

  /**
   * Checks if the mark is active in the current editor selection. If the
   * optional `attrs` parameter is provided, it will check if the mark is active
   * with the given attributes.
   */
  isActive: (attrs?: Attrs) => boolean
}

/**
 * @deprecated Use type {@link NodeAction} instead.
 */
export type NodeBuilder = NodeAction

/**
 * @deprecated Use type {@link MarkAction} instead.
 */
export type MarkBuilder = MarkAction

/**
 * @internal
 */
export function createNodeActions(
  schema: Schema,
  getState: GetStateFunction,
  createNode: CreateNodeFunction = defaultCreateNode,
): Record<string, NodeAction> {
  return mapValues(schema.nodes, (type) => createNodeAction(type, getState, createNode))
}

function createNodeAction(
  type: NodeType,
  getState: GetStateFunction,
  createNode: CreateNodeFunction,
): NodeAction {
  const action = (
    ...args: [Attrs | NodeChild | null | undefined, ...NodeChild[]]
  ) => buildNode(type, args, createNode)
  action.isActive = (attrs?: Attrs) => {
    const state = getState()
    return state ? isNodeActive(state, type, attrs) : false
  }
  return action
}

/**
 * @internal
 */
export function createMarkActions(
  schema: Schema,
  getState: GetStateFunction,
  applyMark: ApplyMarkFunction = defaultApplyMark,
): Record<string, MarkAction> {
  return mapValues(schema.marks, (type) => createMarkAction(type, getState, applyMark))
}

function createMarkAction(
  type: MarkType,
  getState: GetStateFunction,
  applyMark: ApplyMarkFunction,
): MarkAction {
  const action = (
    ...args: [Attrs | NodeChild | null | undefined, ...NodeChild[]]
  ) => buildMark(type, args, applyMark)
  action.isActive = (attrs?: Attrs) => {
    const state = getState()
    return state ? isMarkActive(state, type, attrs) : false
  }
  return action
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
  return children.map((node) => node.mark(mark.addToSet(node.marks)))
}

function buildNode(
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

type GetStateFunction = () => EditorState | null | undefined

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
    typeof value === 'string'
    || Array.isArray(value)
    || isProseMirrorNode(value)
  )
}
