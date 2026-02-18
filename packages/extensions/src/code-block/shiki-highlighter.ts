import type { HighlighterOptions, HighlighterResult } from './shiki-highlighter-chunk'

let loaded: ((options: HighlighterOptions) => HighlighterResult) | undefined

async function load() {
  const { createOrGetHighlighter } = await import('./shiki-highlighter-chunk')
  loaded = createOrGetHighlighter
}

export function createOrGetHighlighter(
  options: HighlighterOptions,
): HighlighterResult {
  if (!loaded) {
    return { promise: load() }
  }
  return loaded(options)
}

export type { HighlighterOptions }
