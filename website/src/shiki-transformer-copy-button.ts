import type { ShikiConfig } from 'astro'
import { isElement } from 'hast-util-is-element'

type ShikiTransformer = NonNullable<ShikiConfig['transformers']>[number]

/**
 * A transformer that adds a copy button to code blocks.
 */
export function transformerCopyButton(): ShikiTransformer {
  return {
    name: 'astro-shiki-transformer-copy-button',
    root(node) {
      if (node.children.length !== 1) {
        throw new Error('[astro-shiki-transformer-copy-button] Expected exactly one child')
      }

      const pre = node.children[0]
      if (!isElement(pre, 'pre')) {
        throw new Error(`[astro-shiki-transformer-copy-button] Expected a <pre> element but got ${JSON.stringify({ ...pre, children: '...' })}`)
      }

      node.children = [
        {
          type: 'element',
          tagName: 'div',
          properties: {
            class: 'astro-code-container not-content',
          },
          children: [
            pre,
            {
              type: 'element',
              tagName: 'code-copy-button',
              properties: {
                'type': 'button',
                'data-code': this.source,
                'title': 'Copy code',
                'aria-label': 'Copy code',
                'class': 'code-copy-button',
              },
              children: [],
            },
          ],
        },
      ]
    },
  }
}
