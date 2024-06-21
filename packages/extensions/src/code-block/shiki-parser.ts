import type { Parser } from 'prosemirror-highlight'
import { createParser } from 'prosemirror-highlight/shiki'
import type { Highlighter, SpecialLanguage } from 'shiki'

import type { ShikiBundledLanguage, ShikiBundledTheme } from './shiki-bundle'
import { getHighlighter } from './shiki-highlighter'

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
  console.log("createLazyParser")
  let parser: Parser | undefined
  const highlighterLoader = getHighlighter(highlighterOptions)

  return function lazyParser(options) {
    const language = (options.language || '') as ShikiBundledLanguage
    const { highlighter, promise } = highlighterLoader(
      language,
      highlighterOptions,
    )

    if (!highlighter) {
      return promise || []
    }

    if (!parser) {
      parser = createParser(highlighter)
    }
    return parser(options)
  }
}
