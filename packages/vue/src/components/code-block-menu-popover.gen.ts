import '@prosekit/lit/components/code-block-menu-popover'

import { type CodeBlockMenuPopoverProps as CodeBlockMenuPopoverElementProps, propNames } from '@prosekit/lit/components/code-block-menu-popover'
import { defineComponent, h } from 'vue'

export type CodeBlockMenuPopoverProps = {
  class?: string,
} & CodeBlockMenuPopoverElementProps

export const CodeBlockMenuPopover = defineComponent<CodeBlockMenuPopoverProps>(
  (props, { slots }) => {
    return () => {
      const webComponentProps = Object.fromEntries(
        Object.entries(props)
          .filter((entry) => entry[1] !== undefined)
          .map(([key, value]) => [(key === 'class' ? '' : '.') + key, value]),
      )
      return h('prosekit-code-block-menu-popover', webComponentProps, slots.default?.())
    }
  }, 
  { props: ['class', ...propNames] }
)
