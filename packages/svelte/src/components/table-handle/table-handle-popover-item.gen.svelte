<script lang="ts">
import '@prosekit/web/table-handle'

import { defaultTableHandlePopoverItemProps } from '@prosekit/web/table-handle'
import { ClientUpdate } from '../client-update'
import { useWebComponent } from '../../utils/use-web-component'

let attributes: Record<string, unknown> = {}
let element: HTMLElement | undefined = undefined
const handleChange = useWebComponent(defaultTableHandlePopoverItemProps)

$: {
  attributes = handleChange(element, $$props)
}
</script>

<ClientUpdate>
  <prosekit-table-handle-popover-item {...attributes} bind:this={element}>
    <slot />
  </prosekit-table-handle-popover-item>
</ClientUpdate>
