import type { PopoverPositionerProps as PopoverPositionerElementProps } from '@prosekit/lit/popover-positioner'
import type { SvelteComponent } from 'svelte'

import type { PropsWithClass } from '../types'

import PopoverPositionerComponent from './popover-positioner.gen.svelte'

export type PopoverPositionerProps = PropsWithClass<PopoverPositionerElementProps>

export const PopoverPositioner = PopoverPositionerComponent as typeof SvelteComponent<any> as typeof SvelteComponent<PopoverPositionerProps>
