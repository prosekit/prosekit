import { defineNodeSpec } from 'prosekit/core'

/**
 * Defines an atom block node for testing purposes.
 */
export function defineAtomBlock() {
  return defineNodeSpec({
    name: 'atomBlock',
    group: 'block',
    atom: true,
    parseDOM: [{
      tag: 'div[data-atom-block]',
    }],
    toDOM: () => {
      return ['div', { 'data-atom-block': 'true' }, 'atom block']
    },
  })
}
