import type { NodeJSON } from '@prosekit/core'
import type { ProseMirrorNode } from '@prosekit/pm/model'

import { createHTMLRenderer } from './html.ts'
import type { CustomMappingOptions, StaticRendererOptions } from './types.ts'

export type { CustomMappingOptions, StaticRendererOptions }

/**
 * Create a reusable renderer function that converts ProseMirror document JSON
 * to HTML strings for use with Svelte's `{@html ...}` directive.
 *
 * Since Svelte components are compiled, this renderer returns HTML strings
 * that can be directly used in Svelte templates.
 *
 * @example
 * ```svelte
 * <script>
 * import { createSvelteRenderer } from '@prosekit/static-renderer/svelte'
 * import { defineExtension } from './extension'
 *
 * const render = createSvelteRenderer({
 *   extension: defineExtension(),
 * })
 *
 * const content = {
 *   type: 'doc',
 *   content: [
 *     { type: 'paragraph', content: [{ type: 'text', text: 'Hello' }] },
 *   ],
 * }
 *
 * const html = render(content)
 * </script>
 *
 * <div>{@html html}</div>
 * ```
 */
export function createSvelteRenderer(
  options: Omit<StaticRendererOptions, 'content'> & CustomMappingOptions<string>,
): (content: NodeJSON | ProseMirrorNode) => string {
  return createHTMLRenderer(options)
}

/**
 * Render a ProseMirror document JSON to an HTML string for use with Svelte's
 * `{@html ...}` directive.
 *
 * Since Svelte components are compiled, this function returns HTML strings
 * that can be directly used in Svelte templates.
 *
 * @example
 * ```svelte
 * <script>
 * import { renderToSvelteHTML } from '@prosekit/static-renderer/svelte'
 * import { defineExtension } from './extension'
 *
 * const html = renderToSvelteHTML({
 *   extension: defineExtension(),
 *   content: {
 *     type: 'doc',
 *     content: [
 *       { type: 'paragraph', content: [{ type: 'text', text: 'Hello World' }] },
 *     ],
 *   },
 * })
 * </script>
 *
 * <div>{@html html}</div>
 * ```
 */
export function renderToSvelteHTML(
  options: StaticRendererOptions & CustomMappingOptions<string>,
): string {
  return createHTMLRenderer(options)(options.content!)
}
