import { defineNodeSpec, type Extension } from '@prosekit/core'
import type { DOMOutputSpec } from '@prosekit/pm/model'

import type { DetailsAttrs } from './details-types.ts'

function createDetailsParseContent(element: HTMLElement): HTMLElement {
  const wrapper = document.createElement('div')
  let summary: Node | null = null
  let content: HTMLElement | null = null

  for (const child of element.childNodes) {
    if (!(child instanceof HTMLElement)) continue
    if (!summary && child.tagName === 'SUMMARY') {
      summary = child.cloneNode(true)
      continue
    }
    if (!content && child.tagName === 'DIV' && child.getAttribute('data-type') === 'detailsContent') {
      content = child.cloneNode(true) as HTMLElement
    }
  }

  summary ??= document.createElement('summary')
  content ??= document.createElement('div')

  content.setAttribute('data-type', 'detailsContent')

  if (!Array.from(element.children).some(
    (child) => child.tagName === 'DIV' && child.getAttribute('data-type') === 'detailsContent',
  )) {
    for (const child of element.childNodes) {
      if (child.nodeType === Node.ELEMENT_NODE && (child as HTMLElement).tagName === 'SUMMARY') continue
      content.appendChild(child.cloneNode(true))
    }
  }

  if (!content.childNodes.length) {
    content.appendChild(document.createElement('p'))
  }

  wrapper.appendChild(summary)
  wrapper.appendChild(content)
  return wrapper
}

/**
 * @internal
 */
export type DetailsSpecExtension = Extension<{
  Nodes: {
    details: DetailsAttrs
  }
}>

/**
 * Defines the `details` node spec.
 */
export function defineDetailsSpec(): DetailsSpecExtension {
  return defineNodeSpec({
    name: 'details',
    content: 'detailsSummary detailsContent',
    group: 'block',
    defining: true,
    isolating: true,
    attrs: {
      open: { default: false, validate: 'boolean' },
    },
    parseDOM: [
      {
        tag: 'details',
        contentElement: (element) => {
          if (typeof element === 'string') {
            throw new Error('Expected details element when parsing details node')
          }
          return createDetailsParseContent(element)
        },
        getAttrs: (element): DetailsAttrs => {
          if (typeof element === 'string') {
            return { open: false }
          }
          return { open: element.hasAttribute('open') }
        },
      },
    ],
    toDOM(node): DOMOutputSpec {
      const attrs = node.attrs as DetailsAttrs
      return ['details', attrs.open ? { open: '' } : {}, 0]
    },
  })
}
