import { createComponent } from '@lit/react'
import type { SimplifyUnion } from '@prosekit/core'
import { AutocompleteEmpty as AutocompleteEmptyElement, type AutocompleteEmptyProps as AutocompleteEmptyElementProps } from '@prosekit/lit/components/autocomplete-empty'
import React from 'react'
import type { ForwardRefExoticComponent, PropsWithoutRef, RefAttributes } from 'react'

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

export const AutocompleteEmpty: ForwardRefExoticComponent<
  PropsWithoutRef<AutocompleteEmptyProps> & RefAttributes<AutocompleteEmptyElement>
> = React.forwardRef((props, ref) => {
  return React.createElement(AutocompleteEmptyInner, { ...props, ref })
})

AutocompleteEmpty.displayName = 'AutocompleteEmpty'
