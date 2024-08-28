<script lang="ts">
import '@prosekit/web/table-handle'

import { defaultTableRowPopoverTriggerProps } from '@prosekit/web/table-handle'
import { ClientUpdate } from '../client-update'
import { useWebComponent } from '../../utils/use-web-component'

let attributes: Record<string, unknown> = {}
let element: HTMLElement | undefined = undefined
const handleChange = useWebComponent(defaultTableRowPopoverTriggerProps)

$: {
  attributes = handleChange(element, $$props)
}
</script>

<ClientUpdate>
  <prosekit-table-row-popover-trigger {...attributes} bind:this={element}>
    <slot />
  </prosekit-table-row-popover-trigger>
</ClientUpdate>
