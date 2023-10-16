import { defineMarkSpec, union } from '@prosekit/core'

/**
 * @public
 */
export function defineCodeSpec() {
  return defineMarkSpec({
    name: 'code',
    parseDOM: [{ tag: 'code' }],
    toDOM() {
      return ['code', 0]
    },
  })
}

/**
 * @public
 */
export function defineCode() {
  return union([defineCodeSpec()])
}
