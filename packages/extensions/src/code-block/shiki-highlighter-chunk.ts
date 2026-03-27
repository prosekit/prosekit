import type { BundledHighlighterOptions, BundledLanguage, BundledTheme, Highlighter, SpecialLanguage } from 'shiki'
import { createHighlighter } from 'shiki/bundle/full'
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript'

let highlighterPromise: Promise<void> | undefined
let highlighter: Highlighter | undefined
const loadedLangs = new Set<BundledLanguage | SpecialLanguage>()
const loadedThemes = new Set<BundledTheme>()

export interface ShikiHighlighterOptions extends BundledHighlighterOptions<BundledLanguage, BundledTheme> {}

export interface HighlighterOptions extends Omit<ShikiHighlighterOptions, 'langs' | 'themes'> {
  themes: BundledTheme[]
  langs: (BundledLanguage | SpecialLanguage)[]
}

function ensureHighlighter({
  ...options
}: HighlighterOptions): Promise<void> {
  if (!highlighterPromise) {
    // If no engine is provided, use the JavaScript engine, which is
    // smaller than the WASM engine.
    if (!options.engine) {
      const engine = createJavaScriptRegexEngine({ forgiving: true })
      options.engine = engine
    }
    highlighterPromise = createHighlighter(options).then((createdHighlighter) => {
      highlighter = createdHighlighter
    })
  }
  return highlighterPromise
}

async function loadLanguages(langs: (BundledLanguage | SpecialLanguage)[]) {
  for (const lang of langs) {
    if (!highlighter) break
    await highlighter.loadLanguage(lang)
    loadedLangs.add(lang)
  }
}

async function loadThemes(themes: BundledTheme[]) {
  for (const theme of themes) {
    if (!highlighter) break
    await highlighter.loadTheme(theme)
    loadedThemes.add(theme)
  }
}

export type HighlighterResult =
  | {
    highlighter: Highlighter
    promise?: undefined
  }
  | {
    highlighter?: undefined
    promise: Promise<void>
  }

export function createOrGetHighlighter(
  options: HighlighterOptions,
): HighlighterResult {
  if (!highlighter) {
    return { promise: ensureHighlighter(options) }
  }

  const langs = options.langs.filter((lang) => !loadedLangs.has(lang))
  if (langs.length > 0) {
    return { promise: loadLanguages(langs) }
  }

  const themes = options.themes.filter((theme) => !loadedThemes.has(theme))
  if (themes.length > 0) {
    return { promise: loadThemes(themes) }
  }

  return { highlighter }
}
