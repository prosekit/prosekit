import '@prosekit/lit/popover-trigger'

import type { PopoverTriggerProps as PopoverTriggerElementProps } from '@prosekit/lit/popover-trigger'
import type { Component } from 'solid-js'
import html from 'solid-js/html'

import type { PropsWithClass, PropsWithChildren } from '../types'
import { forceProps } from '../utils/force-props'

export type PopoverTriggerProps = PropsWithChildren<PropsWithClass<PopoverTriggerElementProps>>

export const PopoverTrigger: Component<PopoverTriggerProps> = (props) => {
  return html`<prosekit-popover-trigger ...${forceProps(props)} />`
}
