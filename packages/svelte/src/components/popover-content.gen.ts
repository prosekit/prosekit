import type { PopoverContentProps as PopoverContentElementProps } from '@prosekit/lit/popover-content'
import type { SvelteComponent } from 'svelte'

import type { PropsWithClass } from '../types'

import PopoverContentComponent from './popover-content.gen.svelte'

export type PopoverContentProps = PropsWithClass<PopoverContentElementProps>

export const PopoverContent = PopoverContentComponent as typeof SvelteComponent<any> as typeof SvelteComponent<PopoverContentProps>
