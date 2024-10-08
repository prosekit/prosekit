import type { TableHandleColumnTriggerElement, TableHandleColumnTriggerProps as Props, TableHandleColumnTriggerEvents as Events } from '@prosekit/web/table-handle'    
import type { SvelteComponent } from 'svelte'
import type { HTMLAttributes } from 'svelte/elements'

import type { CreateProps } from '../create-props'

import Component from './table-handle-column-trigger.gen.svelte'

/**
 * Props for the {@link TableHandleColumnTrigger} component.
 */
export interface TableHandleColumnTriggerProps extends Partial<CreateProps<Props, Events>> {}

export const TableHandleColumnTrigger = Component as typeof SvelteComponent<TableHandleColumnTriggerProps & HTMLAttributes<TableHandleColumnTriggerElement>>
