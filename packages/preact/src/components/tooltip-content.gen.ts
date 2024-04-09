import '@prosekit/lit/tooltip-content'
import type { TooltipContentProps as TooltipContentElementProps } from '@prosekit/lit/tooltip-content'
import type { ComponentType } from 'preact'
import { h } from 'preact'

import type { PropsWithClass, PropsWithChildren } from '../types'

export type TooltipContentProps = PropsWithChildren<PropsWithClass<TooltipContentElementProps>>

export const TooltipContent: ComponentType<TooltipContentProps> = (props) => {
  return h('prosekit-tooltip-content', props as object)
}
