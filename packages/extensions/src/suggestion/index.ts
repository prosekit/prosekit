import { definePlugin } from '@prosekit/core'

import {
  createPredictionPlugin,
  type PredictionRule,
  type SuggestionOptions,
} from './plugin'

export { type PredictionRule, type SuggestionOptions }

export function defineSuggestion(options: SuggestionOptions) {
  const plugin = createPredictionPlugin(options)
  return definePlugin(plugin)
}
