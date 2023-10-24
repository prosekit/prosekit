import '@prosekit/lit/popover'
import type { PopoverProps as PopoverElementProps } from '@prosekit/lit/popover'
import type { ComponentChildren, ComponentType } from 'preact'
import { h } from 'preact'

export type PopoverProps = {
  class?: string
  children?: ComponentChildren
} & PopoverElementProps

export const Popover: ComponentType<PopoverProps> = (props) => {
  return h('prosekit-popover', props)
}
