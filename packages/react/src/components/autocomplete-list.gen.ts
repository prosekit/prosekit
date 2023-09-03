import { createComponent } from '@lit-labs/react'
import type { SimplifyUnion } from '@prosekit/core'
import { AutocompleteList as AutocompleteListElement, type AutocompleteListProps as AutocompleteListElementProps } from '@prosekit/lit/components/autocomplete-list'
import React, { type ComponentType } from 'react'

export type AutocompleteListProps = SimplifyUnion<{
  className?: string,
  children?: React.ReactNode,
} & AutocompleteListElementProps>

const AutocompleteListComponent = createComponent({
  tagName: 'prosekit-autocomplete-list',
  elementClass: AutocompleteListElement,
  react: React,
  displayName: 'AutocompleteListComponent',
})

export const AutocompleteList: ComponentType<AutocompleteListProps> = (props) => {
  return React.createElement(
    AutocompleteListComponent,
    // The type in @lit-labs/react is not compatible to React.ReactNode
    props as Omit<typeof props, 'children'>,
  )
}
