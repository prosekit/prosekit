import { createComponent } from '@lit/react'
import type { SimplifyUnion } from '@prosekit/core'
import { AutocompleteList as AutocompleteListElement, type AutocompleteListProps as AutocompleteListElementProps } from '@prosekit/lit/components/autocomplete-list'
import React, { type ComponentType } from 'react'

export type AutocompleteListProps = SimplifyUnion<{
  className?: string,
  children?: React.ReactNode,
} & AutocompleteListElementProps>

const AutocompleteListInner = createComponent({
  tagName: 'prosekit-autocomplete-list',
  elementClass: AutocompleteListElement,
  react: React,
  displayName: 'AutocompleteListInner',
})

export const AutocompleteList: ComponentType<AutocompleteListProps> = (props) => {
  return React.createElement(AutocompleteListInner, props)
}

AutocompleteList.displayName = 'AutocompleteList'
