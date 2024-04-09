import '@prosekit/lit/tooltip-trigger'
import type { TooltipTriggerProps as TooltipTriggerElementProps } from '@prosekit/lit/tooltip-trigger'
import type { ComponentType } from 'preact'
import { h } from 'preact'

import type { PropsWithClass, PropsWithChildren } from '../types'

export type TooltipTriggerProps = PropsWithChildren<PropsWithClass<TooltipTriggerElementProps>>

export const TooltipTrigger: ComponentType<TooltipTriggerProps> = (props) => {
  return h('prosekit-tooltip-trigger', props as object)
}
