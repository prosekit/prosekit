import { createComponent } from '@lit-labs/react'
import type { SimplifyUnion } from '@prosekit/core'
import { AutocompleteEmpty as AutocompleteEmptyElement, type AutocompleteEmptyProps as AutocompleteEmptyElementProps } from '@prosekit/lit/components/autocomplete-empty'
import React, { type ComponentType } from 'react'

export type AutocompleteEmptyProps = SimplifyUnion<{
  className?: string,
  children?: React.ReactNode,
} & AutocompleteEmptyElementProps>

const AutocompleteEmptyComponent = createComponent({
  tagName: 'prosekit-autocomplete-empty',
  elementClass: AutocompleteEmptyElement,
  react: React,
  displayName: 'AutocompleteEmptyComponent',
})

export const AutocompleteEmpty: ComponentType<AutocompleteEmptyProps> = (props) => {
  return React.createElement(
    AutocompleteEmptyComponent,
    // The type in @lit-labs/react is not compatible to React.ReactNode
    props as Omit<typeof props, 'children'>,
  )
}
