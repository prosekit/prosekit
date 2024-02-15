import type { Parser } from 'prosemirror-highlight'
import { createParser } from 'prosemirror-highlight/shiki'
import type { Highlighter, SpecialLanguage } from 'shiki'

import type {
  ShikiBundledLanguage,
  ShikiBundledTheme,
} from './shiki-bundle.gen'

type HighlighterOptions = {
  themes: ShikiBundledTheme[]
  langs: (ShikiBundledLanguage | SpecialLanguage)[]
  langAlias?: Record<string, ShikiBundledLanguage>
}

function createHighlighterLoader() {
  let highlighterPromise: Promise<void> | undefined
  let highlighter: Highlighter | undefined

  const loadLangs = new Set<string>()

  return function highlighterLoader(
    lang: ShikiBundledLanguage,
    options: HighlighterOptions,
  ): {
    promise?: Promise<void>
    highlighter?: Highlighter
  } {
    if (!highlighterPromise) {
      highlighterPromise = import('./shiki-import')
        .then(({ getHighlighter }) => {
          return getHighlighter(options)
        })
        .then((h) => {
          highlighter = h
        })
      return { promise: highlighterPromise }
    }

    if (!highlighter) {
      return { promise: highlighterPromise }
    }

    if (!loadLangs.has(lang)) {
      const promise = highlighter
        .loadLanguage(lang)
        .then(() => {
          loadLangs.add(lang)
        })
        .catch((error) => {
          console.warn(`Failed to load language '${lang}'`, error)
        })
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
