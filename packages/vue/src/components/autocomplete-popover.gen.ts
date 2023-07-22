import '@prosekit/lit/components/autocomplete-popover'

import type { AutocompletePopoverProps as AutocompletePopoverElementProps } from '@prosekit/lit/components/autocomplete-popover'
import { defineComponent, h } from 'vue'

export type AutocompletePopoverProps = {
  class?: string,
} & AutocompletePopoverElementProps

export const AutocompletePopover = defineComponent<AutocompletePopoverProps>(
  (props, { slots }) => {
    return () => h('prosekit-autocomplete-popover', props, slots.default?.())
  }
)
