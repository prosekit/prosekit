import { createComponent } from '@lit/react'
import type { SimplifyUnion } from '@prosekit/core'
import { AutocompleteList as AutocompleteListElement, type AutocompleteListProps as AutocompleteListElementProps } from '@prosekit/lit/autocomplete-list'
import React from 'react'

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

export const AutocompleteList: React.ComponentType<
  AutocompleteListProps & React.RefAttributes<AutocompleteListElement>
> = React.forwardRef((props, ref) => {
  return React.createElement(AutocompleteListInner, { ...props, ref })
})

AutocompleteList.displayName = 'AutocompleteList'
