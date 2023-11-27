import '@prosekit/lit/popover'

import type { PopoverProps as PopoverElementProps } from '@prosekit/lit/popover'
import type { Component } from 'solid-js'
import html from 'solid-js/html'

import type { PropsWithClass, PropsWithChildren } from '../types'
import { forceProps } from '../utils/force-props'

export type PopoverProps = PropsWithChildren<PropsWithClass<PopoverElementProps>>

export const Popover: Component<PopoverProps> = (props) => {
  return html`<prosekit-popover ...${forceProps(props)} />`
}
