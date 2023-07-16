import '@prosekit/lit/components/command-popover'

import type { CommandPopoverProps as CommandPopoverElementProps } from '@prosekit/lit/components/command-popover'
import { defineComponent, h } from 'vue'

export type CommandPopoverProps = {
  class?: string,
} & CommandPopoverElementProps

export const CommandPopover = defineComponent<CommandPopoverProps>(
  (props, { slots }) => {
    return () => h('prosekit-command-popover', props, slots.default?.())
  }
)
