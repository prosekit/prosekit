import {
  defineNodeSpec,
  type Extension,
} from '@prosekit/core'
import type { Attrs } from '@prosekit/pm/model'

/**
 * @internal
 */
export type HardBreakSpecExtension = Extension<{
  Nodes: {
    hardBreak: Attrs
  }
}>

/**
 * @internal
 */
export function defineHardBreakSpec(): HardBreakSpecExtension {
  return defineNodeSpec({
    name: 'hardBreak',
    inline: true,
    selectable: false,
    leafText: () => '\n',
    group: 'inline',
    parseDOM: [{ tag: 'br' }],
    toDOM() {
      return ['br']
    },
  })
}
