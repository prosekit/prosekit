import '@prosekit/lit/autocomplete-item'

import { type AutocompleteItemProps as AutocompleteItemElementProps, propNames } from '@prosekit/lit/autocomplete-item'
import { defineComponent, h } from 'vue'

export type AutocompleteItemProps = {
  class?: string,
} & AutocompleteItemElementProps

export const AutocompleteItem = defineComponent<AutocompleteItemProps>(
  (props, { slots }) => {
    return () => {
      const webComponentProps = Object.fromEntries(
        Object.entries(props)
          .filter((entry) => entry[1] !== undefined)
          .map(([key, value]) => [(key === 'class' ? '' : '.') + key, value]),
      )
      return h('prosekit-autocomplete-item', webComponentProps, slots.default?.())
    }
  }, 
  { props: ['class', ...propNames] }
)
