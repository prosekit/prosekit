import {
  DOMParser,
  DOMSerializer,
  type ParseOptions,
  type ProseMirrorNode,
  type Schema,
} from '@prosekit/pm/model'
import { EditorState } from '@prosekit/pm/state'

import type { DOMNode } from '../types/dom-node'
import type {
  NodeJSON,
  StateJSON,
} from '../types/model'

import {
  getBrowserDocument,
  getBrowserWindow,
} from './get-dom-api'

/** @public */
export interface DOMParserOptions extends ParseOptions {
  DOMParser?: typeof DOMParser
}

/** @public */
export interface DOMSerializerOptions {
  DOMSerializer?: { fromSchema: typeof DOMSerializer.fromSchema }
}

/** @public */
export interface DOMDocumentOptions {
  /**
   * The Document object to use for DOM operations. If not provided, defaults to
   * the current browser's document object. Useful for server-side rendering or
   * testing environments.
   */
  document?: Document
}

/** @public */
export interface JSONParserOptions {
  /**
   * The editor schema to use.
   */
  schema: Schema
}

/////////////// JSON <=> State ///////////////

/**
 * Return a JSON object representing this state.
 *
 * @public
 *
 * @example
 *
 * ```ts
 * const state = editor.state
 * const json = jsonFromState(state)
 * ```
 */
export function jsonFromState(state: EditorState): StateJSON {
  return state.toJSON() as StateJSON
}

/**
 * Parse a JSON object to a ProseMirror state.
 *
 * @public
 *
 * @example
 *
 * ```ts
 * const json = { state: { type: 'doc', content: [{ type: 'paragraph' }], selection: { type: 'text', from: 1, to: 1 } } }
 * const state = stateFromJSON(json, { schema: editor.schema })
 * ```
 */
export function stateFromJSON(
  json: StateJSON,
  options: JSONParserOptions,
): EditorState {
  return EditorState.fromJSON({ schema: options.schema }, json)
}

/////////////// JSON <=> Node ///////////////

/**
 * Return a JSON object representing this node.
 *
 * @public
 *
 * @example
 *
 * ```ts
 * const node = editor.state.doc
 * const json = jsonFromNode(node)
 * ```
 */
export function jsonFromNode(node: ProseMirrorNode): NodeJSON {
  return node.toJSON() as NodeJSON
}

/**
 * Parse a JSON object to a ProseMirror node.
 *
 * @public
 *
 * @example
 *
 * ```ts
 * const json = { type: 'doc', content: [{ type: 'paragraph' }] }
 * const node = nodeFromJSON(json, { schema: editor.schema })
 * ```
 */
export function nodeFromJSON(
  json: NodeJSON,
  options: JSONParserOptions,
): ProseMirrorNode {
  return options.schema.nodeFromJSON(json)
}

/////////////// Node <=> Element ///////////////

/**
 * Parse a HTML element to a ProseMirror node.
 *
 * @public
 *
 * @example
 *
 * ```ts
 * const element = document.getElementById('content')
 * const node = nodeFromElement(element, { schema: editor.schema })
 * ```
 */
export function nodeFromElement(
  element: DOMNode,
  options: DOMParserOptions & JSONParserOptions,
): ProseMirrorNode {
  const { DOMParser: CustomDOMParser, schema, ...parseOptions } = options
  return (CustomDOMParser || DOMParser)
    .fromSchema(schema)
    .parse(element, parseOptions)
}

/**
 * Serialize a ProseMirror node to a HTML element.
 *
 * @public
 *
 * @example
 *
 * ```ts
 * const node = editor.state.doc
 * const element = elementFromNode(node)
 * ```
 */
