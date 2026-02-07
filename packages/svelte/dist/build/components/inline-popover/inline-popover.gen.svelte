<script lang="ts">
import '@prosekit/web/inline-popover'

import { inlinePopoverProps, inlinePopoverEvents } from '@prosekit/web/inline-popover'
import { ClientUpdate } from '../client-update/index.js'
import { useComponent } from '../use-component.js'
import { useEventHandlers } from '../use-event-handlers.js'

let attributes: Record<string, unknown> = {}
let eventHandlers: Record<string, (...args: any[]) => any> = {}
let element: HTMLElement | undefined = undefined
const handleChange = useComponent(Object.keys(inlinePopoverProps), Object.keys(inlinePopoverEvents))

$: {
  [attributes, eventHandlers] = handleChange(element, $$props)
}
</script>

<ClientUpdate>
  <prosekit-inline-popover {...attributes} use:useEventHandlers={eventHandlers} bind:this={element}>
    <slot />
  </prosekit-inline-popover>
</ClientUpdate>
