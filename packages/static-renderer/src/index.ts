/**
 * Static renderer for ProseKit.
 *
 * Render ProseMirror JSON content to HTML, Markdown, or React elements
 * without creating an editor instance.
 *
 * @module
 */

export { createHTMLRenderer, renderToHTMLString } from './html.ts'
export { createMarkdownRenderer, renderToMarkdown } from './markdown.ts'
export { createReactRenderer, renderToReactElement } from './react.ts'
export type { CustomMappingOptions, MarkMapping, MarkProps, NodeMapping, NodeProps, StaticRendererOptions } from './types.ts'