export function elementFromNode(
  node: ProseMirrorNode,
  options?: DOMSerializerOptions & DOMDocumentOptions,
): HTMLElement {
  const Serializer = options?.DOMSerializer || DOMSerializer
  const document = getBrowserDocument(options)
  const schema = node.type.schema
  const serializer = Serializer.fromSchema(schema)

  if (schema.topNodeType !== node.type) {
    return serializer.serializeNode(node, { document }) as HTMLElement
  } else {
    return serializer.serializeFragment(
      node.content,
      { document },
      document.createElement('div'),
    ) as HTMLElement
  }
}

/////////////// Element <=> HTML ///////////////

/**
 * Parse a HTML string to a HTML element.
 *
 * @internal
 */
export function elementFromHTML(
  html: string,
  options?: DOMDocumentOptions,
): HTMLElement {
  const win = getBrowserWindow(options)
  const parser = new win.DOMParser()
  return parser.parseFromString(`<body><div>${html}</div></body>`, 'text/html')
    .body.firstElementChild as HTMLElement
}

/**
 * @internal
 */
export function htmlFromElement(element: HTMLElement): string {
  return element.outerHTML
}

/////////////// Node <=> HTML ///////////////

/**
 * Parse a HTML string to a ProseMirror node.
 *
 * @public
 *
 * @example
 *
 * ```ts
 * const html = '<p>Hello, world!</p>'
 * const node = nodeFromHTML(html, { schema: editor.schema })
 */
export function nodeFromHTML(
  html: string,
  options: DOMParserOptions & JSONParserOptions & DOMDocumentOptions,
): ProseMirrorNode {
  return nodeFromElement(elementFromHTML(html, options), options)
}

/**
 * Serialize a ProseMirror node to a HTML string
 *
 * @public
 *
 * @example
 *
 * ```ts
 * const node = document.getElementById('content')
 * const html = htmlFromNode(node)
 * ```
 */
export function htmlFromNode(
  node: ProseMirrorNode,
  options?: DOMSerializerOptions & DOMDocumentOptions,
): string {
  return elementFromNode(node, options).outerHTML
}

/////////////// JSON <=> Element ///////////////

/**
 * Serialize a HTML element to a ProseMirror document JSON object.
 *
 * @public
 *
 * @example
 *
 * ```ts
 * const element = document.getElementById('content')
 * const json = jsonFromElement(element, { schema: editor.schema })
 * ```
 */
export function jsonFromElement(
  element: DOMNode,
  options: DOMParserOptions & JSONParserOptions,
): NodeJSON {
  return jsonFromNode(nodeFromElement(element, options))
}

/**
 * Parse a ProseMirror document JSON object to a HTML element.
 *
 * @public
 *
 * @example
 *
 * ```ts
 * const json = { type: 'doc', content: [{ type: 'paragraph' }] }
 * const element = elementFromJSON(json, { schema: editor.schema })
 * ```
 */
export function elementFromJSON(
  json: NodeJSON,
  options: JSONParserOptions & DOMSerializerOptions & DOMDocumentOptions,
): HTMLElement {
  return elementFromNode(nodeFromJSON(json, options), options)
}

/////////////// JSON <=> HTML ///////////////

/**
 * Parse a HTML string to a ProseMirror document JSON object.
 *
 * @public
 *
 * @example
 *
 * ```ts
 * const html = '<p>Hello, world!</p>'
 * const json = jsonFromHTML(html, { schema: editor.schema })
 * ```
 */
export function jsonFromHTML(
  html: string,
  options: DOMDocumentOptions & DOMParserOptions & JSONParserOptions,
): NodeJSON {
  return jsonFromElement(elementFromHTML(html, options), options)
}

/**
 * Parse a ProseMirror document JSON object to a HTML string.
 *
 * @public
 *
 * @example
 *
 * ```ts
 * const json = { type: 'doc', content: [{ type: 'paragraph' }] }
 * const html = htmlFromJSON(json, { schema: editor.schema })
 * ```
 */
export function htmlFromJSON(
  json: NodeJSON,
  options: JSONParserOptions & DOMSerializerOptions & DOMDocumentOptions,
): string {
  return htmlFromElement(elementFromJSON(json, options))
}
