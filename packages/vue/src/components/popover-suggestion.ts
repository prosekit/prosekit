/**
 * @module @prosekit/vue/components/popover-suggestion
 */

import { Editor } from '@prosekit/core'
import type {
  PredictionRule,
  PopoverSuggestionContext,
} from '@prosekit/lit/elements/popover-suggestion'
import { defineComponent, h, ref } from 'vue'

import { PopoverSuggestion as PopoverSuggestionImpl } from './popover-suggestion.gen'

export type { PredictionRule, PopoverSuggestionContext }

export interface PopoverSuggestionProps {
  editor: Editor
  rules: PredictionRule[]
}

export interface PopoverSuggestionSlots {
  default: PopoverSuggestionContext
}

export const PopoverSuggestion = defineComponent(
  ({ editor, rules }: PopoverSuggestionProps, { slots }) => {
    const contextRef = ref<PopoverSuggestionContext | null>(null)

    const onContext = (context: PopoverSuggestionContext) => {
      contextRef.value = context
    }

    return () => {
      const context = contextRef.value

      return h(
        PopoverSuggestionImpl,
        {
          '.editor': editor,
          '.rules': rules,
          '.onContext': onContext,
        },
        () => slots.default?.(context),
      )
    }
  },
)
