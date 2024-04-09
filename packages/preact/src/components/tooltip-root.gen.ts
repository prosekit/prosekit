import '@prosekit/lit/tooltip-root'
import type { TooltipRootProps as TooltipRootElementProps } from '@prosekit/lit/tooltip-root'
import type { ComponentType } from 'preact'
import { h } from 'preact'

import type { PropsWithClass, PropsWithChildren } from '../types'

export type TooltipRootProps = PropsWithChildren<PropsWithClass<TooltipRootElementProps>>

export const TooltipRoot: ComponentType<TooltipRootProps> = (props) => {
  return h('prosekit-tooltip-root', props as object)
}
