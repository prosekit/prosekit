<script lang="ts">
import '@prosekit/web/drop-indicator'

import { dropIndicatorProps, dropIndicatorEvents } from '@prosekit/web/drop-indicator'
import { ClientUpdate } from '../client-update/index.js'
import { useComponent } from '../use-component.js'
import { useEventHandlers } from '../use-event-handlers.js'

let attributes: Record<string, unknown> = {}
let eventHandlers: Record<string, (...args: any[]) => any> = {}
let element: HTMLElement | undefined = undefined
const handleChange = useComponent(Object.keys(dropIndicatorProps), Object.keys(dropIndicatorEvents))

$: {
  [attributes, eventHandlers] = handleChange(element, $$props)
}
</script>

<ClientUpdate>
  <prosekit-drop-indicator {...attributes} use:useEventHandlers={eventHandlers} bind:this={element}>
    <slot />
  </prosekit-drop-indicator>
</ClientUpdate>
