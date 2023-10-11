import { createComponent } from '@lit/react'
import type { SimplifyUnion } from '@prosekit/core'
import { AutocompleteItem as AutocompleteItemElement, type AutocompleteItemProps as AutocompleteItemElementProps } from '@prosekit/lit/components/autocomplete-item'
import React, { type ComponentType } from 'react'

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

export const AutocompleteItem: ComponentType<AutocompleteItemProps> = (props) => {
  return React.createElement(AutocompleteItemInner, props)
}

AutocompleteItem.displayName = 'AutocompleteItem'
