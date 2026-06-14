import type { NodeJSON } from '@prosekit/core'
import type { ProseMirrorNode } from '@prosekit/pm/model'
import { h, type VNode, Fragment } from 'vue'

import { createRenderer } from './renderer.ts'
import type { CustomMappingOptions, DOMOutputSpecArray, DomOutputSpecToElement, StaticRendererOptions } from './types.ts'

export type { CustomMappingOptions, StaticRendererOptions }

/**
 * Map HTML attribute names to Vue prop names.
 */
function mapAttrsToProps(
  attrs?: Record<string, any>,
): Record<string, any> {
  if (!attrs) {
    return {}
  }

  const result: Record<string, any> = {}

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
 * Convert a ProseMirror DOMOutputSpec to a Vue VNode renderer.
 */
const domOutputSpecToVueElement: DomOutputSpecToElement<VNode> = (
  spec,
) => {
  if (typeof spec === 'string') {
    return () => spec as any
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
      return () => h(tag, mapAttrsToProps(undefined))
    }

    // No attributes, content placeholder is 0
    if (attrs === 0) {
      return (child) => h(tag, mapAttrsToProps(undefined), child)
    }

    // Object attrs
    if (typeof attrs === 'object') {
      // attrs is actually an array (child element spec)
      if (Array.isArray(attrs)) {
        const renderChild = domOutputSpecToVueElement(attrs as DOMOutputSpecArray)

        if (children === undefined) {
          return (child) =>
            h(
              tag,
              mapAttrsToProps(undefined),
              renderChild(child),
            )
        }
        if (children === 0) {
          return (child) =>
            h(
              tag,
              mapAttrsToProps(undefined),
              renderChild(child),
            )
        }
        return (child) =>
          h(
            tag,
            mapAttrsToProps(undefined),
            [renderChild(child), ...[children]
              .concat(rest)
              .map((s) => domOutputSpecToVueElement(s)(child))],
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
            .map((s) => domOutputSpecToVueElement(s)(child)),
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
 * to Vue VNodes. The renderer can be used multiple times with different
 * content, avoiding repeated schema initialization.
 *
 * @example
 * ```ts
 * import { createVueRenderer } from '@prosekit/static-renderer/vue'
 * import { defineExtension } from './my-extension'
 *
 * const render = createVueRenderer({
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
export function createVueRenderer(
  options: Omit<StaticRendererOptions, 'content'> & CustomMappingOptions<VNode>,
): (content: NodeJSON | ProseMirrorNode) => VNode {
  return createRenderer<VNode>({
    extension: options.extension,
    domOutputSpecToElement: domOutputSpecToVueElement,
    mapDefinedTypes: {
      doc: ({ children }) => h(Fragment, null, children),
      text: ({ node }) => node.text ?? '' as any,
    },
    nodeMapping: options.nodeMapping,
    markMapping: options.markMapping,
    unhandledNode: options.unhandledNode,
    unhandledMark: options.unhandledMark,
  })
}

/**
 * Render a ProseMirror document JSON to a Vue VNode without creating
 * an editor instance.
 *
 * @example
 * ```ts
 * import { renderToVueElement } from '@prosekit/static-renderer/vue'
 * import { defineExtension } from './my-extension'
 *
 * const vnode = renderToVueElement({
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
export function renderToVueElement(
  options: StaticRendererOptions & CustomMappingOptions<VNode>,
): VNode {
  const render = createVueRenderer(options)

  if (!options.content) {
    throw new Error(
      '[prosekit error]: content is required for renderToVueElement. Use createVueRenderer() if you want to create a reusable renderer.',
    )
  }

  return render(options.content)
}
