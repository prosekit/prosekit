import type { Extension } from '@prosekit/core'
import type { Parser } from 'prosemirror-highlight'
import { createParser } from 'prosemirror-highlight/shiki'
import type {
  BuiltinLanguage,
  BundledHighlighterOptions,
  BundledLanguage,
  BundledTheme,
  Highlighter,
  SpecialLanguage,
  StringLiteralUnion,
} from 'shiki'
import { bundledLanguagesInfo, bundledThemesInfo, getHighlighter } from 'shiki'

import { defineCodeBlockHighlight } from './code-block-highlight'

type HighlighterOptions = BundledHighlighterOptions<
  BundledLanguage,
  BundledTheme
>

export {
  bundledLanguagesInfo as shikiBundledLanguagesInfo,
  bundledThemesInfo as shikiBundledThemesInfo,
}
export type ShikiBundledTheme = BundledTheme
export type ShikiBundledLanguage = BundledLanguage

function createHighlighterLoader() {
  let highlighterPromise: Promise<void> | undefined
  let highlighter: Highlighter | undefined

  const loadLangs = new Set<string>()

  return function highlighterLoader(
    lang: BuiltinLanguage,
    options: HighlighterOptions,
  ): {
    promise?: Promise<void>
    highlighter?: Highlighter
  } {
    if (!highlighter) {
      if (!highlighterPromise) {
        highlighterPromise = getHighlighter(options).then((result) => {
          highlighter = result
        })
      }

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

function createLazyParser(highlighterOptions: HighlighterOptions): Parser {
  let parser: Parser | undefined
  const highlighterLoader = createHighlighterLoader()

  return function lazyParser(options) {
    const language = (options.language || '') as BuiltinLanguage
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

/**
 * Adds syntax highlighting to code blocks using the [shiki](https://github.com/shikijs/shiki) package.
 *
 * @public
 */
export function defineCodeBlockShiki({
  themes = ['one-dark-pro'],
  langs = ['text'],
  langAlias,
}: {
  /**
   * Theme registation
   *
   * @default ['one-dark-pro']
   */
  themes?: StringLiteralUnion<BundledTheme>[]
  /**
   * Language registation
   *
   * @default ['text']
   */
  langs?: StringLiteralUnion<BundledLanguage | SpecialLanguage>[]
  /**
   * Alias of languages
   *
   * @example { 'my-lang': 'javascript' }
   */
  langAlias?: Record<string, BundledLanguage>
} = {}): Extension {
  const parser = createLazyParser({ themes, langs, langAlias })
  return defineCodeBlockHighlight({ parser })
}
