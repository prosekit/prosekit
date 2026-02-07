<script lang="ts">
import '@prosekit/web/table-handle'

import { tableHandleRootProps, tableHandleRootEvents } from '@prosekit/web/table-handle'
import { ClientUpdate } from '../client-update/index.ts'
import { useComponent } from '../use-component.ts'
import { useEventHandlers } from '../use-event-handlers.ts'

let attributes: Record<string, unknown> = {}
let eventHandlers: Record<string, (...args: any[]) => any> = {}
let element: HTMLElement | undefined = undefined
const handleChange = useComponent(Object.keys(tableHandleRootProps), Object.keys(tableHandleRootEvents))

$: {
  [attributes, eventHandlers] = handleChange(element, $$props)
}
</script>

<ClientUpdate>
  <prosekit-table-handle-root {...attributes} use:useEventHandlers={eventHandlers} bind:this={element}>
    <slot />
  </prosekit-table-handle-root>
</ClientUpdate>
