import '@prosekit/lit/popover-trigger'
import type { PopoverTriggerProps as PopoverTriggerElementProps } from '@prosekit/lit/popover-trigger'
import type { ComponentType } from 'preact'
import { h } from 'preact'

import type { PropsWithClass, PropsWithChildren } from '../types'

export type PopoverTriggerProps = PropsWithChildren<PropsWithClass<PopoverTriggerElementProps>>

export const PopoverTrigger: ComponentType<PopoverTriggerProps> = (props) => {
  return h('prosekit-popover-trigger', props as object)
}
