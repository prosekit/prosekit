<script lang="ts">
import '@prosekit/web/table-handle'

import { tableHandlePopoverItemProps, tableHandlePopoverItemEvents } from '@prosekit/web/table-handle'
import { ClientUpdate } from '../client-update'
import { useComponent } from '../use-component'
import { useEventHandlers } from '../use-event-handlers'

let attributes: Record<string, unknown> = {}
let eventHandlers: Record<string, (...args: any[]) => any> = {}
let element: HTMLElement | undefined = undefined
const handleChange = useComponent(Object.keys(tableHandlePopoverItemProps), Object.keys(tableHandlePopoverItemEvents))

$: {
  [attributes, eventHandlers] = handleChange(element, $$props)
}
</script>

<ClientUpdate>
  <prosekit-table-handle-popover-item {...attributes} use:useEventHandlers={eventHandlers} bind:this={element}>
    <slot />
  </prosekit-table-handle-popover-item>
</ClientUpdate>
