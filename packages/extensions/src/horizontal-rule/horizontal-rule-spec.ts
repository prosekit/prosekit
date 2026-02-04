import { defineNodeSpec, type Extension } from '@prosekit/core'
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
    // Wrap the `<hr>` in a `<div>` so that we can make it taller and easier to click.
    toDOM: () => ['div', { class: 'prosekit-horizontal-rule' }, ['hr']],
  })
}
