import type { ProseMirrorNode, Schema } from '@prosekit/pm/model'
import { DOMParser, DOMSerializer } from '@prosekit/pm/model'
import { EditorState } from '@prosekit/pm/state'

import type { DOMNode } from '../types/dom-node'
import type { NodeJSON, StateJSON } from '../types/model'

import { getBrowserDocument, getBrowserWindow } from './get-dom-api'

/////////////// JSON <=> State ///////////////

/**
 * Return a JSON object representing this state.
 *
 * @public
 */
export function jsonFromState(state: EditorState): StateJSON {
  return state.toJSON() as StateJSON
}

/**
 * Parse a JSON object to a ProseMirror state.
 *
 * @public
 */
export function stateFromJSON(json: StateJSON, schema: Schema): EditorState {
  return EditorState.fromJSON({ schema }, json)
}

/////////////// JSON <=> Node ///////////////

/**
 * Return a JSON object representing this node.
 *
 * @public
 */
export function jsonFromNode(node: ProseMirrorNode): NodeJSON {
  return node.toJSON() as NodeJSON
}

/**
 * Parse a JSON object to a ProseMirror node.
 *
 * @public
 */
export function nodeFromJSON(json: NodeJSON, schema: Schema): ProseMirrorNode {
  return schema.nodeFromJSON(json)
}

/////////////// Node <=> Element ///////////////

/**
 * Parse a HTML element to a ProseMirror node.
 *
 * @public
 */
export function nodeFromElement(
  element: DOMNode,
  schema: Schema,
): ProseMirrorNode {
  return DOMParser.fromSchema(schema).parse(element)
}

/**
 * Serialize a ProseMirror node to a HTML element.
 *
 * @public
 */
export function elementFromNode(
  node: ProseMirrorNode,
  options?: { document?: Document },
): HTMLElement {
  const schema = node.type.schema
  const serializer = DOMSerializer.fromSchema(schema)

  if (schema.topNodeType !== node.type) {
    return serializer.serializeNode(node, options) as HTMLElement
  }

  const doc = getBrowserDocument()
  const div = doc.createElement('div')
  return serializer.serializeFragment(node.content, options, div) as HTMLElement
}

/////////////// Element <=> HTML ///////////////

/**
 * Parse a HTML string to a HTML element.
 *
 * @internal
 */
export function elementFromHTML(
  html: string,
  options?: { document?: Document },
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
 */
export function nodeFromHTML(
  html: string,
  schema: Schema,
  options?: { document?: Document },
): ProseMirrorNode {
  return nodeFromElement(elementFromHTML(html, options), schema)
}

/**
 * Serialize a ProseMirror node to a HTML string
 *
 * @public
 */
export function htmlFromNode(node: ProseMirrorNode): string {
  return elementFromNode(node).outerHTML
}

/////////////// JSON <=> Element ///////////////

/**
 * Serialize a HTML element to a ProseMirror document JSON object.
 *
 * @public
 */
export function jsonFromElement(element: DOMNode, schema: Schema): NodeJSON {
  return jsonFromNode(nodeFromElement(element, schema))
}

/**
 * Parse a ProseMirror document JSON object to a HTML element.
 *
 * @public
 */
export function elementFromJSON(
  json: NodeJSON,
  schema: Schema,
  options?: { document?: Document },
): HTMLElement {
  return elementFromNode(nodeFromJSON(json, schema), options)
}

/////////////// JSON <=> HTML ///////////////

/**
 * Parse a HTML string to a ProseMirror document JSON object.
 *
 * @public
 */
export function jsonFromHTML(
  html: string,
  schema: Schema,
  options?: { document?: Document },
): NodeJSON {
  return jsonFromElement(elementFromHTML(html, options), schema)
}

/**
 * Parse a ProseMirror document JSON object to a HTML string.
 *
 * @public
 */
export function htmlFromJSON(
  json: NodeJSON,
  schema: Schema,
  options?: { document?: Document },
): string {
  return htmlFromElement(elementFromJSON(json, schema, options))
}
