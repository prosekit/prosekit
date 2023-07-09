/**
 * @module @prosekit/vue/components/menu
 */

import '@prosekit/lit/elements/menu'
import type { Menu as MenuElement } from '@prosekit/lit/elements/menu'
import { defineComponent, h } from 'vue'

export const Menu = defineComponent<Partial<MenuElement>>(
  (props, { slots }) => {
    return () => h('prosekit-menu', props, slots.default?.())
  }
)
