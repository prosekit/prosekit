import type { Parser } from 'prosemirror-highlight'
import { createParser } from 'prosemirror-highlight/shiki'

import type { ShikiBundledLanguage } from './shiki-bundle'
import type { HighlighterOptions } from './shiki-highlighter'
import { prepareHighlighter } from './shiki-highlighter'

/**
 * @internal
 */
export function createLazyParser(
  highlighterOptions: HighlighterOptions,
): Parser {
  let parser: Parser | undefined
  prepareHighlighter(highlighterOptions)

  return function lazyParser(options) {
    const language = (options.language || '') as ShikiBundledLanguage
    const { highlighter, promise } = prepareHighlighter({
      langs: [language],
      themes: highlighterOptions.themes,
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
