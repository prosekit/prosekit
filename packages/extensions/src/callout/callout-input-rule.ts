import type { PlainExtension } from '@prosekit/core'
import { InputRule } from '@prosekit/pm/inputrules'

import { defineInputRule } from '../input-rule/index.ts'

import { CALLOUT_VARIANTS, type CalloutVariant } from './callout-types.ts'

const VARIANTS_ALT = CALLOUT_VARIANTS.join('|')

/**
 * This regex matches `[!NOTE] ` typed at the start of a textblock.
 * It intentionally omits the `> ` prefix because when the user types
 * `> [!NOTE] `, the blockquote input rule fires first (on `> `) and
 * consumes the `> ` text. By the time `[!NOTE] ` is typed, the
 * textblock is already inside a blockquote, so we only need to match
 * the remaining `[!TYPE] ` pattern.
 */
const REGEX = new RegExp(`^\\[!(${VARIANTS_ALT})\\]\\s$`, 'i')

function toVariant(s: string): CalloutVariant {
  const lower = s.toLowerCase()
  if ((CALLOUT_VARIANTS as ReadonlyArray<string>).includes(lower)) {
    return lower as CalloutVariant
  }
  return 'note'
}

/**
 * Converts `[!NOTE] ` typed at the start of a line into a callout node.
 *
 * When the user types the GitHub Alert syntax `> [!NOTE] `, the blockquote
 * input rule fires first (on `> `), consuming the `> ` prefix. This rule
 * then matches the remaining `[!NOTE] ` pattern and replaces the blockquote
 * ancestor with a callout of the appropriate variant.
 */
export function defineCalloutInputRule(): PlainExtension {
  const rule = new InputRule(REGEX, (state, match, start, end) => {
    const variant = toVariant(match[1]!)
    const { tr } = state
    const calloutType = state.schema.nodes.callout

    if (!calloutType) return null

    // Delete the trigger text (e.g. `[!NOTE] `)
    tr.deleteRange(start, end)

    // Figure out if we are currently inside a blockquote (the `> ` prefix
    // would have already triggered the blockquote input rule by now).
    const $start = state.doc.resolve(start)
    const isInsideBlockquote = $start.depth > 0
      && $start.node($start.depth - 1).type.name === 'blockquote'

    if (isInsideBlockquote) {
      // Replace the blockquote node with a callout of the chosen variant.
      const blockquotePos = tr.mapping.map(
        $start.before($start.depth - 1),
      )
      tr.setNodeMarkup(blockquotePos, calloutType, { variant })
    } else {
      // No surrounding blockquote – wrap the textblock directly.
      const blockStart = tr.mapping.map($start.start($start.depth))
      const blockEnd = tr.mapping.map($start.end($start.depth))
      tr.wrap(blockStart, blockEnd, [
        { type: calloutType, attrs: { variant } },
      ])
    }

    return tr
  })

  return defineInputRule(rule)
}
