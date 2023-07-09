/**
 * @module @prosekit/react/components/menu
 */

import { createComponent } from '@lit-labs/react'
import { Menu as MenuElement } from '@prosekit/lit/elements/menu'
import React from 'react'

export const Menu = createComponent({
  tagName: 'prosekit-menu',
  elementClass: MenuElement,
  react: React,
  displayName: 'Menu',
})
