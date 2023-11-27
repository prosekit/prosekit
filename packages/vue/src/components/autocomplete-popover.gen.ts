import '@prosekit/lit/autocomplete-popover'

import { type AutocompletePopoverProps as AutocompletePopoverElementProps, propNames } from '@prosekit/lit/autocomplete-popover'
import { defineComponent, h } from 'vue'

import type { PropsWithClass } from '../types'

export type AutocompletePopoverProps = PropsWithClass<AutocompletePopoverElementProps>

export const AutocompletePopover = defineComponent<AutocompletePopoverProps>(
  (props, { slots }) => {
    return () => {
      const webComponentProps = Object.fromEntries(
        Object.entries(props)
          .filter((entry) => entry[1] !== undefined)
          .map(([key, value]) => [(key === 'class' ? '' : '.') + key, value]),
      )
      return h('prosekit-autocomplete-popover', webComponentProps, slots.default?.())
    }
  }, 
  { props: ['class', ...propNames] }
)
