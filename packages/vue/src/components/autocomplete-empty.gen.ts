import '@prosekit/lit/autocomplete-empty'

import { type AutocompleteEmptyProps as AutocompleteEmptyElementProps, propNames } from '@prosekit/lit/autocomplete-empty'
import { defineComponent, h } from 'vue'

import type { PropsWithClass } from '../types'

export type AutocompleteEmptyProps = PropsWithClass<AutocompleteEmptyElementProps>

export const AutocompleteEmpty = defineComponent<AutocompleteEmptyProps>(
  (props, { slots }) => {
    return () => {
      const webComponentProps = Object.fromEntries(
        Object.entries(props)
          .filter((entry) => entry[1] !== undefined)
          .map(([key, value]) => [(key === 'class' ? '' : '.') + key, value]),
      )
      return h('prosekit-autocomplete-empty', webComponentProps, slots.default?.())
    }
  }, 
  { props: ['class', ...propNames] }
)
