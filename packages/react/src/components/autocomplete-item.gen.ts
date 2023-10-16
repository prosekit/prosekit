import { createComponent } from '@lit/react'
import type { SimplifyUnion } from '@prosekit/core'
import { AutocompleteItem as AutocompleteItemElement, type AutocompleteItemProps as AutocompleteItemElementProps } from '@prosekit/lit/autocomplete-item'
import type { ForwardRefExoticComponent, PropsWithoutRef, RefAttributes } from 'react'
import React from 'react'

export type AutocompleteItemProps = SimplifyUnion<{
  className?: string,
  children?: React.ReactNode,
} & AutocompleteItemElementProps>

const AutocompleteItemInner = createComponent({
  tagName: 'prosekit-autocomplete-item',
  elementClass: AutocompleteItemElement,
  react: React,
  displayName: 'AutocompleteItemInner',
})

export const AutocompleteItem: ForwardRefExoticComponent<
  PropsWithoutRef<AutocompleteItemProps> & RefAttributes<AutocompleteItemElement>
> = React.forwardRef((props, ref) => {
  return React.createElement(AutocompleteItemInner, { ...props, ref })
})

AutocompleteItem.displayName = 'AutocompleteItem'
