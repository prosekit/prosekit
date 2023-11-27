import { createComponent } from '@lit/react'
import { AutocompletePopover as AutocompletePopoverElement, type AutocompletePopoverProps as AutocompletePopoverElementProps } from '@prosekit/lit/autocomplete-popover'
import React from 'react'

import {type PropsWithClassName} from '../types'

export type AutocompletePopoverProps = React.PropsWithChildren<PropsWithClassName<AutocompletePopoverElementProps>>

const AutocompletePopoverInner = createComponent({
  tagName: 'prosekit-autocomplete-popover',
  elementClass: AutocompletePopoverElement,
  react: React,
  displayName: 'AutocompletePopoverInner',
})

export const AutocompletePopover: React.ComponentType<
  AutocompletePopoverProps & React.RefAttributes<AutocompletePopoverElement>
> = React.forwardRef((props, ref) => {
  return React.createElement(AutocompletePopoverInner, { ...props, ref })
})

AutocompletePopover.displayName = 'AutocompletePopover'
