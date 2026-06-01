import type { NodeJSON } from '@prosekit/core'
import type { ProseMirrorNode } from '@prosekit/pm/model'
import { createElement, cloneElement, Fragment, type ReactElement, type ReactNode } from 'react'

import { createRenderer } from './renderer.ts'
import type { CustomMappingOptions, DOMOutputSpecArray, DomOutputSpecToElement, StaticRendererOptions } from './types.ts'

export type { CustomMappingOptions, StaticRendererOptions }

/**
 * Map HTML attribute names to React prop names.
 */
function mapAttrsToReactProps(
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
      result.className = String(value)
    } else if (name === 'style' && typeof value === 'string') {
      // Convert CSS string to React style object
      const styleObj: Record<string, string> = {}
      for (const part of value.split(';')) {
        const colonIndex = part.indexOf(':')
        if (colonIndex === -1) continue
        const styleKey = part.slice(0, colonIndex).trim()
        const styleValue = part.slice(colonIndex + 1).trim()
        if (styleKey && styleValue) {
          const camelCaseKey = styleKey.replaceAll(/-([a-z])/g, (_, c: string) => c.toUpperCase())
          styleObj[camelCaseKey] = styleValue
        }
      }
      result.style = styleObj
    } else if (name === 'checked') {
      result.defaultChecked = value === true || value === 'checked' || value === ''
    } else if (name === 'value') {
      result.defaultValue = String(value)
    } else {
      result[name] = String(value)
    }
  }

  return result
}

/**
 * Add a key to a React element if it doesn't have one.
 */
function addKeyToElement(element: ReactNode, key: number): ReactNode {
  if (element && typeof element === 'object' && 'type' in element && 'props' in element) {
    return cloneElement(element as ReactElement, { key })
  }
  return element
}

/**
 * Convert a ProseMirror DOMOutputSpec to a React element renderer.
 */
const domOutputSpecToReactElement: DomOutputSpecToElement<ReactNode> = (
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
      return () => createElement(tag, mapAttrsToReactProps(undefined, undefined))
    }

    // No attributes, content placeholder is 0
    if (attrs === 0) {
      return (child) => createElement(tag, mapAttrsToReactProps(undefined, undefined), ...(Array.isArray(child) ? child : [child]))
    }

    // Object attrs
    if (typeof attrs === 'object') {
      // attrs is actually an array (child element spec)
      if (Array.isArray(attrs)) {
        const renderChild = domOutputSpecToReactElement(attrs as DOMOutputSpecArray)

        if (children === undefined) {
          return (child) =>
            createElement(
              tag,
              mapAttrsToReactProps(undefined, undefined),
              renderChild(child),
            )
        }
        if (children === 0) {
          return (child) =>
            createElement(
              tag,
              mapAttrsToReactProps(undefined, undefined),
              renderChild(child),
            )
        }
        return (child) => {
          const childElements = [children]
            .concat(rest)
            .map((s, i) => {
              const element = domOutputSpecToReactElement(s)(child)
              return addKeyToElement(element, i)
            })
          return createElement(
            tag,
            mapAttrsToReactProps(undefined, undefined),
            renderChild(child),
            ...childElements,
          )
        }
      }

      // attrs is an attributes object
      if (children === undefined) {
        return () => createElement(tag, mapAttrsToReactProps(attrs))
      }
      if (children === 0) {
        return (child) => createElement(tag, mapAttrsToReactProps(attrs), ...(Array.isArray(child) ? child : [child]))
      }
      return (child) => {
        const childElements = [children]
          .concat(rest)
          .map((s, i) => {
            const element = domOutputSpecToReactElement(s)(child)
            return addKeyToElement(element, i)
          })
        return createElement(
          tag,
          mapAttrsToReactProps(attrs),
          ...childElements,
        )
      }
    }
  }

  throw new Error(
    '[prosekit error]: Unsupported DOMOutputSpec type. Check the `toDOM` method output or implement a custom nodeMapping.',
    { cause: spec },
  )
}

/**
 * Create a reusable renderer function that converts ProseMirror document JSON
 * to React elements. The renderer can be used multiple times with different
 * content, avoiding repeated schema initialization.
 *
 * @example
 * ```tsx
 * import { createReactRenderer } from '@prosekit/static-renderer/react'
 * import { defineExtension } from './my-extension'
 *
 * const render = createReactRenderer({
 *   extension: defineExtension(),
 * })
 *
 * const element1 = render({
 *   type: 'doc',
 *   content: [
 *     { type: 'paragraph', content: [{ type: 'text', text: 'Hello' }] },
 *   ],
 * })
 *
 * const element2 = render({
 *   type: 'doc',
 *   content: [
 *     { type: 'paragraph', content: [{ type: 'text', text: 'World' }] },
 *   ],
 * })
 * ```
 */
export function createReactRenderer(
  options: Omit<StaticRendererOptions, 'content'> & CustomMappingOptions<ReactNode>,
): (content: NodeJSON | ProseMirrorNode) => ReactNode {
  return createRenderer<ReactNode>({
    extension: options.extension,
    domOutputSpecToElement: domOutputSpecToReactElement,
    mapDefinedTypes: {
      doc: ({ children }) => createElement(Fragment, null, ...children),
      text: ({ node }) => node.text ?? '',
    },
    nodeMapping: options.nodeMapping,
    markMapping: options.markMapping,
    unhandledNode: options.unhandledNode,
    unhandledMark: options.unhandledMark,
  })
}

/**
 * Render a ProseMirror document JSON to a React element without creating
 * an editor instance.
 *
 * @example
 * ```tsx
 * import { renderToReactElement } from '@prosekit/static-renderer/react'
 * import { defineExtension } from './my-extension'
 *
 * const element = renderToReactElement({
 *   extension: defineExtension(),
 *   content: {
 *     type: 'doc',
 *     content: [
 *       { type: 'paragraph', content: [{ type: 'text', text: 'Hello World' }] },
 *     ],
 *   },
 * })
 * // => <><p>Hello World</p></>
 * ```
 */
export function renderToReactElement(
  options: StaticRendererOptions & CustomMappingOptions<ReactNode>,
): ReactNode {
  const render = createReactRenderer(options)

  if (!options.content) {
    throw new Error(
      '[prosekit error]: content is required for renderToReactElement. Use createReactRenderer() if you want to create a reusable renderer.',
    )
  }

  return render(options.content)
}
