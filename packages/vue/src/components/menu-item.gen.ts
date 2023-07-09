/**
 * @module @prosekit/vue/components/menu-item
 */

import '@prosekit/lit/elements/menu-item'
import type { MenuItem as MenuItemElement } from '@prosekit/lit/elements/menu-item'
import { defineComponent, h } from 'vue'

export const MenuItem = defineComponent<Partial<MenuItemElement>>(
  (props, { slots }) => {
    return () => h('prosekit-menu-item', props, slots.default?.())
  }
)
