import type { PopoverProps as PopoverElementProps } from '@prosekit/lit/popover'
import type { SvelteComponent } from 'svelte'

import type { PropsWithClass } from '../types'

import PopoverComponent from './popover.gen.svelte'

export type PopoverProps = PropsWithClass<PopoverElementProps>

export const Popover = PopoverComponent as typeof SvelteComponent<any> as typeof SvelteComponent<PopoverProps>
