import type {
  Comment,
  CommentTag,
} from 'typedoc'
import type { MarkdownThemeContext } from 'typedoc-plugin-markdown'

type CommentFunction = (
  this: MarkdownThemeContext,
  model: Comment,
  options?: {
    headingLevel?: number
    showSummary?: boolean
    showTags?: boolean
    showReturns?: boolean
    isTableColumn?: boolean
  },
) => string

export function wrapComment(
  comment: CommentFunction,
): CommentFunction {
  return function(this, model, options) {
    for (const blockTag of model.blockTags) {
      maybePatchBlockTag(blockTag)
    }

    return (comment.call(this, model, options))
  }
}

/**
 * If the `@default` tag is a simple word, we want to just render an inline code
 * instead of a code block. This makes the output more compact.
 */
function maybePatchBlockTag(blockTag: CommentTag): void {
  if (blockTag.tag === '@default') {
    const parts = blockTag.content
    if (parts.length === 1) {
      let part = parts[0]
      if (part.kind === 'code') {
        let text = part.text
        let code = text.match(/^\s*```ts\n(.*)\n```\s*$/)?.[1]
        if (code && !code.includes('\n') && !code.includes(' ') && !code.includes('`')) {
          parts[0] = { kind: 'text', text: '`' + code + '`' }
        }
      }
    }
  }
}
