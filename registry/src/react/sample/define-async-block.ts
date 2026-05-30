import { defineNodeSpec } from 'prosekit/core'

export function defineAsyncBlock() {
  return defineNodeSpec({
    name: 'asyncBlock',
    group: 'block',
    atom: true,
    isolating: true,
    selectable: true,
    attrs: {
      seed: { default: 'seed-0', validate: 'string' },
    },
    parseDOM: [{
      tag: 'div[data-async-block]',
      getAttrs: (element) => {
        if (typeof element === 'string') {
          return { seed: 'seed-0' }
        }

        return {
          seed: element.getAttribute('data-seed') ?? 'seed-0',
        }
      },
    }],
    toDOM: (node) => {
      return [
        'div',
        {
          'data-async-block': 'true',
          'data-seed': String(node.attrs.seed ?? 'seed-0'),
        },
      ]
    },
  })
}
