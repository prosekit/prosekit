<script lang="ts">
import '@prosekit/web/block-handle'

import { blockHandleDraggableProps, blockHandleDraggableEvents } from '@prosekit/web/block-handle'
import { ClientUpdate } from '../client-update/index.ts'
import { useComponent } from '../use-component.ts'
import { useEventHandlers } from '../use-event-handlers.ts'

let attributes: Record<string, unknown> = {}
let eventHandlers: Record<string, (...args: any[]) => any> = {}
let element: HTMLElement | undefined = undefined
const handleChange = useComponent(Object.keys(blockHandleDraggableProps), Object.keys(blockHandleDraggableEvents))

$: {
  [attributes, eventHandlers] = handleChange(element, $$props)
}
</script>

<ClientUpdate>
  <prosekit-block-handle-draggable {...attributes} use:useEventHandlers={eventHandlers} bind:this={element}>
    <slot />
  </prosekit-block-handle-draggable>
</ClientUpdate>
