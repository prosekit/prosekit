<script lang="ts">
import '@prosekit/web/block-handle'

import { blockHandleAddProps, blockHandleAddEvents } from '@prosekit/web/block-handle'
import { ClientUpdate } from '../client-update/index.js'
import { useComponent } from '../use-component.js'
import { useEventHandlers } from '../use-event-handlers.js'

let attributes: Record<string, unknown> = {}
let eventHandlers: Record<string, (...args: any[]) => any> = {}
let element: HTMLElement | undefined = undefined
const handleChange = useComponent(Object.keys(blockHandleAddProps), Object.keys(blockHandleAddEvents))

$: {
  [attributes, eventHandlers] = handleChange(element, $$props)
}
</script>

<ClientUpdate>
  <prosekit-block-handle-add {...attributes} use:useEventHandlers={eventHandlers} bind:this={element}>
    <slot />
  </prosekit-block-handle-add>
</ClientUpdate>
