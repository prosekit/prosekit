/**
 * @module @prosekit/vue/components/popover-suggestion
 */

import '@prosekit/lit/elements/popover-suggestion'
import type { PopoverSuggestion as PopoverSuggestionElement } from '@prosekit/lit/elements/popover-suggestion'
import { defineComponent, h } from 'vue'

export const PopoverSuggestion = defineComponent<Partial<PopoverSuggestionElement>>(
  (props, { slots }) => {
    return () => h('prosekit-popover-suggestion', props, slots.default?.())
  }
)
