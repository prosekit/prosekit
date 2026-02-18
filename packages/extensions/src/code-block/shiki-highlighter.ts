import type { HighlighterOptions, HighlighterResult } from './shiki-highlighter-chunk'

let loaded: ((options: HighlighterOptions) => HighlighterResult) | undefined
let loading: Promise<void> | undefined

async function load() {
  const { createOrGetHighlighter } = await import('./shiki-highlighter-chunk')
  loaded = createOrGetHighlighter
  loading = undefined
}

export function createOrGetHighlighter(
  options: HighlighterOptions,
): HighlighterResult {
  if (loaded) {
    return loaded(options)
  }

  if (!loading) {
    loading = load()
  }
  return { promise: loading }
}

export type { HighlighterOptions }
