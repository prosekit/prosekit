import { union, type Union } from '@prosekit/core'

import { defineDetailsCommands, type DetailsCommandsExtension } from './details-commands.ts'
import { defineDetailsContentSpec, type DetailsContentSpecExtension } from './details-content-spec.ts'
import { defineDetailsKeymap } from './details-keymap.ts'
import { defineDetailsPlugin } from './details-plugin.ts'
import { defineDetailsSummarySpec, type DetailsSummarySpecExtension } from './details-summary-spec.ts'
import { defineDetailsSpec, type DetailsSpecExtension } from './details-spec.ts'

/**
 * @internal
 */
export type DetailsExtension = Union<
  [
    DetailsSpecExtension,
    DetailsSummarySpecExtension,
    DetailsContentSpecExtension,
    DetailsCommandsExtension,
  ]
>

/**
 * Adds `details`, `detailsSummary`, and `detailsContent` nodes to the editor.
 * This includes the following extensions:
 *
 * - {@link defineDetailsSpec}
 * - {@link defineDetailsSummarySpec}
 * - {@link defineDetailsContentSpec}
 * - {@link defineDetailsCommands}
 * - {@link defineDetailsKeymap}
 * - {@link defineDetailsPlugin}
 */
export function defineDetails(): DetailsExtension {
  return union(
    defineDetailsSpec(),
    defineDetailsSummarySpec(),
    defineDetailsContentSpec(),
    defineDetailsCommands(),
    defineDetailsKeymap(),
    defineDetailsPlugin(),
  )
}
