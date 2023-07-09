/**
 * @module @prosekit/react/components/popover
 */

import { createComponent } from '@lit-labs/react'
import { Popover as PopoverElement } from '@prosekit/lit/elements/popover'
import React from 'react'

export const Popover = createComponent({
  tagName: 'prosekit-popover',
  elementClass: PopoverElement,
  react: React,
  displayName: 'Popover',
})
