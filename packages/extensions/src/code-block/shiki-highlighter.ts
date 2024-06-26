import type {
  BundledLanguage,
  BundledTheme,
  Highlighter,
  SpecialLanguage,
} from 'shiki'

let highlighter: Highlighter | undefined
const loadedLangs = new Set<BundledLanguage | SpecialLanguage>()
const loadedThemes = new Set<BundledTheme>()

export type HighlighterOptions = {
  themes: BundledTheme[]
  langs: (BundledLanguage | SpecialLanguage)[]
  langAlias?: Record<string, BundledLanguage>
}

type HighlighterResult =
  | {
      highlighter: Highlighter
      promise?: undefined
    }
  | {
      highlighter?: undefined
      promise: Promise<void>
    }

async function createHighlighter(options: HighlighterOptions): Promise<void> {
  const { getSingletonHighlighter } = await import('./shiki-import')
  if (!highlighter) {
    highlighter = await getSingletonHighlighter(options)
  }
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

export function prepareHighlighter(
  options: HighlighterOptions,
): HighlighterResult {
  if (!highlighter) {
    return { promise: createHighlighter(options) }
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
