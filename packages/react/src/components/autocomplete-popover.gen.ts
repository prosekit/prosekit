import { createComponent } from '@lit/react'
import type { SimplifyUnion } from '@prosekit/core'
import { AutocompletePopover as AutocompletePopoverElement, type AutocompletePopoverProps as AutocompletePopoverElementProps } from '@prosekit/lit/components/autocomplete-popover'
import React, { type ComponentType } from 'react'

export type AutocompletePopoverProps = SimplifyUnion<{
  className?: string,
  children?: React.ReactNode,
} & AutocompletePopoverElementProps>

const AutocompletePopoverComponent = createComponent({
  tagName: 'prosekit-autocomplete-popover',
  elementClass: AutocompletePopoverElement,
  react: React,
  displayName: 'AutocompletePopoverComponent',
})

export const AutocompletePopover: ComponentType<AutocompletePopoverProps> = (props) => {
  return React.createElement(
    AutocompletePopoverComponent,
    // The type in @lit/react is not compatible to React.ReactNode
    props as Omit<typeof props, 'children'>,
  )
}
