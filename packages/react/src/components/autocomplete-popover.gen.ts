import { createComponent } from '@lit/react'
import type { SimplifyUnion } from '@prosekit/core'
import { AutocompletePopover as AutocompletePopoverElement, type AutocompletePopoverProps as AutocompletePopoverElementProps } from '@prosekit/lit/autocomplete-popover'
import React from 'react'

export type AutocompletePopoverProps = SimplifyUnion<{
  className?: string,
  children?: React.ReactNode,
} & AutocompletePopoverElementProps>

const AutocompletePopoverInner = createComponent({
  tagName: 'prosekit-autocomplete-popover',
  elementClass: AutocompletePopoverElement,
  react: React,
  displayName: 'AutocompletePopoverInner',
})

export const AutocompletePopover: React.ComponentType<
  AutocompletePopoverProps & React.RefAttributes<AutocompletePopoverElement>
> = React.forwardRef((props, ref) => {
  return React.createElement(AutocompletePopoverInner, { ...props, ref })
})

AutocompletePopover.displayName = 'AutocompletePopover'
