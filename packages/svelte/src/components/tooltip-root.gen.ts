import type { TooltipRootProps as TooltipRootElementProps } from '@prosekit/lit/tooltip-root'
import type { SvelteComponent } from 'svelte'

import type { PropsWithClass } from '../types'

import TooltipRootComponent from './tooltip-root.gen.svelte'

export type TooltipRootProps = PropsWithClass<TooltipRootElementProps>

export const TooltipRoot = TooltipRootComponent as typeof SvelteComponent<any> as typeof SvelteComponent<TooltipRootProps>
