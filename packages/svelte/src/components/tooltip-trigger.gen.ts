import type { TooltipTriggerProps as TooltipTriggerElementProps } from '@prosekit/lit/tooltip-trigger'
import type { SvelteComponent } from 'svelte'

import type { PropsWithClass } from '../types'

import TooltipTriggerComponent from './tooltip-trigger.gen.svelte'

export type TooltipTriggerProps = PropsWithClass<TooltipTriggerElementProps>

export const TooltipTrigger = TooltipTriggerComponent as typeof SvelteComponent<any> as typeof SvelteComponent<TooltipTriggerProps>
