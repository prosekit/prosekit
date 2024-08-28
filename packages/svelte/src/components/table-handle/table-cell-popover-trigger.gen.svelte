<script lang="ts">
import '@prosekit/web/table-handle'

import { defaultTableCellPopoverTriggerProps } from '@prosekit/web/table-handle'
import { ClientUpdate } from '../client-update'
import { useWebComponent } from '../../utils/use-web-component'

let attributes: Record<string, unknown> = {}
let element: HTMLElement | undefined = undefined
const handleChange = useWebComponent(defaultTableCellPopoverTriggerProps)

$: {
  attributes = handleChange(element, $$props)
}
</script>

<ClientUpdate>
  <prosekit-table-cell-popover-trigger {...attributes} bind:this={element}>
    <slot />
  </prosekit-table-cell-popover-trigger>
</ClientUpdate>
