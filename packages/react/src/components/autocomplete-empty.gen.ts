import { createComponent } from '@lit/react'
import type { SimplifyUnion } from '@prosekit/core'
import { AutocompleteEmpty as AutocompleteEmptyElement, type AutocompleteEmptyProps as AutocompleteEmptyElementProps } from '@prosekit/lit/components/autocomplete-empty'
import React, { type ComponentType } from 'react'

export type AutocompleteEmptyProps = SimplifyUnion<{
  className?: string,
  children?: React.ReactNode,
} & AutocompleteEmptyElementProps>

const AutocompleteEmptyInner = createComponent({
  tagName: 'prosekit-autocomplete-empty',
  elementClass: AutocompleteEmptyElement,
  react: React,
  displayName: 'AutocompleteEmptyInner',
})

export const AutocompleteEmpty: ComponentType<AutocompleteEmptyProps> = (props) => {
  return React.createElement(AutocompleteEmptyInner, props)
}

AutocompleteEmpty.displayName = 'AutocompleteEmpty'
