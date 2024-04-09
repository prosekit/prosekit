import '@prosekit/lit/tooltip-trigger'

import type { TooltipTriggerProps as TooltipTriggerElementProps } from '@prosekit/lit/tooltip-trigger'
import type { Component } from 'solid-js'
import html from 'solid-js/html'

import type { PropsWithClass, PropsWithChildren } from '../types'
import { forceProps } from '../utils/force-props'

export type TooltipTriggerProps = PropsWithChildren<PropsWithClass<TooltipTriggerElementProps>>

export const TooltipTrigger: Component<TooltipTriggerProps> = (props) => {
  return html`<prosekit-tooltip-trigger ...${forceProps(props)} />`
}
