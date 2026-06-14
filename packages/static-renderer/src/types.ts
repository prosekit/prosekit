import type { Extension, NodeJSON } from '@prosekit/core'
import type { Attrs, DOMOutputSpec, Mark, ProseMirrorNode } from '@prosekit/pm/model'

/**
 * Options for the static renderer.
 */
export interface StaticRendererOptions {
  /**
   * The extension to use for building the schema.
   */
  extension: Extension

  /**
   * The content to render. Can be a ProseMirror node or a JSON object.
   * Required for one-shot render functions, optional for create* functions
   * that return a reusable render function.
   */
  content?: NodeJSON | ProseMirrorNode

  /**
   * The Document object to use for DOM operations. If not provided, defaults
   * to the current browser's document object. Useful for server-side rendering.
   */
  document?: Document
}

/**
 * Props passed to node mapping functions.
 */
export interface NodeProps<T> {
  /**
   * The current node to render.
   */
  node: ProseMirrorNode

  /**
   * The parent node, if any.
   */
  parent?: ProseMirrorNode

  /**
   * The rendered children. A single value if one child, an array if multiple.
   */
  children: T | T[]
}

/**
 * Props passed to mark mapping functions.
 */
export interface MarkProps<T> {
  /**
   * The current mark to render.
   */
  mark: Mark

  /**
   * The node this mark is applied to.
   */
  node: ProseMirrorNode

  /**
   * The parent node, if any.
   */
  parent?: ProseMirrorNode

  /**
   * The rendered content wrapped by this mark.
   */
  children: T
}

/**
 * Custom node rendering mappings.
 */
export interface NodeMapping<T> {
  [nodeName: string]: (props: NodeProps<T>) => T
}

/**
 * Custom mark rendering mappings.
 */
export interface MarkMapping<T> {
  [markName: string]: (props: MarkProps<T>) => T
}

/**
 * Options for customizing the rendering of nodes and marks.
 */
export interface CustomMappingOptions<T> {
  /**
   * Custom node rendering mappings. Overrides the default `toDOM` behavior.
   */
  nodeMapping?: NodeMapping<T>

  /**
   * Custom mark rendering mappings. Overrides the default `toDOM` behavior.
   */
  markMapping?: MarkMapping<T>

  /**
   * Fallback handler for nodes without `toDOM` or custom mapping.
   */
  unhandledNode?: (props: NodeProps<T>) => T

  /**
   * Fallback handler for marks without `toDOM` or custom mapping.
   */
  unhandledMark?: (props: MarkProps<T>) => T
}

export type DOMOutputSpecArray =
  | [string]
  | [string, Attrs]
  | [string, 0]
  | [string, Attrs, 0]
  | [string, Attrs, DOMOutputSpecArray | 0]
  | [string, DOMOutputSpecArray]

/**
 * A function that converts a ProseMirror DOMOutputSpec to a target element type.
 */
export type DomOutputSpecToElement<T> = (spec: DOMOutputSpec) => (children?: T | T[]) => T
