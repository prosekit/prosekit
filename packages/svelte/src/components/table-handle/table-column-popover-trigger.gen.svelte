<script lang="ts">
import '@prosekit/web/table-handle'

import { defaultTableColumnPopoverTriggerProps } from '@prosekit/web/table-handle'
import { ClientUpdate } from '../client-update'
import { useWebComponent } from '../../utils/use-web-component'

let attributes: Record<string, unknown> = {}
let element: HTMLElement | undefined = undefined
const handleChange = useWebComponent(defaultTableColumnPopoverTriggerProps)

$: {
  attributes = handleChange(element, $$props)
}
</script>

<ClientUpdate>
  <prosekit-table-column-popover-trigger {...attributes} bind:this={element}>
    <slot />
  </prosekit-table-column-popover-trigger>
</ClientUpdate>
