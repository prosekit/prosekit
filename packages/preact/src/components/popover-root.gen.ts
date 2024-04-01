import '@prosekit/lit/popover-root'
import type { PopoverRootProps as PopoverRootElementProps } from '@prosekit/lit/popover-root'
import type { ComponentType } from 'preact'
import { h } from 'preact'

import type { PropsWithClass, PropsWithChildren } from '../types'

export type PopoverRootProps = PropsWithChildren<PropsWithClass<PopoverRootElementProps>>

export const PopoverRoot: ComponentType<PopoverRootProps> = (props) => {
  return h('prosekit-popover-root', props as object)
}
