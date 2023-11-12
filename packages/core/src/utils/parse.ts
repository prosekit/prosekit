import type { ProseMirrorNode, Schema } from '@prosekit/pm/model'
import { DOMParser } from '@prosekit/pm/model'
import type { EditorState } from '@prosekit/pm/state'

import { ProseKitError } from '../error'
import type { NodeJSON, StateJSON } from '../types/model'

import { getBrowserWindow } from './get-dom-api'

/**
 * Parse a HTML element to a ProseMirror node.
 *
 * @public
 */
export function nodeFromElement(
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
export function jsonFromElement(
  element: HTMLElement,
  schema: Schema,
): NodeJSON {
  return jsonFromNode(nodeFromElement(element, schema))
}

/**
 * Parse a HTML string to a ProseMirror node.
 *
 * @public
 */
export function nodeFromHTML(html: string, schema: Schema): ProseMirrorNode {
  return nodeFromElement(elementFromHTML(html), schema)
}

/**
 * Parse a HTML string to a ProseMirror document JSON.
 *
 * @public
 */
export function jsonFromHTML(html: string, schema: Schema): NodeJSON {
  return jsonFromElement(elementFromHTML(html), schema)
}

/**
 * Parse a HTML string to a HTML element.
 *
 * @internal
 */
export function elementFromHTML(html: string): HTMLElement {
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
export function jsonFromState(state: EditorState): StateJSON {
  return state.toJSON() as StateJSON
}

/**
 * Return a JSON object representing this node.
 *
 * @public
 */
export function jsonFromNode(node: ProseMirrorNode): NodeJSON {
  return node.toJSON() as NodeJSON
}
