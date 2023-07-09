/**
 * @module @prosekit/react/components/popover-suggestion
 */

import { createComponent } from '@lit-labs/react'
import { PopoverSuggestion as PopoverSuggestionElement } from '@prosekit/lit/elements/popover-suggestion'
import React from 'react'

export const PopoverSuggestion = createComponent({
  tagName: 'prosekit-popover-suggestion',
  elementClass: PopoverSuggestionElement,
  react: React,
  displayName: 'PopoverSuggestion',
})
