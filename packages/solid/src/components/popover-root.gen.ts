import '@prosekit/lit/popover-root'

import type { PopoverRootProps as PopoverRootElementProps } from '@prosekit/lit/popover-root'
import type { Component } from 'solid-js'
import html from 'solid-js/html'

import type { PropsWithClass, PropsWithChildren } from '../types'
import { forceProps } from '../utils/force-props'

export type PopoverRootProps = PropsWithChildren<PropsWithClass<PopoverRootElementProps>>

export const PopoverRoot: Component<PopoverRootProps> = (props) => {
  return html`<prosekit-popover-root ...${forceProps(props)} />`
}
