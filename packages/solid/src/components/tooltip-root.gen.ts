import '@prosekit/lit/tooltip-root'

import type { TooltipRootProps as TooltipRootElementProps } from '@prosekit/lit/tooltip-root'
import type { Component } from 'solid-js'
import html from 'solid-js/html'

import type { PropsWithClass, PropsWithChildren } from '../types'
import { forceProps } from '../utils/force-props'

export type TooltipRootProps = PropsWithChildren<PropsWithClass<TooltipRootElementProps>>

export const TooltipRoot: Component<TooltipRootProps> = (props) => {
  return html`<prosekit-tooltip-root ...${forceProps(props)} />`
}
