import { createComponent } from '@lit/react'
import { AutocompleteItem as AutocompleteItemElement, type AutocompleteItemProps as AutocompleteItemElementProps } from '@prosekit/lit/autocomplete-item'
import React from 'react'

import {type PropsWithClassName} from '../types'

export type AutocompleteItemProps = React.PropsWithChildren<PropsWithClassName<AutocompleteItemElementProps>>

const AutocompleteItemInner = createComponent({
  tagName: 'prosekit-autocomplete-item',
  elementClass: AutocompleteItemElement,
  react: React,
  displayName: 'AutocompleteItemInner',
})

export const AutocompleteItem: React.ComponentType<
  AutocompleteItemProps & React.RefAttributes<AutocompleteItemElement>
> = React.forwardRef((props, ref) => {
  return React.createElement(AutocompleteItemInner, { ...props, ref })
})

AutocompleteItem.displayName = 'AutocompleteItem'
