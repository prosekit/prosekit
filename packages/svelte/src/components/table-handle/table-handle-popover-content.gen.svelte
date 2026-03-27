<script lang="ts">
import '@prosekit/web/table-handle'

import { tableHandlePopoverContentProps, tableHandlePopoverContentEvents } from '@prosekit/web/table-handle'
import { ClientUpdate } from '../client-update/index.ts'
import { useComponent } from '../use-component.ts'
import { useEventHandlers } from '../use-event-handlers.ts'

let attributes: Record<string, unknown> = {}
let eventHandlers: Record<string, (...args: any[]) => any> = {}
let element: HTMLElement | undefined = undefined
const handleChange = useComponent(Object.keys(tableHandlePopoverContentProps), Object.keys(tableHandlePopoverContentEvents))

$: {
  [attributes, eventHandlers] = handleChange(element, $$props)
}
</script>

<ClientUpdate>
  <prosekit-table-handle-popover-content {...attributes} use:useEventHandlers={eventHandlers} bind:this={element}>
    <slot />
  </prosekit-table-handle-popover-content>
</ClientUpdate>
