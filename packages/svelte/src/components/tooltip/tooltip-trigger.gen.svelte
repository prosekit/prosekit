<script lang="ts">
import '@prosekit/web/tooltip'

import { tooltipTriggerProps, tooltipTriggerEvents } from '@prosekit/web/tooltip'
import { ClientUpdate } from '../client-update'
import { useComponent } from '../use-component'
import { useEventHandlers } from '../use-event-handlers'

let attributes: Record<string, unknown> = {}
let eventHandlers: Record<string, (...args: any[]) => any> = {}
let element: HTMLElement | undefined = undefined
const handleChange = useComponent(Object.keys(tooltipTriggerProps), Object.keys(tooltipTriggerEvents))

$: {
  [attributes, eventHandlers] = handleChange(element, $$props)
}
</script>

<ClientUpdate>
  <prosekit-tooltip-trigger {...attributes} use:useEventHandlers={eventHandlers} bind:this={element}>
    <slot />
  </prosekit-tooltip-trigger>
</ClientUpdate>
