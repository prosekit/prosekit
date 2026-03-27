import type { Parser } from 'prosemirror-highlight'
import { createParser } from 'prosemirror-highlight/shiki'

import type { ShikiBundledLanguage } from './shiki-bundle'
import { createOrGetHighlighter, type HighlighterOptions } from './shiki-highlighter'

/**
 * @internal
 */
export function createLazyParser(
  highlighterOptions: HighlighterOptions,
): Parser {
  let parser: Parser | undefined

  return function lazyParser(options) {
    const language = (options.language || '') as ShikiBundledLanguage
    const { highlighter, promise } = createOrGetHighlighter({
      ...highlighterOptions,
      langs: [language],
    })

    if (!highlighter) {
      return promise
    }

    if (!parser) {
      parser = createParser(highlighter, {
        theme: highlighterOptions.themes[0],
      })
    }
    return parser(options)
  }
}
