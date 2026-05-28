import { defineNodeSpec } from 'prosekit/core'

export interface InputBlockAttrs {
  value?: string | null
}

export function defineInputBlock() {
  return defineNodeSpec({
    name: 'inputBlock',
    group: 'block',
    atom: true,
    isolating: true,
    selectable: true,
    attrs: {
      value: { default: '', validate: 'string' },
    },
    parseDOM: [{
      tag: 'div[data-input-block]',
      getAttrs: (element) => {
        if (typeof element === 'string') {
          return { value: '' }
        }

        return {
          value: element.getAttribute('data-value') ?? '',
        }
      },
    }],
    toDOM: (node) => {
      return [
        'div',
        {
          'data-input-block': 'true',
          'data-value': String(node.attrs.value ?? ''),
        },
      ]
    },
  })
}
