<script lang="ts">
import '@prosekit/web/table-handle'

import { tableHandleColumnRootProps, tableHandleColumnRootEvents } from '@prosekit/web/table-handle'
import { ClientUpdate } from '../client-update/index.ts'
import { useComponent } from '../use-component.ts'
import { useEventHandlers } from '../use-event-handlers.ts'

let attributes: Record<string, unknown> = {}
let eventHandlers: Record<string, (...args: any[]) => any> = {}
let element: HTMLElement | undefined = undefined
const handleChange = useComponent(Object.keys(tableHandleColumnRootProps), Object.keys(tableHandleColumnRootEvents))

$: {
  [attributes, eventHandlers] = handleChange(element, $$props)
}
</script>

<ClientUpdate>
  <prosekit-table-handle-column-root {...attributes} use:useEventHandlers={eventHandlers} bind:this={element}>
    <slot />
  </prosekit-table-handle-column-root>
</ClientUpdate>
