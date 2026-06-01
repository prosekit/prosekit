import type {
  CustomMappingOptions,
  MarkMapping,
  NodeMapping,
  StaticRendererOptions,
} from './types.ts'
import { renderToHTMLString } from './html.ts'
import { serializeChildrenToHTMLString } from './dom-output-spec.ts'

export type { StaticRendererOptions, CustomMappingOptions }

/**
 * Default node mappings for Markdown rendering.
 */
const defaultMarkdownNodeMapping: NodeMapping<string> = {
  paragraph({ children }) {
    return `\n${serializeChildrenToHTMLString(children)}\n`
  },
  heading({ node, children }) {
    const level = node.attrs.level as number
    return `${'#'.repeat(level)} ${serializeChildrenToHTMLString(children)}\n`
  },
  codeBlock({ node, children }) {
    const language = (node.attrs.language as string) || ''
    return `\n\`\`\`${language}\n${serializeChildrenToHTMLString(children)}\n\`\`\`\n`
  },
  blockquote({ children }) {
    return `\n${serializeChildrenToHTMLString(children)
      .trim()
      .split('\n')
      .map((line) => `> ${line}`)
      .join('\n')}\n`
  },
  bulletList({ children }) {
    return `\n${serializeChildrenToHTMLString(children)}`
  },
  orderedList({ children }) {
    return `\n${serializeChildrenToHTMLString(children)}`
  },
  listItem({ node, children, parent }) {
    if (parent?.type.name === 'orderedList') {
      let number = (parent.attrs.start as number) || 1
      parent.forEach((_child, _offset, index) => {
        if (node === _child) {
          number = index + 1
        }
      })
      return `${number}. ${serializeChildrenToHTMLString(children).trim()}\n`
    }
    return `- ${serializeChildrenToHTMLString(children).trim()}\n`
  },
  hardBreak() {
    return '\n'
  },
  horizontalRule() {
    return '\n---\n'
  },
  image({ node }) {
    const alt = (node.attrs.alt as string) || ''
    const src = (node.attrs.src as string) || ''
    return `![${alt}](${src})`
  },
  table({ children, node }) {
    if (!Array.isArray(children)) {
      return `\n${serializeChildrenToHTMLString(children)}\n`
    }
    const columnCount = node.firstChild?.childCount ?? 0
    const separator = Array.from({ length: columnCount })
      .fill('---')
      .join(' | ')
    // children[0] is the header row, children.slice(1) are body rows
    return `\n${serializeChildrenToHTMLString(children[0])}| ${separator} |\n${serializeChildrenToHTMLString(children.slice(1))}\n`
  },
  tableRow({ children }) {
    if (Array.isArray(children)) {
      return `| ${children.map((c) => serializeChildrenToHTMLString(c).trim()).join(' | ')} |\n`
    }
    return `${serializeChildrenToHTMLString(children)}\n`
  },
  tableHeader({ children }) {
    return serializeChildrenToHTMLString(children).trim()
  },
  tableCell({ children }) {
    return serializeChildrenToHTMLString(children).trim()
  },
}

/**
 * Default mark mappings for Markdown rendering.
 */
const defaultMarkdownMarkMapping: MarkMapping<string> = {
  bold({ children }) {
    return `**${serializeChildrenToHTMLString(children)}**`
  },
  italic({ children }) {
    return `_${serializeChildrenToHTMLString(children)}_`
  },
  code({ children }) {
    return `\`${serializeChildrenToHTMLString(children)}\``
  },
  strike({ children }) {
    return `~~${serializeChildrenToHTMLString(children)}~~`
  },
  underline({ children }) {
    return `<u>${serializeChildrenToHTMLString(children)}</u>`
  },
  subscript({ children }) {
    return `<sub>${serializeChildrenToHTMLString(children)}</sub>`
  },
  superscript({ children }) {
    return `<sup>${serializeChildrenToHTMLString(children)}</sup>`
  },
  link({ mark, children }) {
    const href = (mark.attrs.href as string) || ''
    return `[${serializeChildrenToHTMLString(children)}](${href})`
  },
  highlight({ children }) {
    return `==${serializeChildrenToHTMLString(children)}==`
  },
}

/**
 * Render a ProseMirror document JSON to a Markdown string without creating
 * an editor instance.
 *
 * This reuses the HTML renderer internally, overriding node and mark mappings
 * with Markdown-specific defaults. You can further customize the output by
 * providing your own `nodeMapping` and `markMapping`.
 *
 * @example
 * ```ts
 * import { renderToMarkdown } from '@prosekit/static-renderer/markdown'
 * import { defineExtension } from './my-extension'
 *
 * const markdown = renderToMarkdown({
 *   extension: defineExtension(),
 *   content: {
 *     type: 'doc',
 *     content: [
 *       {
 *         type: 'heading',
 *         attrs: { level: 1 },
 *         content: [{ type: 'text', text: 'Title' }],
 *       },
 *       {
 *         type: 'paragraph',
 *         content: [{ type: 'text', text: 'Hello World' }],
 *       },
 *     ],
 *   },
 * })
 * // => '# Title\n\nHello World\n'
 * ```
 */
export function renderToMarkdown(
  options: StaticRendererOptions & CustomMappingOptions<string>,
): string {
  return renderToHTMLString({
    ...options,
    nodeMapping: {
      ...defaultMarkdownNodeMapping,
      ...options.nodeMapping,
    },
    markMapping: {
      ...defaultMarkdownMarkMapping,
      ...options.markMapping,
    },
  })
}
