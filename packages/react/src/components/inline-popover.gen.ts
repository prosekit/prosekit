import { createComponent } from '@lit/react'
import { InlinePopover as InlinePopoverElement, type InlinePopoverProps as InlinePopoverElementProps } from '@prosekit/lit/inline-popover'
import React from 'react'

import {type PropsWithClassName} from '../types'

export type InlinePopoverProps = React.PropsWithChildren<PropsWithClassName<InlinePopoverElementProps>>

const InlinePopoverInner = createComponent({
  tagName: 'prosekit-inline-popover',
  elementClass: InlinePopoverElement,
  react: React,
  displayName: 'InlinePopoverInner',
})

export const InlinePopover: React.ComponentType<
  InlinePopoverProps & React.RefAttributes<InlinePopoverElement>
> = React.forwardRef((props, ref) => {
  return React.createElement(InlinePopoverInner, { ...props, ref })
})

InlinePopover.displayName = 'InlinePopover'
