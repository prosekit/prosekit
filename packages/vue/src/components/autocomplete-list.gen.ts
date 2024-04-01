import '@prosekit/lit/autocomplete-list'

import { type AutocompleteListProps as AutocompleteListElementProps, propNames } from '@prosekit/lit/autocomplete-list'
import { defineComponent, h, type DefineSetupFnComponent } from 'vue'

import type { PropsWithClass } from '../types'

export type AutocompleteListProps = PropsWithClass<AutocompleteListElementProps>

export const AutocompleteList: DefineSetupFnComponent<AutocompleteListProps> = defineComponent<AutocompleteListProps>(
  (props, { slots }) => {
    return () => {
      const webComponentProps = Object.fromEntries(
        Object.entries(props)
          .filter((entry) => entry[1] !== undefined)
          .map(([key, value]) => [(key === 'class' ? '' : '.') + key, value]),
      )
      return h('prosekit-autocomplete-list', webComponentProps, slots.default?.())
    }
  }, 
  { props: ['class', ...propNames] }
)
