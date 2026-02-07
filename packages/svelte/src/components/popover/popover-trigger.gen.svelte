<script lang="ts">
import '@prosekit/web/popover'

import { popoverTriggerProps, popoverTriggerEvents } from '@prosekit/web/popover'
import { ClientUpdate } from '../client-update/index.ts'
import { useComponent } from '../use-component.ts'
import { useEventHandlers } from '../use-event-handlers.ts'

let attributes: Record<string, unknown> = {}
let eventHandlers: Record<string, (...args: any[]) => any> = {}
let element: HTMLElement | undefined = undefined
const handleChange = useComponent(Object.keys(popoverTriggerProps), Object.keys(popoverTriggerEvents))

$: {
  [attributes, eventHandlers] = handleChange(element, $$props)
}
</script>

<ClientUpdate>
  <prosekit-popover-trigger {...attributes} use:useEventHandlers={eventHandlers} bind:this={element}>
    <slot />
  </prosekit-popover-trigger>
</ClientUpdate>
