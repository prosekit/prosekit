import type { NodeJSON } from '@prosekit/core'
import type { ProseMirrorNode } from '@prosekit/pm/model'
import type { JSX } from 'solid-js'
import { createComponent, Dynamic } from 'solid-js/web'

import { createRenderer } from './renderer.ts'
import type { CustomMappingOptions, DOMOutputSpecArray, DomOutputSpecToElement, StaticRendererOptions } from './types.ts'

export type { CustomMappingOptions, StaticRendererOptions }

type SolidElement = JSX.Element

/**
 * Map HTML attribute names to Solid prop names.
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
 * Create a Solid element using `createComponent` and `Dynamic` from `solid-js/web`.
 */
function createSolidElement(
  tag: string,
  props: Record<string, any>,
  ...children: SolidElement[]
): SolidElement {
  return createComponent(Dynamic, {
    component: tag,
    ...props,
    // SolidJS 推荐使用 getter 传递 children 以保持响应性
    get children() {
      return children
    },
  })
}

/**
 * Convert a ProseMirror DOMOutputSpec to a Solid element renderer.
 */
const domOutputSpecToSolidElement: DomOutputSpecToElement<SolidElement> = (
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
      return () => createSolidElement(tag, mapAttrsToProps(undefined))
    }

    // No attributes, content placeholder is 0
    if (attrs === 0) {
      return (child) => createSolidElement(tag, mapAttrsToProps(undefined), child)
    }

    // Object attrs
    if (typeof attrs === 'object') {
      // attrs is actually an array (child element spec)
      if (Array.isArray(attrs)) {
        const renderChild = domOutputSpecToSolidElement(attrs as DOMOutputSpecArray)

        if (children === undefined) {
          return (child) =>
            createSolidElement(
              tag,
              mapAttrsToProps(undefined),
              renderChild(child),
            )
        }
        if (children === 0) {
          return (child) =>
            createSolidElement(
              tag,
              mapAttrsToProps(undefined),
              renderChild(child),
            )
        }
        return (child) =>
          createSolidElement(
            tag,
            mapAttrsToProps(undefined),
            renderChild(child),
            ...[children]
              .concat(rest)
              .map((s) => domOutputSpecToSolidElement(s)(child)),
          )
      }

      // attrs is an attributes object
      if (children === undefined) {
        return () => createSolidElement(tag, mapAttrsToProps(attrs))
      }
      if (children === 0) {
        return (child) => createSolidElement(tag, mapAttrsToProps(attrs), child)
      }
      return (child) =>
        createSolidElement(
          tag,
          mapAttrsToProps(attrs),
          ...[children]
            .concat(rest)
            .map((s) => domOutputSpecToSolidElement(s)(child)),
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
 * to Solid elements. The renderer can be used multiple times with different
 * content, avoiding repeated schema initialization.
 *
 * @example
 * ```tsx
 * import { createSolidRenderer } from '@prosekit/static-renderer/solid'
 * import { defineExtension } from './my-extension'
 *
 * const render = createSolidRenderer({
 *   extension: defineExtension(),
 * })
 *
 * const element1 = render({
 *   type: 'doc',
 *   content: [
 *     { type: 'paragraph', content: [{ type: 'text', text: 'Hello' }] },
 *   ],
 * })
 * ```
 */
export function createSolidRenderer(
  options: Omit<StaticRendererOptions, 'content'> & CustomMappingOptions<SolidElement>,
): (content: NodeJSON | ProseMirrorNode) => SolidElement {
  return createRenderer<SolidElement>({
    extension: options.extension,
    domOutputSpecToElement: domOutputSpecToSolidElement,
    mapDefinedTypes: {
      doc: ({ children }) => children,
      text: ({ node }) => node.text ?? '',
    },
    nodeMapping: options.nodeMapping,
    markMapping: options.markMapping,
    unhandledNode: options.unhandledNode,
    unhandledMark: options.unhandledMark,
  })
}

/**
 * Render a ProseMirror document JSON to a Solid element without creating
 * an editor instance.
 *
 * @example
 * ```tsx
 * import { renderToSolidElement } from '@prosekit/static-renderer/solid'
 * import { defineExtension } from './my-extension'
 *
 * const element = renderToSolidElement({
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
export function renderToSolidElement(
  options: StaticRendererOptions & CustomMappingOptions<SolidElement>,
): SolidElement {
  const render = createSolidRenderer(options)

  if (!options.content) {
    throw new Error(
      '[prosekit error]: content is required for renderToSolidElement. Use createSolidRenderer() if you want to create a reusable renderer.',
    )
  }

  return render(options.content)
}
