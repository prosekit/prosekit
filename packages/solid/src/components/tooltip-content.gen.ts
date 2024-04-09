import '@prosekit/lit/tooltip-content'

import type { TooltipContentProps as TooltipContentElementProps } from '@prosekit/lit/tooltip-content'
import type { Component } from 'solid-js'
import html from 'solid-js/html'

import type { PropsWithClass, PropsWithChildren } from '../types'
import { forceProps } from '../utils/force-props'

export type TooltipContentProps = PropsWithChildren<PropsWithClass<TooltipContentElementProps>>

export const TooltipContent: Component<TooltipContentProps> = (props) => {
  return html`<prosekit-tooltip-content ...${forceProps(props)} />`
}
