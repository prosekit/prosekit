import type { ProseMirrorNode, Schema } from '@prosekit/pm/model'
import { DOMParser } from '@prosekit/pm/model'

import { ProseKitError } from '../error'
import type { NodeJson } from '../types/model'

import { getBrowserWindow } from './get-dom-api'

/**
 * Parse a HTML element to a ProseMirror node.
 */
export function elementToNode(
  element: HTMLElement,
  schema: Schema,
): ProseMirrorNode {
  return DOMParser.fromSchema(schema).parse(element)
}

/**
 * Parse a HTML element to a ProseMirror document JSON.
 */
export function elementToJSON(element: HTMLElement, schema: Schema): NodeJson {
  return elementToNode(element, schema).toJSON() as NodeJson
}

/**
 * Parse a HTML string to a ProseMirror node.
 */
export function htmlToNode(html: string, schema: Schema): ProseMirrorNode {
  return elementToNode(htmlToElement(html), schema)
}

/**
 * Parse a HTML element to a ProseMirror document JSON.
 */
export function htmlToJSON(html: string, schema: Schema): NodeJson {
  return elementToJSON(htmlToElement(html), schema)
}

/**
 * Parse a HTML string to a HTML element.
 */
function htmlToElement(html: string): HTMLElement {
  const win = getBrowserWindow()
  if (!win) {
    throw new ProseKitError(
      'No Browser Document Found. You can only parse a HTML string in the browser environment.',
    )
  }
  const parser = new win.DOMParser()
  return parser.parseFromString(`<body>${html}</body>`, 'text/html').body
}
