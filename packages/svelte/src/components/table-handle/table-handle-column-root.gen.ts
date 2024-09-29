import type { TableHandleColumnRootElement, TableHandleColumnRootProps, TableHandleColumnRootEvents } from '@prosekit/web/table-handle'    
import type { SvelteComponent } from 'svelte'
import type { HTMLAttributes } from 'svelte/elements'

import type { CreateProps } from '../create-props'

import Component from './table-handle-column-root.gen.svelte'

export const TableHandleColumnRoot = Component as typeof SvelteComponent<Partial<CreateProps<TableHandleColumnRootProps, TableHandleColumnRootEvents>> & HTMLAttributes<TableHandleColumnRootElement>>
