import { definePlugin, type Extension } from '@prosekit/core'
import { createHighlightPlugin, type Parser } from 'prosemirror-highlight'

/**
 * @public
 *
 * An alias for the `Parser` type from the `prosemirror-highlight` package.
 */
export type HighlightParser = Parser

/**
 * @public
 */
export type CodeBlockHighlightOptions = {
  parser: HighlightParser
}

/**
 * Adds syntax highlighting to code blocks. This function requires a `Parser`
 * instance from the `prosemirror-highlight` package. See the
 * [documentation](https://github.com/ocavue/prosemirror-highlight) for more
 * information.
 *
 * @param options
 *
 * @public
 */
export function defineCodeBlockHighlight({
  parser,
}: CodeBlockHighlightOptions): Extension {
  return definePlugin(
    createHighlightPlugin({ parser }),
  )
}
