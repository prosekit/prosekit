/**
 * @module @prosekit/react/components/popover-slash
 */

import { Editor } from '@prosekit/core'
import type {
  PredictionRule,
  PopoverSuggestionContext,
} from '@prosekit/lit/elements/popover-suggestion'
import React, { FC, useState } from 'react'

import { PopoverSuggestion as PopoverSuggestionImpl } from './popover-suggestion.gen'

export type { PredictionRule, PopoverSuggestionContext }

export const PopoverSuggestion: FC<{
  editor: Editor
  rules: PredictionRule[]
  render: (context: PopoverSuggestionContext) => React.ReactNode
}> = ({ editor, rules, render }) => {
  const [context, setContext] = useState<PopoverSuggestionContext | null>(null)
  return (
    <PopoverSuggestionImpl editor={editor} rules={rules} onContext={setContext}>
      {context ? render(context) : null}
    </PopoverSuggestionImpl>
  )
}
