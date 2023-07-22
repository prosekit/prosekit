import '@prosekit/lit/components/autocomplete-empty'

import type { AutocompleteEmptyProps as AutocompleteEmptyElementProps } from '@prosekit/lit/components/autocomplete-empty'
import { defineComponent, h } from 'vue'

export type AutocompleteEmptyProps = {
  class?: string,
} & AutocompleteEmptyElementProps

export const AutocompleteEmpty = defineComponent<AutocompleteEmptyProps>(
  (props, { slots }) => {
    return () => h('prosekit-autocomplete-empty', props, slots.default?.())
  }
)
