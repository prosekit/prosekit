import type { TooltipContentProps as TooltipContentElementProps } from '@prosekit/lit/tooltip-content'
import type { SvelteComponent } from 'svelte'

import type { PropsWithClass } from '../types'

import TooltipContentComponent from './tooltip-content.gen.svelte'

export type TooltipContentProps = PropsWithClass<TooltipContentElementProps>

export const TooltipContent = TooltipContentComponent as typeof SvelteComponent<any> as typeof SvelteComponent<TooltipContentProps>
