import type { TableHandleRowTriggerElement, TableHandleRowTriggerProps as Props, TableHandleRowTriggerEvents as Events } from '@prosekit/web/table-handle'    
import type { SvelteComponent } from 'svelte'
import type { HTMLAttributes } from 'svelte/elements'

import type { CreateProps } from '../create-props.ts'

import Component from './table-handle-row-trigger.gen.svelte'

/**
 * Props for the {@link TableHandleRowTrigger} component.
 */
export interface TableHandleRowTriggerProps extends Partial<CreateProps<Props, Events>> {}

export const TableHandleRowTrigger = Component as typeof SvelteComponent<TableHandleRowTriggerProps & HTMLAttributes<TableHandleRowTriggerElement>>
