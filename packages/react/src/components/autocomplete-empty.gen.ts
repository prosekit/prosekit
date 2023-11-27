import { createComponent } from '@lit/react'
import { AutocompleteEmpty as AutocompleteEmptyElement, type AutocompleteEmptyProps as AutocompleteEmptyElementProps } from '@prosekit/lit/autocomplete-empty'
import React from 'react'

import {type PropsWithClassName} from '../types'

export type AutocompleteEmptyProps = React.PropsWithChildren<PropsWithClassName<AutocompleteEmptyElementProps>>

const AutocompleteEmptyInner = createComponent({
  tagName: 'prosekit-autocomplete-empty',
  elementClass: AutocompleteEmptyElement,
  react: React,
  displayName: 'AutocompleteEmptyInner',
})

export const AutocompleteEmpty: React.ComponentType<
  AutocompleteEmptyProps & React.RefAttributes<AutocompleteEmptyElement>
> = React.forwardRef((props, ref) => {
  return React.createElement(AutocompleteEmptyInner, { ...props, ref })
})

AutocompleteEmpty.displayName = 'AutocompleteEmpty'
