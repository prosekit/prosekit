import { union } from '@prosekit/core'
import type { HLJSApi } from 'highlight.js'

import { defineCodeBlockCommands } from './code-block-commands'
import {
  defineCodeBlockHighlight,
  type HighlightParser,
} from './code-block-highlight'
import { defineCodeBlockHighlightDeprecated } from './code-block-highlight-deprecated'
import { defineCodeBlockInputRule } from './code-block-input-rule'
import { defineCodeBlockSpec } from './code-block-spec'
import type { CodeBlockAttrs } from './code-block-types'

export {
  defineCodeBlockCommands,
  defineCodeBlockHighlight,
  defineCodeBlockInputRule,
  defineCodeBlockSpec,
  type CodeBlockAttrs,
  type HighlightParser,
}

/**
 * Adds `codeBlock` nodes to the editor. This includes the following extensions:
 *
 * - {@link defineCodeBlockSpec}
 * - {@link defineCodeBlockInputRule}
 * - {@link defineCodeBlockCommands}.
 *
 * @public
 */
export function defineCodeBlock(options?: {
  /**
   * @deprecated Use `defineCodeBlockHighlight` function instead.
   */
  hljs?: HLJSApi

  /**
   * A parser for the `prosemirror-highlight` package to use for syntax highlighting.
   *
   * @deprecated Use the standalone `defineCodeBlockHighlight` function instead.
   */
  parser?: HighlightParser
}) {
  const extensions = [
    defineCodeBlockSpec(),
    defineCodeBlockInputRule(),
    defineCodeBlockCommands(),
  ]

  const parser = options?.parser
  if (parser) {
    extensions.push(defineCodeBlockHighlight({ parser }))
  }

  const hljs = options?.hljs
  if (hljs) {
    extensions.push(defineCodeBlockHighlightDeprecated({ hljs }))
  }

  return union(extensions)
}
