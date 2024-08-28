<script lang="ts">
import '@prosekit/web/table-handle'

import { defaultTableRowPopoverRootProps } from '@prosekit/web/table-handle'
import { ClientUpdate } from '../client-update'
import { useWebComponent } from '../../utils/use-web-component'

let attributes: Record<string, unknown> = {}
let element: HTMLElement | undefined = undefined
const handleChange = useWebComponent(defaultTableRowPopoverRootProps)

$: {
  attributes = handleChange(element, $$props)
}
</script>

<ClientUpdate>
  <prosekit-table-row-popover-root {...attributes} bind:this={element}>
    <slot />
  </prosekit-table-row-popover-root>
</ClientUpdate>
