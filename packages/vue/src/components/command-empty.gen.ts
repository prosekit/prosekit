import '@prosekit/lit/components/command-empty'

import type { CommandEmptyProps as CommandEmptyElementProps } from '@prosekit/lit/components/command-empty'
import { defineComponent, h } from 'vue'

export type CommandEmptyProps = {
  class?: string,
} & CommandEmptyElementProps

export const CommandEmpty = defineComponent<CommandEmptyProps>(
  (props, { slots }) => {
    return () => h('prosekit-command-empty', props, slots.default?.())
  }
)
