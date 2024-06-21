import type { Parser } from 'prosemirror-highlight'
import { createParser } from 'prosemirror-highlight/shiki'
import type { Highlighter, SpecialLanguage } from 'shiki'

import type { ShikiBundledLanguage, ShikiBundledTheme } from './shiki-bundle'

type HighlighterOptions = {
  themes: ShikiBundledTheme[]
  langs: (ShikiBundledLanguage | SpecialLanguage)[]
  langAlias?: Record<string, ShikiBundledLanguage>
}

function createHighlighterLoader() {
  let highlighter: Highlighter | undefined

  return function highlighterLoader(
    lang: ShikiBundledLanguage,
    options: HighlighterOptions,
  ): {
    promise?: Promise<void>
    highlighter?: Highlighter
  } {
    if (!highlighter) {
      const promise = import('./shiki-import')
        .then(({ getSingletonHighlighter }) => {
          return getSingletonHighlighter(options)
        })
        .then((h) => {
          highlighter = h
        })
      return { promise }
    }

    if (!highlighter.getLoadedLanguages().includes(lang)) {
      const promise = highlighter.loadLanguage(lang)
      return { promise }
    }

    return { highlighter }
  }
}

/**
 * @internal
 */
export function createLazyParser(
  highlighterOptions: HighlighterOptions,
): Parser {
  let parser: Parser | undefined
  const highlighterLoader = createHighlighterLoader()

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
