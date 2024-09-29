import type { PopoverRootElement, PopoverRootProps, PopoverRootEvents } from '@prosekit/web/popover'    
import type { SvelteComponent } from 'svelte'
import type { HTMLAttributes } from 'svelte/elements'

import type { CreateProps } from '../create-props'

import Component from './popover-root.gen.svelte'

export const PopoverRoot = Component as typeof SvelteComponent<Partial<CreateProps<PopoverRootProps, PopoverRootEvents>> & HTMLAttributes<PopoverRootElement>>
