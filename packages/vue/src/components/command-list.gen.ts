import '@prosekit/lit/components/command-list'

import type { CommandListProps as CommandListElementProps } from '@prosekit/lit/components/command-list'
import { defineComponent, h } from 'vue'

export type CommandListProps = {
  class?: string,
} & CommandListElementProps

export const CommandList = defineComponent<CommandListProps>(
  (props, { slots }) => {
    return () => h('prosekit-command-list', props, slots.default?.())
  }
)
