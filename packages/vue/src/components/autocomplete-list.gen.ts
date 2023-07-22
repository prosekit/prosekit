import '@prosekit/lit/components/autocomplete-list'

import type { AutocompleteListProps as AutocompleteListElementProps } from '@prosekit/lit/components/autocomplete-list'
import { defineComponent, h } from 'vue'

export type AutocompleteListProps = {
  class?: string,
} & AutocompleteListElementProps

export const AutocompleteList = defineComponent<AutocompleteListProps>(
  (props, { slots }) => {
    return () => h('prosekit-autocomplete-list', props, slots.default?.())
  }
)
