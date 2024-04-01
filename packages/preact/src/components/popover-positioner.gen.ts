import '@prosekit/lit/popover-positioner'
import type { PopoverPositionerProps as PopoverPositionerElementProps } from '@prosekit/lit/popover-positioner'
import type { ComponentType } from 'preact'
import { h } from 'preact'

import type { PropsWithClass, PropsWithChildren } from '../types'

export type PopoverPositionerProps = PropsWithChildren<PropsWithClass<PopoverPositionerElementProps>>

export const PopoverPositioner: ComponentType<PopoverPositionerProps> = (props) => {
  return h('prosekit-popover-positioner', props as object)
}
