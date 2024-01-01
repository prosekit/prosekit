import type { Extension } from '@prosekit/core'
import type { Parser } from 'prosemirror-highlight'
import { createParser } from 'prosemirror-highlight/shikiji'
import type { BuiltinLanguage, BundledTheme, Highlighter } from 'shikiji'

import { defineCodeBlockHighlight } from './code-block-highlight'

function createHighlighterLoader() {
  let shikijiImport: Promise<void> | undefined
  let highlighter: Highlighter | undefined
  const languages = new Set<string>()
  const themes = new Set<string>()

  return function highlighterLoader(
    lang: BuiltinLanguage,
    theme: BundledTheme,
  ): {
    promise?: Promise<void>
    highlighter?: Highlighter
  } {
    if (!shikijiImport) {
      shikijiImport = import('shikiji').then(async ({ getHighlighter }) => {
        const fallbackLang = 'md'
        highlighter = await getHighlighter({
          langs: [fallbackLang],
          themes: [],
        })
      })
      return { promise: shikijiImport }
    }

    if (!highlighter) {
      return { promise: shikijiImport }
    }

    if (!languages.has(lang)) {
      const promise = highlighter
        .loadLanguage(lang)
        .then(() => {
          languages.add(lang)
        })
        .catch(() => {
          // ignore
        })
      return { promise }
    }

    if (!themes.has(theme)) {
      const promise = highlighter
        .loadTheme(theme)
        .then(() => {
          themes.add(theme)
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
   * @default 'github-light'
   */
  theme?: BundledTheme
}): Extension {
  const theme: BundledTheme = options?.theme || 'github-light'
  const parser = createLazyParser(theme)
  return defineCodeBlockHighlight({ parser })
}
