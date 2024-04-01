import '@prosekit/lit/popover-positioner'

import type { PopoverPositionerProps as PopoverPositionerElementProps } from '@prosekit/lit/popover-positioner'
import type { Component } from 'solid-js'
import html from 'solid-js/html'

import type { PropsWithClass, PropsWithChildren } from '../types'
import { forceProps } from '../utils/force-props'

export type PopoverPositionerProps = PropsWithChildren<PropsWithClass<PopoverPositionerElementProps>>

export const PopoverPositioner: Component<PopoverPositionerProps> = (props) => {
  return html`<prosekit-popover-positioner ...${forceProps(props)} />`
}
