import type { StaticRendererOptions, CustomMappingOptions } from './types.ts'
import {
  domOutputSpecToHTMLString,
  serializeChildrenToHTMLString,
} from './dom-output-spec.ts'
import { createRenderer } from './renderer.ts'

export type { StaticRendererOptions, CustomMappingOptions }

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
  const render = createRenderer<string>({
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

  return render(options.content)
}

function escapeText(text: string): string {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}
