import type { DOMOutputSpecArray, DomOutputSpecToElement } from './types.ts'

/**
 * HTML elements that cannot be self-closing and must always have a closing tag.
 */
const NON_SELF_CLOSING_TAGS = new Set([
  'iframe',
  'script',
  'style',
  'title',
  'textarea',
  'div',
  'span',
  'a',
  'button',
])

/**
 * Escape text for HTML text content.
 */
function escapeHTML(value: string): string {
  return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
}

/**
 * Escape values for quoted HTML attributes.
 */
function escapeHTMLAttribute(value: string): string {
  return escapeHTML(value).replaceAll('"', '&quot;')
}

/**
 * Serialize the attributes of a node or mark to an HTML attribute string.
 */
export function serializeAttrsToHTMLString(
  attrs: Record<string, any> | undefined | null,
): string {
  const output = Object.entries(attrs || {})
    .filter(([, value]) => value != null)
    .map(
      ([key, value]) => `${key.split(' ').at(-1)}="${escapeHTMLAttribute(String(value))}"`,
    )
    .join(' ')

  return output ? ` ${output}` : ''
}

/**
 * Serialize children to an HTML string.
 */
export function serializeChildrenToHTMLString(
  children?: string | string[],
): string {
  return ([] as string[])
    .concat(children || '')
    .filter(Boolean)
    .join('')
}

/**
 * Convert a ProseMirror DOMOutputSpec to an HTML string renderer.
 *
 * This takes a DOMOutputSpec (the return value of `toDOM`) and returns a
 * function that renders it to an HTML string, given children content.
 *
 * @example
 * ```ts
 * const spec = ['div', { class: 'foo' }, 0]
 * const render = domOutputSpecToHTMLString(spec)
 * const html = render('Hello') // => '<div class="foo">Hello</div>'
 * ```
 */
export const domOutputSpecToHTMLString: DomOutputSpecToElement<string> = (
  spec,
) => {
  if (typeof spec === 'string') {
    return () => escapeHTML(spec)
  }

  if (typeof spec === 'object' && 'length' in spec) {
    const [otag, attrs, children, ...rest] = spec as DOMOutputSpecArray
    let tag = otag

    // Handle namespaced tags like "http://www.w3.org/2000/svg svg"
    const parts = tag.split(' ')
    if (parts.length > 1) {
      tag = `${parts[1]} xmlns="${parts[0]}"`
    }

    // Self-closing tag: no attrs
    if (attrs === undefined) {
      return () => `<${tag}/>`
    }

    // No attributes, content placeholder is 0
    if (attrs === 0) {
      return (child) => `<${tag}>${serializeChildrenToHTMLString(child)}</${tag}>`
    }

    // Object attrs
    if (typeof attrs === 'object') {
      // attrs is actually an array (child element spec), not attributes
      if (Array.isArray(attrs)) {
        const renderChild = domOutputSpecToHTMLString(attrs as DOMOutputSpecArray)
        if (children === undefined) {
          return (child) => `<${tag}>${renderChild(child)}</${tag}>`
        }
        if (children === 0) {
          return (child) => `<${tag}>${renderChild(child)}</${tag}>`
        }
        return (child) =>
          `<${tag}>${renderChild(child)}${
            [children]
              .concat(rest)
              .map((a) => domOutputSpecToHTMLString(a)(child))
              .join('')
          }</${tag}>`
      }

      // attrs is an attributes object
      if (children === undefined) {
        if (NON_SELF_CLOSING_TAGS.has(tag)) {
          return () => `<${tag}${serializeAttrsToHTMLString(attrs)}></${tag}>`
        }
        return () => `<${tag}${serializeAttrsToHTMLString(attrs)}/>`
      }
      if (children === 0) {
        return (child) => `<${tag}${serializeAttrsToHTMLString(attrs)}>${serializeChildrenToHTMLString(child)}</${tag}>`
      }

      return (child) =>
        `<${tag}${serializeAttrsToHTMLString(attrs)}>${
          [children]
            .concat(rest)
            .map((a) => domOutputSpecToHTMLString(a)(child))
            .join('')
        }</${tag}>`
    }
  }

  throw new Error(
    '[prosekit error]: Unsupported DOMOutputSpec type. Check the `toDOM` method output or implement a custom nodeMapping.',
    { cause: spec },
  )
}
