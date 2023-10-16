import '@prosekit/lit/code-block-popover'

import { type CodeBlockPopoverProps as CodeBlockPopoverElementProps, propNames } from '@prosekit/lit/code-block-popover'
import { defineComponent, h } from 'vue'

export type CodeBlockPopoverProps = {
  class?: string,
} & CodeBlockPopoverElementProps

export const CodeBlockPopover = defineComponent<CodeBlockPopoverProps>(
  (props, { slots }) => {
    return () => {
      const webComponentProps = Object.fromEntries(
        Object.entries(props)
          .filter((entry) => entry[1] !== undefined)
          .map(([key, value]) => [(key === 'class' ? '' : '.') + key, value]),
      )
      return h('prosekit-code-block-popover', webComponentProps, slots.default?.())
    }
  }, 
  { props: ['class', ...propNames] }
)
