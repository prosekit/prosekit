import { addMarkSpec, defineExtension } from '@prosekit/core'

/**
 * @public
 */
export function addCodeSpec() {
  return addMarkSpec({
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
export function addCode() {
  return defineExtension([addCodeSpec()])
}
