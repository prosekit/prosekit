import { ProseKitError, type Extension } from '@prosekit/core'
import type { Parser } from 'prosemirror-highlight'
import { createParser } from 'prosemirror-highlight/shikiji'
import type { BuiltinLanguage, BundledTheme, Highlighter } from 'shikiji'

import { defineCodeBlockHighlight } from './code-block-highlight'

async function importGetHighlighter() {
  try {
    const { getHighlighter } = await import('shikiji')
    return getHighlighter
  } catch (error) {
    throw new ProseKitError(
      "Failed to import package 'shikiji'. Make sure you've installed it.",
      { cause: error },
    )
  }
}

async function createHighlighter(theme: BundledTheme) {
  const getHighlighter = await importGetHighlighter()
  const fallbackLang = 'md'
  return await getHighlighter({
    langs: [fallbackLang],
    themes: [theme],
  })
}

function createHighlighterLoader() {
  let shikijiImport: Promise<void> | undefined
  let highlighter: Highlighter | undefined
  const loadLangs = new Set<string>()
  const loadThemes = new Set<string>()

  return function highlighterLoader(
    lang: BuiltinLanguage,
    theme: BundledTheme,
  ): {
    promise?: Promise<void>
    highlighter?: Highlighter
  } {
    if (!shikijiImport) {
      shikijiImport = createHighlighter(theme).then((h) => {
        highlighter = h
      })
      return { promise: shikijiImport }
    }

    if (!highlighter) {
      return { promise: shikijiImport }
    }

    if (!loadLangs.has(lang)) {
      const promise = highlighter
        .loadLanguage(lang)
        .then(() => {
          loadLangs.add(lang)
        })
        .catch(() => {
          // ignore
        })
      return { promise }
    }

    if (!loadThemes.has(theme)) {
      const promise = highlighter
        .loadTheme(theme)
        .then(() => {
          loadThemes.add(theme)
        })
        .catch(() => {
          // ignore
        })
      return { promise }
    }

    return { highlighter }
  }
}

function createLazyParser(theme: BundledTheme): Parser {
  let parser: Parser | undefined
  const highlighterLoader = createHighlighterLoader()

  return function lazyParser(options) {
    const language = (options.language || '') as BuiltinLanguage
    const { highlighter, promise } = highlighterLoader(language, theme)

    if (!highlighter) {
      return promise || []
    }

    if (!parser) {
      parser = createParser(highlighter)
    }
    return parser(options)
  }
}

/**
 * Adds syntax highlighting to code blocks using the [shikiji](https://github.com/antfu/shikiji) package.
 *
 * @public
 */
export function defineCodeBlockShikiji(options?: {
  /**
   * The shikiji theme to use.
   *
   * @default 'one-dark-pro'
   */
  theme?: BundledTheme
}): Extension {
  const theme: BundledTheme = options?.theme || 'one-dark-pro'
  const parser = createLazyParser(theme)
  return defineCodeBlockHighlight({ parser })
}
