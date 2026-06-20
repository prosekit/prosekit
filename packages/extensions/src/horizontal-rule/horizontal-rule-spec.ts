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
    // Match the rendered `<div>` first so attributes added via `defineNodeAttr`
    // (written onto the outer element) round-trip; fall back to a bare `<hr>`
    // for foreign HTML and pasted content.
    parseDOM: [{ tag: 'div.prosekit-horizontal-rule' }, { tag: 'hr' }],
    // Wrap the `<hr>` in a `<div>` so that we can make it taller and easier to click.
    toDOM: () => ['div', { class: 'prosekit-horizontal-rule' }, ['hr']],
  })
}
