import '@prosekit/lit/components/command-item'

import type { CommandItemProps as CommandItemElementProps } from '@prosekit/lit/components/command-item'
import { defineComponent, h } from 'vue'

export type CommandItemProps = {
  class?: string,
} & CommandItemElementProps

export const CommandItem = defineComponent<CommandItemProps>(
  (props, { slots }) => {
    return () => h('prosekit-command-item', props, slots.default?.())
  }
)
