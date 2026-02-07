import type { InlinePopoverElement, InlinePopoverProps as Props, InlinePopoverEvents as Events } from '@prosekit/web/inline-popover'    
import type { SvelteComponent } from 'svelte'
import type { HTMLAttributes } from 'svelte/elements'

import type { CreateProps } from '../create-props.ts'

import Component from './inline-popover.gen.svelte'

/**
 * Props for the {@link InlinePopover} component.
 */
export interface InlinePopoverProps extends Partial<CreateProps<Props, Events>> {}

export const InlinePopover = Component as typeof SvelteComponent<InlinePopoverProps & HTMLAttributes<InlinePopoverElement>>
