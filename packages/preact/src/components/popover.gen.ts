import '@prosekit/lit/popover'
import type { PopoverProps as PopoverElementProps } from '@prosekit/lit/popover'
import type { ComponentType } from 'preact'
import { h } from 'preact'

import type { PropsWithClass, PropsWithChildren } from '../types'

export type PopoverProps = PropsWithChildren<PropsWithClass<PopoverElementProps>>

export const Popover: ComponentType<PopoverProps> = (props) => {
  return h('prosekit-popover', props as object)
}
