import type { NodeJSON } from '@prosekit/core'
import type { ProseMirrorNode } from '@prosekit/pm/model'

import type { StaticRendererOptions, CustomMappingOptions } from './types.ts'
import {
  domOutputSpecToHTMLString,
  serializeChildrenToHTMLString,
} from './dom-output-spec.ts'
import { createRenderer } from './renderer.ts'

export type { StaticRendererOptions, CustomMappingOptions }

/**
 * Create a reusable renderer function that converts ProseMirror document JSON
 * to HTML strings. The renderer can be used multiple times with different
 * content, avoiding repeated schema initialization.
 *
 * @example
 * ```ts
 * import { createHTMLRenderer } from '@prosekit/static-renderer/html'
 * import { defineExtension } from './my-extension'
 *
 * const render = createHTMLRenderer({
 *   extension: defineExtension(),
 * })
 *
 * const html1 = render({
 *   type: 'doc',
 *   content: [
 *     { type: 'paragraph', content: [{ type: 'text', text: 'Hello' }] },
 *   ],
 * })
 *
 * const html2 = render({
 *   type: 'doc',
 *   content: [
 *     { type: 'paragraph', content: [{ type: 'text', text: 'World' }] },
 *   ],
 * })
 * ```
 */
export function createHTMLRenderer(
  options: Omit<StaticRendererOptions, 'content'> & CustomMappingOptions<string>,
): (content: NodeJSON | ProseMirrorNode) => string {
  return createRenderer<string>({
    extension: options.extension,
    domOutputSpecToElement: domOutputSpecToHTMLString,
    mapDefinedTypes: {
      doc: ({ children }) => serializeChildrenToHTMLString(children),
      text: ({ node }) => escapeText(node.text ?? ''),
    },
    nodeMapping: options.nodeMapping,
    markMapping: options.markMapping,
    unhandledNode: options.unhandledNode,
    unhandledMark: options.unhandledMark,
  })
}

/**
 * Render a ProseMirror document JSON to an HTML string without creating an
 * editor instance.
 *
 * @example
 * ```ts
 * import { renderToHTMLString } from '@prosekit/static-renderer/html'
 * import { defineExtension } from './my-extension'
 *
 * const html = renderToHTMLString({
 *   extension: defineExtension(),
 *   content: {
 *     type: 'doc',
 *     content: [
 *       { type: 'paragraph', content: [{ type: 'text', text: 'Hello World' }] },
 *     ],
 *   },
 * })
 * // => '<p>Hello World</p>'
 * ```
 */
export function renderToHTMLString(
  options: StaticRendererOptions & CustomMappingOptions<string>,
): string {
  const render = createHTMLRenderer(options)

  if (!options.content) {
    throw new Error(
      '[prosekit error]: content is required for renderToHTMLString. Use createHTMLRenderer() if you want to create a reusable renderer.',
    )
  }

  return render(options.content)
}

function escapeText(text: string): string {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}
