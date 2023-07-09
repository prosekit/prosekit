/**
 * @module @prosekit/react/components/popover-suggestion
 */

import { Editor } from '@prosekit/core'
import '@prosekit/lit/elements/popover-suggestion'
import type {
  PopoverSuggestionContext,
  PopoverSuggestion as PopoverSuggestionElement,
  PredictionRule,
} from '@prosekit/lit/elements/popover-suggestion'
import React, {
  ComponentType,
  createElement,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'

export type { PopoverSuggestionContext, PredictionRule }

export const PopoverSuggestion: ComponentType<{
  editor: Editor
  rules: PredictionRule[]
  render: (context: PopoverSuggestionContext) => React.ReactNode
}> = ({ editor, rules, render }) => {
  const [context, setContext] = useState<PopoverSuggestionContext | null>(null)

  const ref = useRef<PopoverSuggestionElement | null>(null)

  useLayoutEffect(() => {
    const element = ref.current
    if (!element) {
      return
    }

    element.editor = editor
    element.rules = rules
    element.onContext = setContext
  }, [editor, rules])

  return createElement(
    'prosekit-popover-suggestion',
    { ref },
    context ? render(context) : null,
  )
}
