/**
 * Static renderer for ProseKit.
 *
 * Render ProseMirror JSON content to HTML, Markdown, React, Vue, Preact, Solid, or Svelte
 * without creating an editor instance.
 *
 * @module
 */

export { createHTMLRenderer, renderToHTMLString } from './html.ts'
export { createMarkdownRenderer, renderToMarkdown } from './markdown.ts'
export { createPreactRenderer, renderToPreactElement } from './preact.ts'
export { createReactRenderer, renderToReactElement } from './react.ts'
export { createSolidRenderer, renderToSolidElement } from './solid.ts'
export { createSvelteRenderer, renderToSvelteHTML } from './svelte.ts'
export { createVueRenderer, renderToVueElement } from './vue.ts'
export type { CustomMappingOptions, MarkMapping, MarkProps, NodeMapping, NodeProps, StaticRendererOptions } from './types.ts'
