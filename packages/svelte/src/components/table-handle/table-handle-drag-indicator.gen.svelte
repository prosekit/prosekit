<script lang="ts">
import '@prosekit/web/table-handle'

import { tableHandleDragIndicatorProps, tableHandleDragIndicatorEvents } from '@prosekit/web/table-handle'
import { ClientUpdate } from '../client-update'
import { useComponent } from '../use-component'
import { useEventHandlers } from '../use-event-handlers'

let attributes: Record<string, unknown> = {}
let eventHandlers: Record<string, (...args: any[]) => any> = {}
let element: HTMLElement | undefined = undefined
const handleChange = useComponent(Object.keys(tableHandleDragIndicatorProps), Object.keys(tableHandleDragIndicatorEvents))

$: {
  [attributes, eventHandlers] = handleChange(element, $$props)
}
</script>

<ClientUpdate>
  <prosekit-table-handle-drag-indicator {...attributes} use:useEventHandlers={eventHandlers} bind:this={element}>
    <slot />
  </prosekit-table-handle-drag-indicator>
</ClientUpdate>
