import '@prosekit/lit/inline-popover'

import { type InlinePopoverProps as InlinePopoverElementProps, propNames } from '@prosekit/lit/inline-popover'
import { defineComponent, h } from 'vue'

export type InlinePopoverProps = {
  class?: string,
} & InlinePopoverElementProps

export const InlinePopover = defineComponent<InlinePopoverProps>(
  (props, { slots }) => {
    return () => {
      const webComponentProps = Object.fromEntries(
        Object.entries(props)
          .filter((entry) => entry[1] !== undefined)
          .map(([key, value]) => [(key === 'class' ? '' : '.') + key, value]),
      )
      return h('prosekit-inline-popover', webComponentProps, slots.default?.())
    }
  }, 
  { props: ['class', ...propNames] }
)
