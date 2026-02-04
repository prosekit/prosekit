import { defineMarkSpec, type Extension } from '@prosekit/core'
import type { Attrs } from '@prosekit/pm/model'

/**
 * @internal
 */
export type CodeSpecExtension = Extension<{
  Marks: {
    code: Attrs
  }
}>

/**
 * @internal
 */
export function defineCodeSpec(): CodeSpecExtension {
  return defineMarkSpec({
    name: 'code',
    parseDOM: [{ tag: 'code' }],
    code: true,
    toDOM() {
      return ['code', 0]
    },
  })
}
