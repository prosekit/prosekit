/**
 * @module @prosekit/vue/components/popover
 */

import '@prosekit/lit/elements/popover'
import type { Popover as PopoverElement } from '@prosekit/lit/elements/popover'
import { defineComponent, h } from 'vue'

export const Popover = defineComponent<Partial<PopoverElement>>(
  (props, { slots }) => {
    return () => h('prosekit-popover', props, slots.default?.())
  }
)
