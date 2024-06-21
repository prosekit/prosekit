import type {
  BundledLanguage,
  BundledTheme,
  Highlighter,
  SpecialLanguage,
} from 'shiki'

let highlighter: Highlighter | undefined

type HighlighterOptions = {
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
      promise: Promise<unknown>
    }

async function createHighlighter(options: HighlighterOptions): Promise<void> {
  const { getSingletonHighlighter } = await import('./shiki-import')
  highlighter = await getSingletonHighlighter(options)
}

function loadLanguages(
  langs: (BundledLanguage | SpecialLanguage)[],
): Promise<unknown> | void {
  if (!highlighter) return

  const loaded = new Set(highlighter.getLoadedLanguages())
  const toLoad = langs.filter((lang) => !loaded.has(lang))
  if (toLoad.length === 0) return

  return Promise.all(toLoad.map((lang) => highlighter?.loadLanguage(lang)))
}

function loadThemes(themes: BundledTheme[]) {
  if (!highlighter) return

  const loaded = new Set(highlighter.getLoadedThemes())
  const toLoad = themes.filter((theme) => !loaded.has(theme))
  if (toLoad.length === 0) return

  return Promise.all(toLoad.map((theme) => highlighter?.loadTheme(theme)))
}

export function getHighlighter(options: HighlighterOptions): HighlighterResult {
  if (!highlighter) {
    return { promise: createHighlighter(options) }
  }

  const promise = loadLanguages(options.langs) || loadThemes(options.themes)

  return promise ? { promise } : { highlighter }
}
