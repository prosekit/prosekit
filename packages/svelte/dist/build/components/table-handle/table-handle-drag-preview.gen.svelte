<script lang="ts">
import '@prosekit/web/table-handle'

import { tableHandleDragPreviewProps, tableHandleDragPreviewEvents } from '@prosekit/web/table-handle'
import { ClientUpdate } from '../client-update/index.js'
import { useComponent } from '../use-component.js'
import { useEventHandlers } from '../use-event-handlers.js'

let attributes: Record<string, unknown> = {}
let eventHandlers: Record<string, (...args: any[]) => any> = {}
let element: HTMLElement | undefined = undefined
const handleChange = useComponent(Object.keys(tableHandleDragPreviewProps), Object.keys(tableHandleDragPreviewEvents))

$: {
  [attributes, eventHandlers] = handleChange(element, $$props)
}
</script>

<ClientUpdate>
  <prosekit-table-handle-drag-preview {...attributes} use:useEventHandlers={eventHandlers} bind:this={element}>
    <slot />
  </prosekit-table-handle-drag-preview>
</ClientUpdate>
