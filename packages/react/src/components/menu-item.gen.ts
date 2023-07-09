/**
 * @module @prosekit/react/components/menu-item
 */

import { createComponent } from '@lit-labs/react'
import { MenuItem as MenuItemElement } from '@prosekit/lit/elements/menu-item'
import React from 'react'

export const MenuItem = createComponent({
  tagName: 'prosekit-menu-item',
  elementClass: MenuItemElement,
  react: React,
  displayName: 'MenuItem',
})
