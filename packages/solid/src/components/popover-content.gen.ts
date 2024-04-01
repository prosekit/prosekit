import '@prosekit/lit/popover-content'

import type { PopoverContentProps as PopoverContentElementProps } from '@prosekit/lit/popover-content'
import type { Component } from 'solid-js'
import html from 'solid-js/html'

import type { PropsWithClass, PropsWithChildren } from '../types'
import { forceProps } from '../utils/force-props'

export type PopoverContentProps = PropsWithChildren<PropsWithClass<PopoverContentElementProps>>

export const PopoverContent: Component<PopoverContentProps> = (props) => {
  return html`<prosekit-popover-content ...${forceProps(props)} />`
}
