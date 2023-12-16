import { definePlugin, type Extension } from '@prosekit/core'
import { createHighlightPlugin, type Parser } from 'prosemirror-highlight'

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
}): Extension {
  return definePlugin(
    createHighlightPlugin({ parser, nodeTypes: ['codeBlock'] }),
  )
}
