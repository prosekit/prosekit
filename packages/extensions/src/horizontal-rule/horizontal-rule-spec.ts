import { type Extension, defineNodeSpec } from '@prosekit/core'
import type { Attrs } from '@prosekit/pm/model'

export type HorizontalRuleSpecExtension = Extension<{
  Nodes: {
    horizontalRule: Attrs
  }
}>

export function defineHorizontalRuleSpec(): HorizontalRuleSpecExtension {
  return defineNodeSpec({
    name: 'horizontalRule',
    group: 'block',
    parseDOM: [{ tag: 'hr' }],
    toDOM: () => ['hr'],
  })
}
