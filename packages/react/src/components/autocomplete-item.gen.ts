import { createComponent } from '@lit-labs/react'
import type { SimplifyUnion } from '@prosekit/core'
import { AutocompleteItem as AutocompleteItemElement, type AutocompleteItemProps as AutocompleteItemElementProps } from '@prosekit/lit/components/autocomplete-item'
import React, { type ComponentType } from 'react'

export type AutocompleteItemProps = SimplifyUnion<{
  className?: string,
  children?: React.ReactNode,
} & AutocompleteItemElementProps>

const AutocompleteItemComponent = createComponent({
  tagName: 'prosekit-autocomplete-item',
  elementClass: AutocompleteItemElement,
  react: React,
  displayName: 'AutocompleteItemComponent',
})

export const AutocompleteItem: ComponentType<AutocompleteItemProps> = (props) => {
  return React.createElement(
    AutocompleteItemComponent,
    // The type in @lit-labs/react is not compatible to React.ReactNode
    props as Omit<typeof props, 'children'>,
  )
}
