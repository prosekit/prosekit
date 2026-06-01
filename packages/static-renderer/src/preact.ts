import type { NodeJSON } from '@prosekit/core'
import type { ProseMirrorNode } from '@prosekit/pm/model'
import { Fragment, h, type VNode } from 'preact'

import { createRenderer } from './renderer.ts'
import type { CustomMappingOptions, DOMOutputSpecArray, DomOutputSpecToElement, StaticRendererOptions } from './types.ts'

export type { CustomMappingOptions, StaticRendererOptions }

/**
 * Map HTML attribute names to Preact prop names.
 */
function mapAttrsToProps(
  attrs?: Record<string, any>,
  key?: string,
): Record<string, any> {
  if (!attrs) {
    return key !== undefined ? { key } : {}
  }

  const result: Record<string, any> = key !== undefined ? { key } : {}

  for (const [name, value] of Object.entries(attrs)) {
    if (value == null) continue

    if (name === 'class') {
      result.class = String(value)
    } else if (name === 'style' && typeof value === 'string') {
      result.style = value
    } else {
      result[name] = String(value)
    }
  }

  return result
}

/**
 * Convert a ProseMirror DOMOutputSpec to a Preact VNode renderer.
 */
const domOutputSpecToPreactElement: DomOutputSpecToElement<VNode<any>> = (
  spec,
) => {
  if (typeof spec === 'string') {
    return () => spec
  }

  if (typeof spec === 'object' && 'length' in spec) {
    let [otag, attrs, children, ...rest] = spec as DOMOutputSpecArray
    let tag = otag

    // Handle namespaced tags
    const parts = tag.split(' ')
    if (parts.length > 1) {
      tag = parts[1]
      if (attrs === undefined) {
        attrs = { xmlns: parts[0] }
      } else if (attrs === 0) {
        attrs = { xmlns: parts[0] }
        children = 0
      } else if (typeof attrs === 'object' && !Array.isArray(attrs)) {
        attrs = { ...attrs, xmlns: parts[0] }
      }
    }

    // Self-closing tag
    if (attrs === undefined) {
      return () => h(tag, mapAttrsToProps(undefined, undefined))
    }

    // No attributes, content placeholder is 0
    if (attrs === 0) {
      return (child) => h(tag, mapAttrsToProps(undefined, undefined), child)
    }

    // Object attrs
    if (typeof attrs === 'object') {
      // attrs is actually an array (child element spec)
      if (Array.isArray(attrs)) {
        const renderChild = domOutputSpecToPreactElement(attrs as DOMOutputSpecArray)

        if (children === undefined) {
          return (child) =>
            h(
              tag,
              mapAttrsToProps(undefined, undefined),
              renderChild(child),
            )
        }
        if (children === 0) {
          return (child) =>
            h(
              tag,
              mapAttrsToProps(undefined, undefined),
              renderChild(child),
            )
        }
        return (child) =>
          h(
            tag,
            mapAttrsToProps(undefined, undefined),
            [
              renderChild(child),
              ...[children]
                .concat(rest)
                .map((s) => domOutputSpecToPreactElement(s)(child)),
            ],
          )
      }

      // attrs is an attributes object
      if (children === undefined) {
        return () => h(tag, mapAttrsToProps(attrs))
      }
      if (children === 0) {
        return (child) => h(tag, mapAttrsToProps(attrs), child)
      }
      return (child) =>
        h(
          tag,
          mapAttrsToProps(attrs),
          [children]
            .concat(rest)
            .map((s) => domOutputSpecToPreactElement(s)(child)),
        )
    }
  }

  throw new Error(
    '[prosekit error]: Unsupported DOMOutputSpec type. Check the `toDOM` method output or implement a custom nodeMapping.',
    { cause: spec },
  )
}

/**
 * Create a reusable renderer function that converts ProseMirror document JSON
 * to Preact VNodes. The renderer can be used multiple times with different
 * content, avoiding repeated schema initialization.
 *
 * @example
 * ```tsx
 * import { createPreactRenderer } from '@prosekit/static-renderer/preact'
 * import { defineExtension } from './my-extension'
 *
 * const render = createPreactRenderer({
 *   extension: defineExtension(),
 * })
 *
 * const vnode1 = render({
 *   type: 'doc',
 *   content: [
 *     { type: 'paragraph', content: [{ type: 'text', text: 'Hello' }] },
 *   ],
 * })
 * ```
 */
export function createPreactRenderer(
  options: Omit<StaticRendererOptions, 'content'> & CustomMappingOptions<VNode>,
): (content: NodeJSON | ProseMirrorNode) => VNode {
  return createRenderer<VNode>({
    extension: options.extension,
    domOutputSpecToElement: domOutputSpecToPreactElement,
    mapDefinedTypes: {
      doc: ({ children }) => h(Fragment, null, children),
      text: ({ node }) => h(Fragment, null, node.text),
    },
    nodeMapping: options.nodeMapping,
    markMapping: options.markMapping,
    unhandledNode: options.unhandledNode,
    unhandledMark: options.unhandledMark,
  })
}

/**
 * Render a ProseMirror document JSON to a Preact VNode without creating
 * an editor instance.
 *
 * @example
 * ```tsx
 * import { renderToPreactElement } from '@prosekit/static-renderer/preact'
 * import { defineExtension } from './my-extension'
 *
 * const vnode = renderToPreactElement({
 *   extension: defineExtension(),
 *   content: {
 *     type: 'doc',
 *     content: [
 *       { type: 'paragraph', content: [{ type: 'text', text: 'Hello World' }] },
 *     ],
 *   },
 * })
 * ```
 */
export function renderToPreactElement(
  options: StaticRendererOptions & CustomMappingOptions<VNode>,
): VNode {
  const render = createPreactRenderer(options)

  if (!options.content) {
    throw new Error(
      '[prosekit error]: content is required for renderToPreactElement. Use createPreactRenderer() if you want to create a reusable renderer.',
    )
  }

  return render(options.content)
}
