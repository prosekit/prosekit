import type { ProseMirrorNode, Schema } from '@prosekit/pm/model'
import { DOMParser } from '@prosekit/pm/model'
import type { EditorState } from '@prosekit/pm/state'

import { ProseKitError } from '../error'
import type { NodeJson, StateJson } from '../types/model'

import { getBrowserWindow } from './get-dom-api'

/**
 * Parse a HTML element to a ProseMirror node.
 *
 * @public
 */
export function elementToNode(
  element: HTMLElement,
  schema: Schema,
): ProseMirrorNode {
  return DOMParser.fromSchema(schema).parse(element)
}

/**
 * Parse a HTML element to a ProseMirror document JSON.
 *
 * @public
 */
export function elementToNodeJSON(
  element: HTMLElement,
  schema: Schema,
): NodeJson {
  return nodeToJSON(elementToNode(element, schema))
}

/**
 * Parse a HTML string to a ProseMirror node.
 *
 * @public
 */
export function htmlToNode(html: string, schema: Schema): ProseMirrorNode {
  return elementToNode(htmlToElement(html), schema)
}

/**
 * Parse a HTML element to a ProseMirror document JSON.
 *
 * @public
 */
export function htmlToNodeJSON(html: string, schema: Schema): NodeJson {
  return elementToNodeJSON(htmlToElement(html), schema)
}

/**
 * Parse a HTML string to a HTML element.
 *
 * @internal
 */
export function htmlToElement(html: string): HTMLElement {
  const win = getBrowserWindow()
  if (!win) {
    throw new ProseKitError(
      'No Browser Document Found. You can only parse a HTML string in the browser environment.',
    )
  }
  const parser = new win.DOMParser()
  return parser.parseFromString(`<body>${html}</body>`, 'text/html').body
}

/**
 * Return a JSON object representing this state.
 *
 * @public
 */
export function stateToJSON(state: EditorState): StateJson {
  return state.toJSON() as StateJson
}

/**
 * Return a JSON object representing this node.
 *
 * @public
 */
export function nodeToJSON(node: ProseMirrorNode): NodeJson {
  return node.toJSON() as NodeJson
}
