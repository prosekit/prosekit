import type { TableHandleRowRootElement, TableHandleRowRootProps, TableHandleRowRootEvents } from '@prosekit/web/table-handle'    
import type { SvelteComponent } from 'svelte'
import type { HTMLAttributes } from 'svelte/elements'

import type { CreateProps } from '../create-props'

import Component from './table-handle-row-root.gen.svelte'

export const TableHandleRowRoot = Component as typeof SvelteComponent<Partial<CreateProps<TableHandleRowRootProps, TableHandleRowRootEvents>> & HTMLAttributes<TableHandleRowRootElement>>
