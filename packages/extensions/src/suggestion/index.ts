import { addPlugin } from '@prosekit/core'

import {
  createPredictionPlugin,
  type PredictionRule,
  type SuggestionOptions,
} from './plugin'

export { type PredictionRule, type SuggestionOptions }

export function addSuggestion(options: SuggestionOptions) {
  const plugin = createPredictionPlugin(options)
  return addPlugin({ plugins: [plugin] })
}
