import type { PopoverTriggerProps as PopoverTriggerElementProps } from '@prosekit/lit/popover-trigger'
import type { SvelteComponent } from 'svelte'

import type { PropsWithClass } from '../types'

import PopoverTriggerComponent from './popover-trigger.gen.svelte'

export type PopoverTriggerProps = PropsWithClass<PopoverTriggerElementProps>

export const PopoverTrigger = PopoverTriggerComponent as typeof SvelteComponent<any> as typeof SvelteComponent<PopoverTriggerProps>
