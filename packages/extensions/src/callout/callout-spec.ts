import { defineNodeSpec, type Extension } from '@prosekit/core'

import { isCalloutVariant, type CalloutAttrs } from './callout-types.ts'

export type CalloutSpecExtension = Extension<{
  Nodes: {
    callout: CalloutAttrs
  }
}>

export function defineCalloutSpec(): CalloutSpecExtension {
  return defineNodeSpec<'callout', CalloutAttrs>({
    name: 'callout',
    content: 'block+',
    group: 'block',
    defining: true,
    attrs: {
      variant: { default: 'note', validate: 'string' },
      icon: { default: null, validate: 'string|null' },
    },
    parseDOM: [
      {
        tag: 'div[data-callout]',
        contentElement: '[data-callout-content]',
        getAttrs: (element) => {
          if (typeof element === 'string') {
            return { variant: 'note', icon: null }
          }

          const variant = element.getAttribute('data-callout-variant')
          const icon = element.getAttribute('data-callout-icon')

          return {
            variant: isCalloutVariant(variant) ? variant : 'note',
            icon: icon || null,
          } satisfies CalloutAttrs
        },
      },
    ],
    toDOM(node) {
      const attrs = node.attrs as CalloutAttrs
      return [
        'div',
        {
          'data-callout': '',
          'data-callout-variant': attrs.variant,
          'data-callout-icon': attrs.icon || undefined,
        },
        ['div', { 'data-callout-content': '' }, 0],
      ]
    },
  })
}
