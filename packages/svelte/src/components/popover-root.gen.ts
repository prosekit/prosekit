import type { PopoverRootProps as PopoverRootElementProps } from '@prosekit/lit/popover-root'
import type { SvelteComponent } from 'svelte'

import type { PropsWithClass } from '../types'

import PopoverRootComponent from './popover-root.gen.svelte'

export type PopoverRootProps = PropsWithClass<PopoverRootElementProps>

export const PopoverRoot = PopoverRootComponent as typeof SvelteComponent<any> as typeof SvelteComponent<PopoverRootProps>
