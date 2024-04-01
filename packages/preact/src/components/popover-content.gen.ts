import '@prosekit/lit/popover-content'
import type { PopoverContentProps as PopoverContentElementProps } from '@prosekit/lit/popover-content'
import type { ComponentType } from 'preact'
import { h } from 'preact'

import type { PropsWithClass, PropsWithChildren } from '../types'

export type PopoverContentProps = PropsWithChildren<PropsWithClass<PopoverContentElementProps>>

export const PopoverContent: ComponentType<PopoverContentProps> = (props) => {
  return h('prosekit-popover-content', props as object)
}
