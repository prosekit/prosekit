import type { Parser } from 'prosemirror-highlight'
import { createParser } from 'prosemirror-highlight/shiki'
import type { SpecialLanguage } from 'shiki'

import type { ShikiBundledLanguage, ShikiBundledTheme } from './shiki-bundle'
import { prepareHighlighter } from './shiki-highlighter'

type HighlighterOptions = {
  themes: ShikiBundledTheme[]
  langs: (ShikiBundledLanguage | SpecialLanguage)[]
  langAlias?: Record<string, ShikiBundledLanguage>
}

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
      console.log("createParser", highlighterOptions.themes[0])
      parser = createParser(highlighter, {
        theme: highlighterOptions.themes[0],
      })
    }
    return parser(options)
  }
}
