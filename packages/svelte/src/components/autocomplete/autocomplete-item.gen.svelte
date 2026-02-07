<script lang="ts">
import '@prosekit/web/autocomplete'

import { autocompleteItemProps, autocompleteItemEvents } from '@prosekit/web/autocomplete'
import { ClientUpdate } from '../client-update/index.ts'
import { useComponent } from '../use-component.ts'
import { useEventHandlers } from '../use-event-handlers.ts'

let attributes: Record<string, unknown> = {}
let eventHandlers: Record<string, (...args: any[]) => any> = {}
let element: HTMLElement | undefined = undefined
const handleChange = useComponent(Object.keys(autocompleteItemProps), Object.keys(autocompleteItemEvents))

$: {
  [attributes, eventHandlers] = handleChange(element, $$props)
}
</script>

<ClientUpdate>
  <prosekit-autocomplete-item {...attributes} use:useEventHandlers={eventHandlers} bind:this={element}>
    <slot />
  </prosekit-autocomplete-item>
</ClientUpdate>
