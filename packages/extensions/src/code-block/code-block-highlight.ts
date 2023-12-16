import { definePlugin } from '@prosekit/core'
import { type Parser, createHighlightPlugin } from 'prosemirror-highlight'

/**
 * @public
 *
 * An alias for the `Parser` type from the `prosemirror-highlight` package.
 */
export type HighlightParser = Parser

/**
 * Adds syntax highlighting to code blocks. This function requires a `Parser`
 * instance from the `prosemirror-highlight` package. See the
 * [documentation](https://github.com/ocavue/prosemirror-highlight) for more
 * information.
 *
 * @public
 */
export function defineCodeBlockHighlight({
  parser,
}: {
  parser: HighlightParser
}) {
  return definePlugin(
    createHighlightPlugin({ parser, nodeTypes: ['codeBlock'] }),
  )
}
